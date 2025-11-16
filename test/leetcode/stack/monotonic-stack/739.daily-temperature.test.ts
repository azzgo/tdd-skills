// 739. 每日温度
// 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。
//
//
//
// 示例 1:
//
// 输入: temperatures = [73,74,75,71,69,72,76,73]
// 输出: [1,1,4,2,1,1,0,0]
//
// 示例 2:
//
// 输入: temperatures = [30,40,50,60]
// 输出: [1,1,1,0]
//
// 示例 3:
//
// 输入: temperatures = [30,60,90]
// 输出: [1,1,0]
//
//
//
// 提示：
//
//     1 <= temperatures.length <= 105
//     30 <= temperatures[i] <= 100

function dailyTemperatures(temperatures: number[]): number[] {
  const result = new Array(temperatures.length).fill(0);
  if (temperatures.length <= 1) return result;
  const increStack = [0];
  for (let i = 1; i < temperatures.length; i++) {
    while(increStack.length > 0 && temperatures[i] > temperatures[increStack[increStack.length -1]]) {
      const topIndex = increStack.pop();
      result[topIndex] = i - topIndex;
    }
    increStack.push(i);
  }

  return result;
}

import { describe, expect, test } from "vitest";

describe("739 daily temperatures", () => {
  test("case 1", () => {
    expect(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])).toEqual([
      1, 1, 4, 2, 1, 1, 0, 0,
    ]);
  });

  test("case 2", () => {
    expect(dailyTemperatures([30, 40, 50, 60])).toEqual([1, 1, 1, 0]);
  });

  test("case 3", () => {
    expect(dailyTemperatures([30, 60, 90])).toEqual([1, 1, 0]);
  });
});
