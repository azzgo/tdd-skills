import { describe, expect, test } from "vitest";
import {
  PromiseAPlus,
  PromiseAPlusState,
  isThenable,
  resultSymbol,
  stateSymbol,
} from "../src/utils/promise";

describe("PromiseAPlus impl", () => {
  test("promise is an object or function with a then method", () => {
    let promise = new PromiseAPlus(() => {});
    expect(isThenable(promise)).toBe(true);
  });

  describe("must be in one of three states: pending, fulfilled, or rejected", () => {
    test("may transition to either the fulfilled state", () => {
      return new Promise<void>((done) => {
        let resolveA = (_: number) => {};
        let promiseA = new PromiseAPlus<number>((resolve) => {
          resolveA = resolve;
        });
        expect(promiseA[stateSymbol]).toEqual(PromiseAPlusState.Pending);
        resolveA?.(1);
        expect(promiseA[stateSymbol]).toEqual(PromiseAPlusState.Fulfilled);
        done();
      });
    });
    test("may transition to either the rejected state", () => {
      return new Promise<void>((done) => {
        let rejectA = (_: any) => {};
        let promiseA = new PromiseAPlus<number>((_, reject) => {
          rejectA = reject;
        });
        expect(promiseA[stateSymbol]).toEqual(PromiseAPlusState.Pending);
        let error = new Error();
        rejectA?.(error);
        expect(promiseA[stateSymbol]).toEqual(PromiseAPlusState.Rejected);
        done();
      });
    });

    test("When fulfilled, a promise, must not transition to any other state. must have a value, which must not change.", () => {
      return new Promise<void>((done) => {
        let resolveA = (_: number) => {};
        let rejectA = (_: any) => {};

        let promiseA = new PromiseAPlus<number>((resolve, reject) => {
          resolveA = resolve;
          rejectA = reject;
        });
        expect(promiseA[stateSymbol]).toEqual(PromiseAPlusState.Pending);
        resolveA?.(1);
        rejectA(new Error());
        resolveA?.(2);
        expect(promiseA[stateSymbol]).toEqual(PromiseAPlusState.Fulfilled);
        expect(promiseA[resultSymbol]).toEqual(1);
        done();
      });
    });
    test("When rejected, a promise: must not transition to any other state.must have a reason, which must not change.", () => {
      return new Promise<void>((done) => {
        let resolveA = (_: number) => {};
        let rejectA = (_: any) => {};

        let promiseA = new PromiseAPlus<number>((resolve, reject) => {
          resolveA = resolve;
          rejectA = reject;
        });
        expect(promiseA[stateSymbol]).toEqual(PromiseAPlusState.Pending);
        let err1 = new Error();
        let err2 = new Error();
        rejectA(err1);
        resolveA?.(1);
        rejectA(err2);
        expect(promiseA[stateSymbol]).toEqual(PromiseAPlusState.Rejected);
        expect(promiseA[resultSymbol]).toEqual(err1);
        done();
      });
    });
  });

  describe("The then Method", () => {
    test("If onFulfilled is a function: it must be called after promise is fulfilled, with promise’s value as its first argument.", () => {
      let promise = new PromiseAPlus((resolve) => {
        resolve(1);
      });
      return new Promise<void>((done) => {
        promise.then((value) => {
          expect(promise[stateSymbol]).toBe(PromiseAPlusState.Fulfilled);
          expect(value).toBe(1);
          done();
        });
      });
    });

    test("onRejected must not be called until the execution context stack contains only platform code. ", () => {
      let promise = new PromiseAPlus((resolve) => {
        resolve(1);
      });
      return new Promise<void>((done) => {
        let onFulfilledCalled = false;
        promise.then(() => {
          onFulfilledCalled = true;
        });
        expect(onFulfilledCalled).toBe(false);
        setTimeout(() => {
          expect(onFulfilledCalled).toBe(true);
          done();
        });
      });
    });

    test("onRejected must not be called until the execution context stack contains only platform code. ", () => {
      let promise = new PromiseAPlus((_, reject) => {
        reject(1);
      });
      return new Promise<void>((done) => {
        let onRejectedCalled = false;
        promise.then(undefined, () => {
          onRejectedCalled = true;
        });
        expect(onRejectedCalled).toBe(false);
        setTimeout(() => {
          expect(onRejectedCalled).toBe(true);
          done();
        });
      });
    });

    test("If onRejected is a function, it must be called after promise is rejected, with promise’s reason as its first argument.", () => {
      let promise = new PromiseAPlus((_, reject) => {
        reject("reason");
      });
      return new Promise<void>((done) => {
        promise.then(undefined, (reason) => {
          expect(promise[stateSymbol]).toBe(PromiseAPlusState.Rejected);
          expect(reason).toBe("reason");
          done();
        });
      });
    });

    test("“then” may be called multiple times on the same promise.", () => {
      let promise = new PromiseAPlus((resolve) => {
        resolve(1);
      });

      return new Promise<void>((done) => {
        promise.then((value) => {
          expect(value).toBe(1);
          promise.then((value2) => {
            expect(value2).toBe(1);
            done();
          });
        });
      });
    });

    test("then must return a promise", () => {
      let p1 = new PromiseAPlus((resolve) => {
        resolve(1);
      });

      let p2 = p1.then();

      expect(p2).toBeInstanceOf(PromiseAPlus);

      return new Promise<void>((done) => {
        p1.then()
          .then((value) => {
            expect(value).toBe(1);
            return 2;
          })
          .then((value) => {
            expect(value).toBe(2);
          })
          .then(() => {
            throw 3;
          })
          .then()
          .then(undefined, (reason) => {
            expect(reason).toBe(3);
            done();
          });
      });
    });
  });

  describe("The Promise Resolution Procedure", () => {
    test("If promise and x refer to the same object, reject promise with a TypeError as the reason.", () => {
      let resolveP: any;
      let p = new PromiseAPlus((resolve) => {
        resolveP = resolve;
      });
      resolveP(p);
      return new Promise<void>((done) => {
        p.then(undefined, (reason) => {
          expect(reason).toBeInstanceOf(TypeError);
          done();
        });
      });
    });
    test("If x is a promise, adopt its state", () => {
      let resolveP: any;
      let p = new PromiseAPlus((resolve) => {
        resolveP = resolve;
      });
      let resolveP2: any;
      let p2 = new PromiseAPlus((resolve) => {
        resolveP2 = resolve;
      });
      resolveP(p2);
      expect(p[stateSymbol]).toBe(PromiseAPlusState.Pending);
      resolveP2(1);
      expect(p[stateSymbol]).toBe(PromiseAPlusState.Fulfilled);
      expect(p[resultSymbol]).toBe(1);

      let rejectP3: any;
      let p3 = new PromiseAPlus((_, reject) => {
        rejectP3 = reject;
      });
      let rejectP4: any;
      let p4 = new PromiseAPlus((_, reject) => {
        rejectP4 = reject;
      });
      rejectP3(p4);
      expect(p3[stateSymbol]).toBe(PromiseAPlusState.Pending);
      let err = new Error();
      rejectP4(err);
      expect(p3[stateSymbol]).toBe(PromiseAPlusState.Rejected);
      expect(p3[resultSymbol]).toBe(err);
    });

    test("if x is an object or function", () => {
      let resolveP1: any;
      let p1 = new PromiseAPlus((resolve) => {
        resolveP1 = resolve;
      });
      let obj = {};
      resolveP1(obj);
      expect(p1[resultSymbol]).toBe(obj);

      let resolveP2: any;
      let p2 = new PromiseAPlus((resolve) => {
        resolveP2 = resolve;
      });
      resolveP2({
        then: (onFulfilled: any) => {
          onFulfilled(1);
        },
      });

      return new Promise<void>((done) => {
        p2.then((value) => {
          expect(value).toBe(1);
          done();
        });
      });
    });
  });
});
