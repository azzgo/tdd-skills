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

  const result: number[] = [];
  let xOffset = 0,
    yOffset = 0;
  const rows = matrix.length;
  const cols = matrix[0].length;
  let x: number, y: number;
  let step = 1;
  let loop = Math.min(Math.ceil(rows / 2), Math.ceil(cols / 2));
  while (loop--) {
    x = xOffset;
    y = yOffset;

    if (rows - step === yOffset) {
      result.push(...matrix[y].slice(xOffset, cols - step + 1));
      break;
    }
    if (cols - step === xOffset) {
      result.push(...matrix.slice(yOffset, rows - step + 1).map((row) => row[xOffset]));
      break;
    }

    // 从左到右
    for (x = xOffset; x < cols - step; x++) {
      result.push(matrix[y][x]);
    }
    // 从上到下
    for (y = yOffset; y < rows - step; y++) {
      result.push(matrix[y][x]);
    }
    // 从右到左
    for (x = cols - step; x > xOffset; x--) {
      result.push(matrix[y][x]);
    }
    // 从下到上
    for (y = rows - step; y > yOffset; y--) {
      result.push(matrix[y][x]);
    }

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
  const output = spiralOrder([[2,3,4],[5,6,7],[8,9,10],[11,12,13],[14,15,16]]);
  expect(output).toEqual([2,3,4,7,10,13,16,15,14,11,8,5,6,9,12]);
});
