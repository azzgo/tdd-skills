/* eslint-disable react-hooks/exhaustive-deps */
import { describe, expect, test, vi } from "vitest";
import { useEffect, useState } from "./reactify-system";

describe("Reactive Data Test Case", () => {
  test("state getter should return latest updated value", () => {
    const [count, setCount] = useState(1);
    expect(count()).toEqual(1);
    setCount(2);
    expect(count()).toEqual(2);
  });

  test("state changes will trigger useEffect callback", () => {
    const [count, setCount] = useState(1);
    const logger = vi.fn();

    useEffect(() => {
      logger(`current state is ${count()}`);
    });

    expect(logger).toBeCalledWith("current state is 1");
    setCount(count() + 1);
    expect(logger).toBeCalledWith("current state is 2");
  });

  test('useEffect should not trigger when getter and setter in the same effect', () => {
    const [count, setCount] = useState(1);
    const logger = vi.fn();

    useEffect(() => {
      logger(`current state is ${count()}`);
      setCount(count() + 1);
    });

    expect(logger).toBeCalledWith("current state is 1");
    expect(count()).toEqual(2);
    expect(logger).toBeCalledTimes(1);
  });
});
