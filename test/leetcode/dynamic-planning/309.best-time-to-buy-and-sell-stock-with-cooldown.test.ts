// 给定一个整数数组prices，其中第  prices[i] 表示第 i 天的股票价格 。​
//
// 设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:
//
//     卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
//
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
//
//
//
// 示例 1:
//
// 输入: prices = [1,2,3,0,2]
// 输出: 3
// 解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]
//
// 示例 2:
//
// 输入: prices = [1]
// 输出: 0
//
//
//
// 提示：
//
//     1 <= prices.length <= 5000
//     0 <= prices[i] <= 1000

function maxProfit(prices: number[]): number {
  // dp[i][j] 第 i 天在四种状态下的最大收益
  // 0 -> 当天买入或持有状态
  // 1 -> 当日卖出
  // 2 -> 冻结期
  // 4 -> 卖出状态
  const dp = Array.from({ length: prices.length }, () => new Array(4));

  const head = dp[0];
  head[0] = -prices[0];
  head[1] = 0;
  head[2] = 0;
  head[3] = 0;

  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = Math.max(
      // 今日买入，昨天是卖出状态
      dp[i - 1][3] - prices[i],
      // 今日买入，昨天是冷冻期
      dp[i - 1][2] - prices[i],
      // 持有状态
      dp[i - 1][0],
    );
    dp[i][1] = dp[i - 1][0] + prices[i];
    dp[i][2] = dp[i - 1][1];
    // 前一天是冷冻期，或卖出状态
    dp[i][3] = Math.max(dp[i - 1][2], dp[i - 1][3]);
  }

  return Math.max(...dp[prices.length - 1]);
}

import { describe, expect, test } from "vitest";

describe("309. 最佳买卖股票时机含冷冻期", () => {
  test("示例1: prices = [1,2,3,0,2]，应返回3", () => {
    expect(maxProfit([1, 2, 3, 0, 2])).toBe(3);
  });
  test("示例2: prices = [1]，应返回0", () => {
    expect(maxProfit([1])).toBe(0);
  });
});
