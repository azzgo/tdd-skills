// 在一条环路上有 n 个加油站，其中第 i 个加油站有汽油 gas[i] 升。
//
// 你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。你从其中的一个加油站出发，开始时油箱为空。
//
// 给定两个整数数组 gas 和 cost ，如果你可以按顺序绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1 。如果存在解，则 保证 它是 唯一 的。
//
// 示例 1:
//
// 输入: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
// 输出: 3
// 解释:
// 从 3 号加油站(索引为 3 处)出发，可获得 4 升汽油。此时油箱有 = 0 + 4 = 4 升汽油
// 开往 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升汽油
// 开往 0 号加油站，此时油箱有 8 - 2 + 1 = 7 升汽油
// 开往 1 号加油站，此时油箱有 7 - 3 + 2 = 6 升汽油
// 开往 2 号加油站，此时油箱有 6 - 4 + 3 = 5 升汽油
// 开往 3 号加油站，你需要消耗 5 升汽油，正好足够你返回到 3 号加油站。
// 因此，3 可为起始索引。
// 示例 2:
//
// 输入: gas = [2,3,4], cost = [3,4,3]
// 输出: -1
// 解释:
// 你不能从 0 号或 1 号加油站出发，因为没有足够的汽油可以让你行驶到下一个加油站。
// 我们从 2 号加油站出发，可以获得 4 升汽油。 此时油箱有 = 0 + 4 = 4 升汽油
// 开往 0 号加油站，此时油箱有 4 - 3 + 2 = 3 升汽油
// 开往 1 号加油站，此时油箱有 3 - 3 + 3 = 3 升汽油
// 你无法返回 2 号加油站，因为返程需要消耗 4 升汽油，但是你的油箱只有 3 升汽油。
// 因此，无论怎样，你都不可能绕环路行驶一周。
//
//
// 提示:
//
// n == gas.length == cost.length
// 1 <= n <= 105
// 0 <= gas[i], cost[i] <= 104
// 输入保证答案唯一。

const implType: "greedy" | "violence" = "greedy";
function canCompleteCircuitViolence(gas: number[], cost: number[]): number {
  for (let i = 0; i < gas.length; i++) {
    let rest = gas[i] - cost[i];
    let nextIndex = (i + 1) % gas.length;
    // 每个位置跑一圈,看最后的 rest 是否有剩
    while (rest > 0 && nextIndex !== i) {
      rest = rest + gas[nextIndex] - cost[nextIndex];
      nextIndex = (nextIndex + 1) % gas.length;
    }
    if (rest >= 0 && nextIndex === i) return i;
  }
  return -1;
}
function canCompleteCircuitGreedy(gas: number[], cost: number[]): number {
  let accSum = 0;
  let sum = 0;
  let startIndex = 0;
  for (let i = 0; i < gas.length; i++) {
    const rest = gas[i] - cost[i];
    sum += rest;
    accSum += rest;
    // 只要连续累加为负数,就说明之前设定的起始位置是不符合要求的,要再找
    // 再找就是贪心假设后面那个加油站就可以,连续找到最后一个位只要有符合累加和不小于 0
    // 要么就是这个解(题目说了解唯一),要么就是总体剩余油量 < 0, 无解
    if (accSum < 0) {
      startIndex = i + 1;
      accSum = 0;
    }
  }
  // 如果总和剩油量都小于0, 说明任何一个位置都无法环绕一圈
  if (sum < 0) return -1;
  return startIndex;
}

function canCompleteCircuit(gas: number[], cost: number[]): number {
  switch (implType) {
    case "violence":
      return canCompleteCircuitViolence(gas, cost);
    case "greedy":
      return canCompleteCircuitGreedy(gas, cost);
  }
}

import { describe, expect, test } from "vitest";

describe("canCompleteCircuit", () => {
  test("case 1", () => {
    // 示例1
    expect(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])).toBe(3);
  });
  test("case 2", () => {
    // 示例2
    expect(canCompleteCircuit([2, 3, 4], [3, 4, 3])).toBe(-1);
  });
});
