/**
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
 *
 *
 *
 * 示例 1：
 *
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[1,2,3,6,9,8,7,4,5]
 *
 * 示例 2：
 *
 * 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
 * 输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 **/
function spiralOrder(matrix: number[][]): number[] {
  if (matrix.length === 0 || matrix[0].length === 0) return [];

  const result: number[] = []; // 存储遍历结果
  let xOffset = 0, // 当前圈的左边界
    yOffset = 0; // 当前圈的上边界
  const rows = matrix.length; // 总行数
  const cols = matrix[0].length; // 总列数
  let x: number, y: number; // 用于遍历的临时变量
  let step = 1; // 当前圈数（第几层）
  let loop = Math.min(Math.ceil(rows / 2), Math.ceil(cols / 2)); // 需要遍历的圈数
  while (loop--) {
    x = xOffset;
    y = yOffset;

    // 特殊情况：只剩下一行
    if (rows - step === yOffset) {
      result.push(...matrix[y].slice(xOffset, cols - step + 1));
      break;
    }
    // 特殊情况：只剩下一列
    if (cols - step === xOffset) {
      result.push(
        ...matrix.slice(yOffset, rows - step + 1).map((row) => row[xOffset]),
      );
      break;
    }

    // 从左到右，遍历上边界（不包含右上角）
    for (x = xOffset; x < cols - step; x++) {
      result.push(matrix[y][x]);
    }
    // 从上到下，遍历右边界（不包含右下角）
    for (y = yOffset; y < rows - step; y++) {
      result.push(matrix[y][x]);
    }
    // 从右到左，遍历下边界（不包含左下角）
    for (x = cols - step; x > xOffset; x--) {
      result.push(matrix[y][x]);
    }
    // 从下到上，遍历左边界（不包含左上角）
    for (y = rows - step; y > yOffset; y--) {
      result.push(matrix[y][x]);
    }

    // 进入下一圈
    xOffset++;
    yOffset++;
    step++;
  }

  return result;
}

import { expect, test } from "vitest";

test("case 1", () => {
  const output = spiralOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
  expect(output).toEqual([1, 2, 3, 6, 9, 8, 7, 4, 5]);
});

test("case 2", () => {
  const output = spiralOrder([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ]);
  expect(output).toEqual([1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]);
});

test("case 3", () => {
  const output = spiralOrder([[1]]);
  expect(output).toEqual([1]);
});

test("case 4", () => {
  const output = spiralOrder([[6, 9, 7]]);
  expect(output).toEqual([6, 9, 7]);
});

test("case 5", () => {
  const output = spiralOrder([
    [2, 3, 4],
    [5, 6, 7],
    [8, 9, 10],
    [11, 12, 13],
    [14, 15, 16],
  ]);
  expect(output).toEqual([2, 3, 4, 7, 10, 13, 16, 15, 14, 11, 8, 5, 6, 9, 12]);
});
