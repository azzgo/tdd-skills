/* eslint-disable react-hooks/rules-of-hooks */
// impl part
let callbackNode: NodeJS.Timeout | undefined = undefined;
let workInProgressHook: Hook | undefined = undefined;
let isMount = true;
let appInstance: {
  click: () => void;
}

type Action = (key: any) => void;

interface Fiber {
  memoizedState?: Hook;
  stateNode: () => { click: () => void };
}

interface Hook {
  queue: Queue;
  memoizedState: any;
  next?: Hook;
}

interface Update {
  action: Action;
  next?: Update;
}

interface Queue {
  pending?: Update;
}

const dumpApp = () => ({
  click() {
    console.log("🚀 file:simple-react-use-sta...-line:35 ");
  },
});

const fiber: Fiber = {
  memoizedState: undefined,
  stateNode: dumpApp,
};

function schedule() {
  if (callbackNode) {
    clearTimeout(callbackNode);
  }

  callbackNode = setTimeout(() => {
    // this line no use for this test
    // workInProgressHook = fiber.memoizedState;
    appInstance = fiber.stateNode();
    isMount = false;
  });
}

function dispatchSetState(queue: Queue, action: Action) {
  const update: Update = { action, next: undefined };
  if (!queue.pending) {
    queue.pending = update;
  } else {
    update.next = queue.pending;
    queue.pending.next = update;
  }
  queue.pending = update;

  schedule();
}

function useState(initialState: any) {
  let hook: Hook;
  if (isMount) {
    hook = {
      queue: { pending: undefined },
      memoizedState: initialState,
      next: undefined,
    };
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook;
    } else {
      workInProgressHook!.next = hook;
    }
    workInProgressHook = hook;
  } else {
    hook = workInProgressHook!;
    workInProgressHook = hook.next;
  }
  if (!hook) {
    throw new Error("target useState hook not found");
  }
  let baseState = hook.memoizedState;
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending;
    do {
      baseState = firstUpdate.action(baseState);
      firstUpdate = firstUpdate.next as Update;
    } while (firstUpdate);
    hook.queue.pending = undefined; // Clear the queue after processing
  }
  hook.memoizedState = baseState;

  return [hook.memoizedState, dispatchSetState.bind(null, hook.queue)];
}

// test part
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("Test Simple React useState", () => {
  let appFactory: Fiber["stateNode"] | null = null;
  beforeEach(() => {
    appFactory = null;
  });

  test("description", () => {
    vi.useFakeTimers();
    const logSpy = vi.fn();
    appFactory = () => {
      const [num, updateNum] = useState(0);
      logSpy(`${isMount ? "Mount" : "Update"}: num = ${num}`);

      return {
        click: () => {
          updateNum((prev: number) => prev + 1);
        },
      };
    };
    // Mount
    fiber.stateNode = appFactory;
    expect(isMount).toBe(true);
    schedule(); 
    vi.runAllTimers();
    expect(logSpy).toHaveBeenCalledWith("Mount: num = 0");

    // Update
    appInstance.click();
    logSpy.mockClear();
    vi.runAllTimers();
    expect(isMount).toBe(false);
    expect(logSpy).toHaveBeenCalledWith("Update: num = 1");
  });
});
