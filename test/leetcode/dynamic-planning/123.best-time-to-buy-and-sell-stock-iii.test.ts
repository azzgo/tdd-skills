// 给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
//
// 设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。
//
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
//
//
//
// 示例 1:
//
// 输入：prices = [3,3,5,0,0,3,1,4]
// 输出：6
// 解释：在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
//      随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
//
// 示例 2：
//
// 输入：prices = [1,2,3,4,5]
// 输出：4
// 解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
//      注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
//      因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
//
// 示例 3：
//
// 输入：prices = [7,6,4,3,1]
// 输出：0
// 解释：在这个情况下, 没有交易完成, 所以最大利润为 0。
//
// 示例 4：
//
// 输入：prices = [1]
// 输出：0
function maxProfit(prices: number[]): number {
  // dp 定义，表示在第 i 天, 在五种情况下的最大收益
  // 0 -> 无操作, 表示一直无操作，收益恒等于 0， 可以做优化
  // 1 -> 第一次持有股票的手上最大收益, 2-> 第一次不持有股票的最大收益
  // 3 -> 第二次持有股票手上的最大收益, 4-> 第二次不持有股票的最大收益
  const dp = Array.from({ length: prices.length }, () => new Array(5));
  const head = dp[0];
  head[0] = 0;
  head[1] = -prices[0];
  head[2] = 0;
  head[3] = -prices[0];
  head[4] = 0;

  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = dp[i - 1][0];
    dp[i][1] = Math.max(dp[i - 1][0] - prices[i], dp[i - 1][1]);
    dp[i][2] = Math.max(dp[i - 1][1] + prices[i], dp[i - 1][2]);
    dp[i][3] = Math.max(dp[i - 1][2] - prices[i], dp[i - 1][3]);
    dp[i][4] = Math.max(dp[i - 1][3] + prices[i], dp[i - 1][4]);
  }

  // 第二次卖出的收益定义 >= 第一次卖出的收益，因为可以视同第二次当天购入再卖出
  return dp[prices.length - 1][4];
}

import { describe, expect, test } from "vitest";

describe("Best Time to Buy and Sell Stock III", () => {
  test("Example 1: prices = [3,3,5,0,0,3,1,4] => 6", () => {
    expect(maxProfit([3, 3, 5, 0, 0, 3, 1, 4])).toBe(6);
  });
  test("Example 2: prices = [1,2,3,4,5] => 4", () => {
    expect(maxProfit([1, 2, 3, 4, 5])).toBe(4);
  });
  test("Example 3: prices = [7,6,4,3,1] => 0", () => {
    expect(maxProfit([7, 6, 4, 3, 1])).toBe(0);
  });
  test("Example 4: prices = [1] => 0", () => {
    expect(maxProfit([1])).toBe(0);
  });
});
