export interface Effect<T = unknown> {
  (): T;
  deps: Array<Set<Effect<T>>>;
  options: EffectOptions;
}

export interface EffectOptions {
  scheduler?: (fn: Effect) => void;
  lazy?: boolean;
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

export const computed = <T>(fn: () => T): { readonly value: T } => {
  const effectFn = effect(fn, { lazy: true });
  const obj = {
    get value() {
      return effectFn();
    }
  };
  return obj;
};
