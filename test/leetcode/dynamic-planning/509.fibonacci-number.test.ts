// 斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：
//
// F(0) = 0，F(1) = 1
// F(n) = F(n - 1) + F(n - 2)，其中 n > 1
//
// 给定 n ，请计算 F(n) 。
//
//
//
// 示例 1：
//
// 输入：n = 2
// 输出：1
// 解释：F(2) = F(1) + F(0) = 1 + 0 = 1
//
// 示例 2：
//
// 输入：n = 3
// 输出：2
// 解释：F(3) = F(2) + F(1) = 1 + 1 = 2
//
// 示例 3：
//
// 输入：n = 4
// 输出：3
// 解释：F(4) = F(3) + F(2) = 2 + 1 = 3
//
//
//
// 提示：
//
//     0 <= n <= 30


// 动态规划解法，用来理解 DP 的解题讨论
function fib(n: number): number {
  if (n <= 1) return n;
  const dp = [0, 1]
  for (let i = 2; i <= n; i++) {
    const sum = dp[1] + dp[0];
    // 重复利用 dp[0] 和 dp[1] 降低空间复杂度
    dp[0] = dp[1];
    dp[1] = sum;
  }
  return dp[1];
}

import { describe, expect, test } from "vitest";

describe("斐波那契数列", () => {
  test("基础用例", () => {
    expect(fib(0)).toBe(0); // 边界值
    expect(fib(1)).toBe(1); // 边界值
    expect(fib(2)).toBe(1);
    expect(fib(3)).toBe(2);
    expect(fib(4)).toBe(3);
    expect(fib(5)).toBe(5);
    expect(fib(10)).toBe(55);
    expect(fib(30)).toBe(832040); // 最大值
  });
});
