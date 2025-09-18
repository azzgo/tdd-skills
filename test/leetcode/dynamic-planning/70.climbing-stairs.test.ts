// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
//
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
//
// 示例 1：
//
// 输入：n = 2
// 输出：2
// 解释：有两种方法可以爬到楼顶。
// 1. 1 阶 + 1 阶
// 2. 2 阶
//
// 示例 2：
//
// 输入：n = 3
// 输出：3
// 解释：有三种方法可以爬到楼顶。
// 1. 1 阶 + 1 阶 + 1 阶
// 2. 1 阶 + 2 阶
// 3. 2 阶 + 1 阶
//
//
//
// 提示：
//
//     1 <= n <= 45

function climbStairs(n: number): number {
  if (n <= 2) return n;

  // dp[1], dp[2]
  const dp = [1, 2];
  for (let i = 3; i <= n; i++) {
    const sum = dp[1] + dp[0];
    dp[0] = dp[1];
    dp[1] = sum;
  }

  return dp[1];
}

import { describe, expect, test } from "vitest";

describe("climbStairs", () => {
  test("n = 1 应返回 1", () => {
    expect(climbStairs(1)).toBe(1);
  });
  test("n = 2 应返回 2", () => {
    expect(climbStairs(2)).toBe(2);
  });
  test("n = 3 应返回 3", () => {
    expect(climbStairs(3)).toBe(3);
  });
  test("n = 4 应返回 5", () => {
    expect(climbStairs(4)).toBe(5);
  });
  test("n = 10 应返回 89", () => {
    expect(climbStairs(10)).toBe(89);
  });
});
