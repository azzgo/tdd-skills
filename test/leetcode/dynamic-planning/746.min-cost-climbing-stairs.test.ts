// 给你一个整数数组 cost ，其中 cost[i] 是从楼梯第 i 个台阶向上爬需要支付的费用。一旦你支付此费用，即可选择向上爬一个或者两个台阶。
//
// 你可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯。
//
// 请你计算并返回达到楼梯顶部的最低花费。
//
// 示例 1：
//
// 输入：cost = [10,15,20]
// 输出：15
// 解释：你将从下标为 1 的台阶开始。
// - 支付 15 ，向上爬两个台阶，到达楼梯顶部。
// 总花费为 15 。
//
// 示例 2：
//
// 输入：cost = [1,100,1,1,1,100,1,1,100,1]
// 输出：6
// 解释：你将从下标为 0 的台阶开始。
// - 支付 1 ，向上爬两个台阶，到达下标为 2 的台阶。
// - 支付 1 ，向上爬两个台阶，到达下标为 4 的台阶。
// - 支付 1 ，向上爬两个台阶，到达下标为 6 的台阶。
// - 支付 1 ，向上爬一个台阶，到达下标为 7 的台阶。
// - 支付 1 ，向上爬两个台阶，到达下标为 9 的台阶。
// - 支付 1 ，向上爬一个台阶，到达楼梯顶部。
// 总花费为 6 。
//
//
//
// 提示：
//
//     2 <= cost.length <= 1000
//     0 <= cost[i] <= 999

function minCostClimbingStairs(cost: number[]): number {
  if (cost.length <= 1) {
    return 0;
  }

  const dp = new Array(cost.length + 1);
  dp[0] = 0;
  dp[1] = 0;
  for (let i = 2; i <= cost.length; i++) {
    const a = dp[i - 2] + cost[i - 2];
    const b = dp[i - 1] + cost[i - 1];
    dp[i] = Math.min(a, b);
  }

  return dp[dp.length - 1];
}

import { describe, expect, test } from "vitest";

describe("minCostClimbingStairs", () => {
  test("示例1：cost = [10,15,20]，最低花费应为15", () => {
    expect(minCostClimbingStairs([10, 15, 20])).toBe(15);
  });

  test("示例2：cost = [1,100,1,1,1,100,1,1,100,1]，最低花费应为6", () => {
    expect(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])).toBe(6);
  });

  test("边界情况：cost = [0,0]，最低花费应为0", () => {
    expect(minCostClimbingStairs([0, 0])).toBe(0);
  });

  test("边界情况：cost = [1, 2]，最低花费应为1", () => {
    expect(minCostClimbingStairs([1, 2])).toBe(1);
  });
});
