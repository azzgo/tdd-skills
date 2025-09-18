// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
//
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
//
// 问总共有多少条不同的路径？
//
// 示例 1：
// ![](https://pic.leetcode.cn/1697422740-adxmsI-image.png)
//
// 输入：m = 3, n = 7
// 输出：28
//
// 示例 2：
//
// 输入：m = 3, n = 2
// 输出：3
// 解释：
// 从左上角开始，总共有 3 条路径可以到达右下角。
// 1. 向右 -> 向下 -> 向下
// 2. 向下 -> 向下 -> 向右
// 3. 向下 -> 向右 -> 向下
//
// 示例 3：
//
// 输入：m = 7, n = 3
// 输出：28
//
// 示例 4：
//
// 输入：m = 3, n = 3
// 输出：6

function uniquePaths(m: number, n: number): number {
  const dp: number[][] = Array.from({ length: m }, () => new Array(n));
  // 初始化 dp 数组
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
  }
  for (let i = 0; i < n; i++) {
    dp[0][i] = 1;
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // 递推公式
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  // 最后一项就是答案
  return dp[m - 1][n - 1];
}

import { describe, expect, test } from "vitest";

describe("uniquePaths", () => {
  test("returns 28 for a 3x7 grid", () => {
    expect(uniquePaths(3, 7)).toBe(28);
  });

  test("returns 3 for a 3x2 grid", () => {
    expect(uniquePaths(3, 2)).toBe(3);
  });

  test("returns 28 for a 7x3 grid", () => {
    expect(uniquePaths(7, 3)).toBe(28);
  });

  test("returns 6 for a 3x3 grid", () => {
    expect(uniquePaths(3, 3)).toBe(6);
  });

  test("returns 1 for a 1x1 grid (edge case)", () => {
    expect(uniquePaths(1, 1)).toBe(1);
  });
});
