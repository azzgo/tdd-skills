// 给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。
//
// 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。
//
//
//
// 示例 1：
//
// 输入：n = 12
// 输出：3
// 解释：12 = 4 + 4 + 4
//
// 示例 2：
//
// 输入：n = 13
// 输出：2
// 解释：13 = 4 + 9
//
//
//
// 提示：
//
//     1 <= n <= 104

export function numSquares(n: number): number {
  const dp = new Array(n + 1).fill(Infinity);

  // 代表不需要选数，就已经达成 0 这个背包，没必要使用 0 来凑，并且 0 也不符合题目才取数要求
  dp[0] = 0;

  for (let j = 0; j <= n; j++) {
    let i = 1;
    while (true) {
      if (Math.pow(i, 2) > n) break;
      if (j - Math.pow(i, 2) < 0) {
        i++;
        continue;
      }
      dp[j] = Math.min(dp[j - Math.pow(i, 2)] + 1, dp[j]);
      i++;
    }
  }

  return dp[n] === Infinity ? 0 : dp[n];
}

import { describe, expect, test } from "vitest";

describe("numSquares 完全平方数的最少数量", () => {
  test("示例1: n = 12 => 3 (4+4+4)", () => {
    expect(numSquares(12)).toBe(3);
  });
  test("示例2: n = 13 => 2 (4+9)", () => {
    expect(numSquares(13)).toBe(2);
  });
  // 可补充更多边界测试
});
