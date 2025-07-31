import { deepClone } from "./deepClone";
export interface Effect<T = unknown> {
  (): T;
  deps: Array<Set<Effect<T>>>;
  options: EffectOptions;
}

export interface EffectOptions {
  scheduler?: (fn: Effect) => void;
  lazy?: boolean;
}
export type WatchCallback<T> = (
  newValue: T,
  oldValue: T | undefined,
  onInvalidate: (fn: () => void) => void,
) => void;
export interface WatchOptions {
  immediate?: boolean;
}

const bucket = new WeakMap<object, Map<PropertyKey, Set<Effect>>>();
const effectStack: Effect[] = [];
const activeEffect = () =>
  effectStack.length > 0 ? effectStack[effectStack.length - 1] : null;

const track = (target: object, prop: PropertyKey, receiver: unknown): void => {
  let depsMap = bucket.get(target);
  if (!depsMap) {
    depsMap = new Map<PropertyKey, Set<Effect>>();
    bucket.set(target, depsMap);
  }
  let deps = depsMap.get(prop);
  if (!deps) {
    deps = new Set<Effect>();
    depsMap.set(prop, deps);
  }
  const effect = activeEffect();
  if (effect) {
    deps.add(effect);
    effect.deps.push(deps);
  }
};
const trigger = (
  target: object,
  prop: PropertyKey,
  receiver: unknown,
): void => {
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  const deps = depsMap.get(prop);
  if (!deps) return;
  const effects = Array.from(deps);
  effects.forEach((effect) => {
    if (typeof effect === "function" && effect !== activeEffect()) {
      if (effect.options?.scheduler) {
        effect.options.scheduler(effect);
      } else {
        effect();
      }
    }
  });
};

const cleanup = (effect: Effect): void => {
  for (const deps of effect.deps) {
    deps.delete(effect);
  }
  effect.deps.length = 0;
};

const traverse = <T = unknown>(value: T, seen = new Set<unknown>()) => {
  if (typeof value !== "object" || value === null || seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (Array.isArray(value)) {
    for (const item of value) {
      traverse(item, seen);
    }
  } else if (value instanceof Map || value instanceof Set) {
    for (const item of value) {
      traverse(item, seen);
    }
  } else if (value instanceof Object) {
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        traverse(Reflect.get(value, key, value), seen);
      }
    }
  }
  return value;
};

export const reactive = <T extends object>(target: T): T => {
  return new Proxy(target, {
    get(target, prop: PropertyKey, receiver: unknown) {
      track(target, prop, receiver);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop: PropertyKey, value: unknown, receiver: unknown): boolean {
      const oldValue = Reflect.get(target, prop, receiver);
      if (oldValue !== value) {
        Reflect.set(target, prop, value, receiver);
        trigger(target, prop, receiver);
      }
      return true;
    },
  }) as T;
};

export const effect = <T>(fn: () => T, opts: EffectOptions = {}): Effect<T> => {
  const effectFn: Effect<T> = () => {
    cleanup(effectFn);
    effectStack.push(effectFn);
    const result = fn();
    effectStack.pop();
    return result;
  };
  effectFn.options = opts;
  effectFn.deps = [];
  if (!opts.lazy) {
    effectFn();
  }
  return effectFn;
};

export const computed = <T>(getter: () => T): { readonly value: T } => {
  let _value: T | undefined;
  let dirty = true;
  const effectFn = effect(getter, {
    lazy: true,
    scheduler: () => {
      if (!dirty) {
        dirty = true;
        trigger(obj, "value", obj);
      }
    },
  });
  const obj = {
    get value() {
      if (dirty) {
        _value = effectFn();
        dirty = false;
      }
      track(obj, "value", obj);
      return _value!;
    },
  };
  return obj;
};

export const watch = <T>(
  source: T,
  cb: WatchCallback<T>,
  opts: WatchOptions = {},
): void => {
  let getter: () => T;
  if (typeof source === "function") {
    getter = source as () => T;
  } else {
    getter = () => traverse<T>(source);
  }
  let newValue: T | undefined;
  let oldValue: T | undefined;
  let cleanup: () => void;
  const onInvalidate = (fn: () => void): void => {
    cleanup = fn;
  };

  const effectFn = effect(() => getter(), {
    lazy: true,
    scheduler: () => {
      job();
    },
  });
  const job = () => {
    if (cleanup) {
      cleanup();
    }
    newValue = effectFn();
    cb(newValue, oldValue, onInvalidate);
    oldValue = deepClone(newValue);
  };
  if (opts.immediate) {
    job();
  } else {
    oldValue = deepClone(effectFn());
  }
};
