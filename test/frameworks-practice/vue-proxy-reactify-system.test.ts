import {
  effect,
  reactive,
  computed,
  watch,
} from "@/utils/vue-reactive-data-proxy-based";
import { describe, expect, test, vi } from "vitest";

describe("Vue3 Mini Reactive Data Proxy System", () => {
  describe("reactive", () => {
    test("reactive reflects object updates", () => {
      const obj = { a: 1 };
      const proxy = reactive(obj);
      proxy.a = 2;
      expect(proxy.a).toBe(2);
    });
  });

  describe("effect", () => {
    test("effect runs when reactive data property changes", () => {
      const data = reactive({ count: 0 });
      const log = vi.fn();
      effect(() => {
        log(`Count is: ${data.count}`);
      });
      data.count++;
      expect(log).toBeCalledTimes(2);
      expect(log.mock.calls[0][0]).toBe("Count is: 0");
      expect(log.mock.calls[1][0]).toBe("Count is: 1");
    });

    test("effect does not run when other reactive data property changes", () => {
      const data = reactive({ count: 0 });
      const log = vi.fn();
      effect(() => {
        log(`Count is: ${data.count}`);
      });
      (data as any).name = "alice";
      expect(log).toBeCalledTimes(1);
      expect(log.mock.calls[0][0]).toBe("Count is: 0");
    });

    test("effect update dependencies in every trigger", () => {
      const data = reactive({ name: "bob", ok: false });
      const log = vi.fn();
      effect(() => {
        log(data.ok ? "loaded" : `Wait, ${data.name}`);
      });
      data.ok = true;
      data.name = "alice";
      expect(log).toBeCalledTimes(2);
      expect(log.mock.calls[0][0]).toBe("Wait, bob");
      expect(log.mock.calls[1][0]).toBe("loaded");
    });

    test("effect can nest", () => {
      const data = reactive({ count: 0, name: "bob" });
      const log = vi.fn();
      const nestLog = vi.fn();
      effect(() => {
        log(`Count is: ${data.count}`);
        effect(() => {
          nestLog(`Name is: ${data.name}`);
        });
      });
      data.name = "alice";
      expect(log).toBeCalledTimes(1);
      expect(log.mock.calls[0][0]).toBe("Count is: 0");
      expect(nestLog).toBeCalledTimes(2);
      expect(nestLog.mock.calls[0][0]).toBe("Name is: bob");
      expect(nestLog.mock.calls[1][0]).toBe("Name is: alice");

      data.count++;
      expect(log).toBeCalledTimes(2);
      expect(log.mock.calls[1][0]).toBe("Count is: 1");
      expect(nestLog).toBeCalledTimes(3);
    });

    test("effect not trigger when getter and setter in same effect to avoid infinite trigger", () => {
      const data = reactive({ count: 0, name: "bob" });
      const log = vi.fn();
      effect(() => {
        data.count++;
        log("effect triggered");
      });

      expect(data.count).toBe(1);
      expect(log).toBeCalledTimes(1);
    });

    test("effect can schedule by user", async () => {
      const data = reactive({ count: 0 });
      const log = vi.fn();
      const p = Promise.resolve();
      const jobQueue: Set<any> = new Set();
      let isFlushing = false;
      const flushJob = () => {
        if (isFlushing) return;
        isFlushing = true;
        p.then(() => {
          jobQueue.forEach((job) => job());
        }).finally(() => {
          isFlushing = false;
        });
      };
      effect(
        () => {
          log(`Count is: ${data.count}`);
        },
        {
          scheduler: (effectFn) => {
            jobQueue.add(effectFn);
            flushJob();
          },
        },
      );
      data.count++;
      data.count++;

      await vi.waitFor(() => {
        expect(data.count).toEqual(2);
        expect(log).toBeCalledTimes(2);
      });
    });

    test("effect can execute lazy trigger by user", () => {
      const data = reactive({ count: 0 });
      const log = vi.fn();
      const fn = effect(
        () => {
          log("triggered");
          return Math.pow(data.count, 2);
        },
        { lazy: true },
      );
      expect(log).toBeCalledTimes(0);
      expect(fn()).toEqual(0);
      data.count++;
      expect(log).toBeCalledTimes(2);
    });

    test.todo("effect runs when nested reactive data property changes");
  });

  describe("computed", () => {
    test("computed value updates when source changes", () => {
      const sourceObj = reactive({ value: 1 });
      const result = computed(() => sourceObj.value * 2);
      expect(result.value).toBe(2);
      sourceObj.value = 3;
      expect(result.value).toBe(6); // stub does not update
    });

    test("computed function not run unless source is changed", () => {
      const sourceObj = reactive({ value: 1 });
      const log = vi.fn();
      const result = computed(() => {
        log("computed called");
        return sourceObj.value * 2;
      });
      expect(result.value).toBe(2);
      expect(result.value).toBe(2);
      expect(log).toBeCalledTimes(1);
      sourceObj.value = 3;
      expect(result.value).toBe(6);
      expect(log).toBeCalledTimes(2);
    });

    test("computed value can trigger effect", () => {
      const sourceObj = reactive({ value: 1 });
      const log = vi.fn();
      const result = computed(() => {
        return sourceObj.value * 2;
      });
      effect(() => {
        log(`Computed value is: ${result.value}`);
      });
      expect(log).toBeCalledTimes(1);
      expect(log.mock.calls[0][0]).toBe("Computed value is: 2");

      sourceObj.value = 3;
      expect(log).toBeCalledTimes(2);
      expect(log.mock.calls[1][0]).toBe("Computed value is: 6");
    });
  });

  describe("watch", () => {
    test("watch runs callback when source changes", () => {
      const sourceObj = reactive({ value: 1 });
      const log = vi.fn();
      watch(sourceObj, () => {
        log(`Value changed`);
      });
      sourceObj.value = 2;
      expect(log).toBeCalledTimes(1);
      expect(log.mock.calls[0][0]).toBe("Value changed");
    });

    test("watch runs callback when getter deps changes", () => {
      const sourceObj = reactive({ value: 1 });
      const log = vi.fn();
      watch(() => sourceObj.value, () => {
        log(`Value changed`);
      });
      sourceObj.value = 2;
      expect(log).toBeCalledTimes(1);
      expect(log.mock.calls[0][0]).toBe("Value changed");
    });

    test("watch will pass new value and old value to callback", () => {
      const sourceObj = reactive({ value: 1 });
      const log = vi.fn();
      watch(sourceObj, (newValue, oldValue) => {
        log(`Value changed from ${oldValue?.value} to ${newValue.value}`);
      });
      sourceObj.value = 2;
      expect(log).toBeCalledTimes(1);
      expect(log.mock.calls[0][0]).toBe("Value changed from 1 to 2");
    });
  });
});
