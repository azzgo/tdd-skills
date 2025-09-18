// 给定一个正整数 n ，将其拆分为 k 个 正整数 的和（ k >= 2 ），并使这些整数的乘积最大化。
//
// 返回 你可以获得的最大乘积 。
//
//
//
// 示例 1:
//
// 输入: n = 2
// 输出: 1
// 解释: 2 = 1 + 1, 1 × 1 = 1。
//
// 示例 2:
//
// 输入: n = 10
// 输出: 36
// 解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
//
//
//
// 提示:
//
//     2 <= n <= 58

function integerBreak(n: number): number {
  // dp[i] 是第 i 的最大乘积
  const dp: number[] = new Array(n + 1).fill(0);
  dp[2] = 1;

  // 这里的递推是还是有暴力求解的影子
  // 这例不断循环找 j，并在(i-j) 或 dp[i-j] 中取最大
  // dp[i-j] 是之前的最大拆解的积(这里我理解降低了算法的复杂度，利用了已有数据)
  for (let i = 3; i <= n; i++) {
    for (let j = 1; j <= i / 2; j++) {
      // 因为要找多个 j , 所以 dp[i] 中在当前遍历中，不一定是最合适的解
      dp[i] = Math.max(dp[i], j * dp[i - j], j * (i - j));
    }
  }

  return dp[n];
}

import { describe, expect, test } from "vitest";

describe("integerBreak", () => {
  test("should return 1 for n = 2 (minimum input)", () => {
    expect(integerBreak(2)).toBe(1);
  });

  test("should return 2 for n = 3 (split into 2+1)", () => {
    expect(integerBreak(3)).toBe(2);
  });

  test("should return 4 for n = 4 (split into 2+2)", () => {
    expect(integerBreak(4)).toBe(4);
  });

  test("5", () => {
    // 2+3
    expect(integerBreak(5)).toBe(6);
  });

  test("should return 9 for n = 6 (split into 3+3)", () => {
    expect(integerBreak(6)).toBe(9);
  });

  test("7", () => {
    // 2*2*3 or 4 + 3
    expect(integerBreak(7)).toBe(12);
  });

  test("8", () => {
    // 2*3*3 = 18
    expect(integerBreak(8)).toBe(18);
  });

  test("9", () => {
    // 2+3+4
    expect(integerBreak(9)).toBe(27);
  });

  test("should return 36 for n = 10 (split into 3+3+4)", () => {
    expect(integerBreak(10)).toBe(36);
  });

  test("should handle upper bound n = 58", () => {
    expect(integerBreak(58)).toBeGreaterThan(0);
  });
});
