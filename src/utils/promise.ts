export const stateSymbol = Symbol("state");
export const resultSymbol = Symbol("result");

export enum PromiseAPlusState {
  Pending = "pending",
  Fulfilled = "fulfilled",
  Rejected = "rejected",
}

type OnFulfilled<Value = any> = (value: Value) => void;
type OnRejected<Reason = any> = (reason: Reason) => void;
type Resolve<Value = any> = (value: Value | Thenable) => void;
type Reject<Reason = any> = (reason: Reason) => void;

export interface Thenable<Value = any, Reason = any> {
  then: (
    onFulfilled?: OnFulfilled<Value>,
    onRejected?: OnRejected<Reason>
  ) => PromiseAPlus;
}

export const isThenable = (obj: any) => {
  if (typeof obj === "object" || typeof obj === "function") {
    return typeof obj.then === "function";
  }
  return false;
};

interface Handler<Value = any, Reason = any> {
  resolve: Resolve<Value>;
  reject: Reject<Reason>;
  onFulfilled?: OnFulfilled;
  onRejected?: OnRejected;
}

export class PromiseAPlus<Value = any, Reason = any>
  implements Thenable<Value, Reason>
{
  [stateSymbol]: PromiseAPlusState = PromiseAPlusState.Pending;
  [resultSymbol]?: Value | Reason | Thenable = undefined;
  #handlers: Handler<Value, Reason>[] = [];

  constructor(
    executor: (resolve: Resolve<Value>, reject: Reject<Reason>) => void
  ) {
    let rejected = (reason: Reason) => {
      this.#changeState(PromiseAPlusState.Rejected, reason);
    };
    let resolve = (value: Value | Thenable) => {
      try {
        this.#changeState(PromiseAPlusState.Fulfilled, value);
      } catch (e) {
        rejected(e as Reason);
      }
    };
    executor(resolve, rejected);
  }

  #changeState(state: PromiseAPlusState, result: Value | Reason | Thenable) {
    if (this[stateSymbol] !== PromiseAPlusState.Pending) {
      return;
    }
    if (result === this) {
      throw new TypeError("Chaining cycle detected");
    }
    if (isThenable(result)) {
      (result as Thenable).then(
        (value) => {
          this.#changeState(PromiseAPlusState.Fulfilled, value);
        },
        (reason) => {
          this.#changeState(PromiseAPlusState.Rejected, reason);
        }
      );
      return;
    }
    this[stateSymbol] = state;
    this[resultSymbol] = result;
    this.#run();
  }

  #run() {
    if (this[stateSymbol] === PromiseAPlusState.Pending) {
      return;
    }

    while (this.#handlers.length) {
      let { onRejected, onFulfilled, resolve, reject } =
        this.#handlers.shift()!;
      try {
        if (Object.is(this[stateSymbol], PromiseAPlusState.Fulfilled)) {
          if (typeof onFulfilled === "function") {
            let fulfilledResult = onFulfilled?.(this[resultSymbol] as Value);
            resolve(fulfilledResult as Value);
          } else {
            this[stateSymbol] === PromiseAPlusState.Fulfilled &&
              resolve(this[resultSymbol] as Value);
          }
        }
        if (Object.is(this[stateSymbol], PromiseAPlusState.Rejected)) {
          if (typeof onRejected === "function") {
            onRejected?.(this[resultSymbol] as Reason);
          } else {
            this[stateSymbol] === PromiseAPlusState.Rejected &&
              reject(this[resultSymbol] as Reason);
          }
        }
      } catch (e) {
        reject(e as Reason);
      }
    }
  }

  #nextTick = (cb: () => void) => {
    if (typeof process === "object" && typeof process.nextTick === "function") {
      process.nextTick(cb);
    } else if (MutationObserver) {
      let observer = new MutationObserver(cb);
      let textNode = document.createTextNode("1");
      observer.observe(textNode, {
        characterData: true,
      });
      textNode.data = "2";
    } else {
      setTimeout(cb, 0);
    }
  }

  then(onFulfilled?: OnFulfilled<Value>, onRejected?: OnRejected<Reason>) {
    return new PromiseAPlus((resolve, reject) => {
      this.#handlers.push({
        resolve,
        onFulfilled,
        reject,
        onRejected,
      });
      this.#nextTick(() => {
        this.#run();
      });
    });
  }
}
