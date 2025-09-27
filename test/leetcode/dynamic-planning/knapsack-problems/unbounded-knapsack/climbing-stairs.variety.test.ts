// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
//
// 每次你可以爬至多m (1 <= m < n)个台阶。你有多少种不同的方法可以爬到楼顶呢？
//
// 注意：给定 n 是一个正整数。
//
// 输入描述：输入共一行，包含两个正整数，分别表示n, m
//
// 输出描述：输出一个整数，表示爬到楼顶的方法数。
//
// 输入示例：3 2
//
// 输出示例：3
//
// 提示：
//
// 当 m = 2，n = 3 时，n = 3 这表示一共有三个台阶，m = 2 代表你每次可以爬一个台阶或者两个台阶。
//
// 此时你有三种方法可以爬到楼顶。
//
//     1 阶 + 1 阶 + 1 阶段
//     1 阶 + 2 阶
//     2 阶 + 1 阶

// n: 总台阶数，m: 每次最多可爬的台阶数
function climbStairs(n: number, m: number): number {
  const dp = new Array(n + 1).fill(0);

  // 0阶梯，递推基础，可以视为0阶也有一种空集的方式
  dp[0] = 1;

  for (let j = 1; j <= n; j++) {
    for (let i = 1; i <= m; i++) {
      if (j - i < 0) continue;
      dp[j] += dp[j - i];
    }
  }

  return dp[n];
}

import { describe, expect, test } from "vitest";

describe("climbStairs 多阶爬楼梯变种", () => {
  test("n=3, m=2，示例用例", () => {
    // 3阶楼梯，每次最多爬2阶
    // 1+1+1, 1+2, 2+1
    expect(climbStairs(3, 2)).toBe(3);
  });

  test("n=4, m=2", () => {
    // 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2
    expect(climbStairs(4, 2)).toBe(5);
  });

  test("n=4, m=3", () => {
    // 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2, 1+3, 3+1
    expect(climbStairs(4, 3)).toBe(7);
  });

  test("n=1, m=1", () => {
    expect(climbStairs(1, 1)).toBe(1);
  });

  test("n=0, m=2", () => {
    // 0阶楼梯只有1种方式（什么都不做）
    expect(climbStairs(0, 2)).toBe(1);
  });

  test("n=5, m=5", () => {
    // m>=n时，相当于每次可以一步到顶
    // 1+1+1+1+1, 1+1+1+2, ..., 5
    expect(climbStairs(5, 5)).toBe(16);
  });
});
