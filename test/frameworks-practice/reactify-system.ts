/**
 * implements a reactive data structure similar to Vue's reactivity system.
 * Tracks data changes and triggers effects using `useState` and `useEffect` functions.
 * Uses simple function getters and setters; avoids `Object.defineProperty`, `Reflect`, or `Proxy`.
 **/
type CleanUp = () => void;
type Execute = () => CleanUp | void;

type Effect = {
  execute: Execute;
  deps: Set<Set<Effect>>;
};

const effectStack: Effect[] = [];

const trackEvent = (effect: Effect, subs: Set<Effect>) => {
  subs.add(effect);
  effect.deps.add(subs);
};
const trigger = (_subs: Set<Effect>) => {
  const effects = Array.from(_subs);
  const activeEffect = effectStack.at(-1);
  for (const effect of effects) {
    if (activeEffect !== effect) {
      effect.execute();
    }
  }
};

const useState = <T>(initialValue: T) => {
  let _state = initialValue;
  const _subs = new Set<Effect>();
  const getter = () => {
    const activeEffect = effectStack.at(-1);
    if (activeEffect) {
      trackEvent(activeEffect, _subs);
    }
    return _state;
  };
  const setter = (value: T) => {
    _state = value;
    // very important, execute all effects that depend on this state
    // 这里不直接遍历 _subs 是因为可能会在执行过程中添加新的 effect，导致无限递归
    trigger(_subs);
  };
  return [getter, setter] as const;
};

const _cleanup = (effect: Effect) => {
  for (const subs of effect.deps) {
    subs.delete(effect);
  }
  effect.deps.clear();
};

const useEffect = (fn: Execute) => {
  const execute = () => {
    _cleanup(effect);
    effectStack.push(effect);
    try {
      fn();
    } finally {
      effectStack.pop();
    }
  };

  const effect: Effect = {
    execute,
    deps: new Set(),
  };

  execute();
};

export { useState, useEffect }

