// 按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。
//
// n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
//
// 给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。
//
// 每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。
//
//
//
// 示例 1：
//
// 输入：n = 4
// 输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
// 解释：如上图所示，4 皇后问题存在两个不同的解法。
//
// 示例 2：
//
// 输入：n = 1
// 输出：[["Q"]]
//
//
//
// 提示：
//
//     1 <= n <= 9

/**
 * 求解 n 皇后问题，返回所有可行的棋盘布局
 * @param n 棋盘大小（皇后数量）
 * @returns 所有解，每个解是字符串数组，表示棋盘
 */
function solveNQueens(n: number): string[][] {
  // 用于收集所有解
  const result: string[][] = [];

  /**
   * 判断在 (row, col) 位置放皇后是否合法
   * @param row 当前行
   * @param col 当前列
   * @param cheetboard 当前棋盘状态
   * @returns 是否可以放置
   */
  const isValid = (
    row: number,
    col: number,
    cheetboard: string[][],
  ): boolean => {
    // 检查同一列是否有皇后
    for (let i = 0; i < row; i++) {
      if (cheetboard[i][col] === "Q") {
        return false;
      }
    }
    // 检查左上斜线（45度）是否有皇后
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (cheetboard[i][j] === "Q") {
        return false;
      }
    }
    // 检查右上斜线（135度）是否有皇后
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (cheetboard[i][j] === "Q") {
        return false;
      }
    }
    // 如果都没有冲突，返回 true
    return true;
  };
  /**
   * 回溯递归函数，尝试在每一行放皇后
   * @param row 当前递归到第几行
   * @param cheetboard 当前棋盘状态
   */
  const backtrace = (
    row: number = 0,
    cheetboard: string[][] = Array.from(
      { length: n },
      () => new Array(n).fill("."), // 初始化棋盘，每一行都是独立数组
    ),
  ) => {
    // 递归终止条件：所有行都放完，说明找到一个解
    if (row === n) {
      // 将棋盘每一行转为字符串，加入结果
      result.push(cheetboard.map((cheetRow) => cheetRow.join("")));
      return;
    }
    // 尝试在当前行的每一列放皇后
    for (let col = 0; col < n; col++) {
      if (isValid(row, col, cheetboard)) {
        // 放置皇后
        cheetboard[row][col] = "Q";
        // 递归到下一行
        backtrace(row + 1, cheetboard);
        // 回溯，撤销当前放置
        cheetboard[row][col] = ".";
      }
    }
  };
  // 从第 0 行开始递归
  backtrace();

  // 返回所有解
  return result;
}

import { describe, expect, test } from "vitest";

describe("N Queens", () => {
  test("n = 1", () => {
    expect(solveNQueens(1)).toEqual([["Q"]]);
  });

  test("n = 4", () => {
    expect(solveNQueens(4)).toEqual([
      [".Q..", "...Q", "Q...", "..Q."],
      ["..Q.", "Q...", "...Q", ".Q.."],
    ]);
  });

  test("n = 2 (无解)", () => {
    expect(solveNQueens(2)).toEqual([]);
  });

  test("n = 3 (无解)", () => {
    expect(solveNQueens(3)).toEqual([]);
  });
});
