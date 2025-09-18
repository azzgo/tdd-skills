// 给定一个 m x n 的整数数组 grid。一个机器人初始位于 左上角（即 grid[0][0]）。机器人尝试移动到 右下角（即 grid[m - 1][n - 1]）。机器人每次只能向下或者向右移动一步。
//
// 网格中的障碍物和空位置分别用 1 和 0 来表示。机器人的移动路径中不能包含 任何 有障碍物的方格。
//
// 返回机器人能够到达右下角的不同路径数量。
//
// 测试用例保证答案小于等于 2 * 109。
//
//
//
// 示例 1：
//
// 输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
// 输出：2
// 解释：3x3 网格的正中间有一个障碍物。
// 从左上角到右下角一共有 2 条不同的路径：
// 1. 向右 -> 向右 -> 向下 -> 向下
// 2. 向下 -> 向下 -> 向右 -> 向右
//
// 示例 2：
//
// 输入：obstacleGrid = [[0,1],[0,0]]
// 输出：1
//
//
//
// 提示：
//
//     m == obstacleGrid.length
//     n == obstacleGrid[i].length
//     1 <= m, n <= 100
//     obstacleGrid[i][j] 为 0 或 1

function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  // 定义 DP 数组，dp[i][j] 表明到 i,j 有多少种路径
  const dp = Array.from({ length: m }, () => new Array(n));

  // 初始化 dp 数组
  let flag = false;
  for (let i = 0; i < m; i++) {
    if (obstacleGrid[i][0] === 1 && !flag) {
      flag = true;
    }
    dp[i][0] = flag ? 0 : 1;
  }
  flag = false;
  for (let i = 0; i < n; i++) {
    if (obstacleGrid[0][i] === 1 && !flag) {
      flag = true;
    }
    dp[0][i] = flag ? 0 : 1;
  }
  // 障碍物位置路径为0
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0;
      }
    }
  }

  // 递推
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (dp[i][j] === undefined) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }
  return dp[m - 1][n - 1];
}

import { describe, expect, test } from "vitest";

describe("uniquePathsWithObstacles", () => {
  test("3x3 grid with center obstacle should return 2", () => {
    const obstacleGrid = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    expect(uniquePathsWithObstacles(obstacleGrid)).toBe(2);
  });

  test("2x2 grid with one obstacle should return 1", () => {
    const obstacleGrid = [
      [0, 1],
      [0, 0],
    ];
    expect(uniquePathsWithObstacles(obstacleGrid)).toBe(1);
  });

  test("start position is obstacle should return 0", () => {
    const obstacleGrid = [
      [1, 0],
      [0, 0],
    ];
    expect(uniquePathsWithObstacles(obstacleGrid)).toBe(0);
  });

  test("end position is obstacle should return 0", () => {
    const obstacleGrid = [
      [0, 0],
      [0, 1],
    ];
    expect(uniquePathsWithObstacles(obstacleGrid)).toBe(0);
  });

  test("case 4", () => {
    expect(uniquePathsWithObstacles([[0,1,0,0]])).toBe(0);
  });
});
