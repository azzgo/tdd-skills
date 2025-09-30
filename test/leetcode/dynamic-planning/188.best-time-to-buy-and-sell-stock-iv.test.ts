// 给你一个整数数组 prices 和一个整数 k ，其中 prices[i] 是某支给定的股票在第 i 天的价格。
//
// 设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。也就是说，你最多可以买 k 次，卖 k 次。
//
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
//
//
//
// 示例 1：
//
// 输入：k = 2, prices = [2,4,1]
// 输出：2
// 解释：在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。
//
// 示例 2：
//
// 输入：k = 2, prices = [3,2,6,5,0,3]
// 输出：7
// 解释：在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。
//      随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 。
//
//
//
// 提示：
//
//     1 <= k <= 100
//     1 <= prices.length <= 1000
//     0 <= prices[i] <= 1000

function maxProfit(k: number, prices: number[]): number {
  if (prices.length === 0) return 0;
  // dp 定义，表示在第 i 天, 在2k+1种情况下的最大收益
  // 0 -> 无操作, 表示一直无操作，收益恒等于 0， 可以做优化
  // 1 -> 第一次持有股票的手上最大收益, 2-> 第一次不持有股票的最大收益
  // 3 -> 第二次持有股票手上的最大友谊, 4-> 第二次不持有股票的最大收益
  // 2k-1->第 k 次持有股票手上的最大收益, 2k-> 第k次不持有股票的最大收益
  const dp = Array.from({ length: prices.length }, () =>
    new Array(2 * k + 1).fill(0),
  );
  const head = dp[0];
  for (let i = 1; i < 2 * k + 1; i+=2) {
    head[i] = -prices[0];
  }

  for (let i = 1; i < prices.length; i++) {
    for (let j = 1; j < 2 * k + 1; j++) {
      if (j % 2 === 0) {
        dp[i][j] = Math.max(dp[i - 1][j - 1] + prices[i], dp[i - 1][j]);
      } else {
        dp[i][j] = Math.max(dp[i - 1][j - 1] - prices[i], dp[i - 1][j]);
      }
    }
  }

  return dp[prices.length - 1][2 * k];
}

import { describe, expect, test } from "vitest";

describe("maxProfit", () => {
  test("示例1：k=2, prices=[2,4,1]，应返回2", () => {
    expect(maxProfit(2, [2, 4, 1])).toBe(2);
  });

  test("示例2：k=2, prices=[3,2,6,5,0,3]，应返回7", () => {
    expect(maxProfit(2, [3, 2, 6, 5, 0, 3])).toBe(7);
  });

  test("边界情况：prices为空数组，返回0", () => {
    expect(maxProfit(2, [])).toBe(0);
  });

  test("边界情况：k=0，返回0", () => {
    expect(maxProfit(0, [1, 2, 3, 4])).toBe(0);
  });

  test("边界情况：k大于prices长度/2，相当于不限次数", () => {
    expect(maxProfit(100, [1, 2, 3, 4, 5])).toBe(4);
  });

  test("边界情况：所有价格相同，利润为0", () => {
    expect(maxProfit(3, [5, 5, 5, 5])).toBe(0);
  });
});
