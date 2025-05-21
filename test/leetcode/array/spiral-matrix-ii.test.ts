/**
  * 给定一个正整数 n，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。
  * 示例:
  * 输入: 3 输出: [ [ 1, 2, 3 ], [ 8, 9, 4 ], [ 7, 6, 5 ] ]
  **/
function generateMatrix(n: number): number[][] {
  const matrix: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  let num = 1;
  let loop = Math.floor(n / 2);
  let step = 1;
  let xOffset = 0, yOffset = 0;
  let x, y;
  while (loop--) {
    x = xOffset;
    y = yOffset;
    // 从左到右
    for (x = xOffset; x < n - step; x++) {
      matrix[y][x] = num++;
    }
    // 从上到下
    for (y = yOffset; y < n - step; y++) {
      matrix[y][x] = num++;
    }
    // 从右到左
    for (x = n - step; x > xOffset; x--) {
      matrix[y][x] = num++;
    }
    // 从下到上
    for (y = n - step; y > yOffset; y--) {
      matrix[y][x] = num++;
    }
    xOffset++;
    yOffset++;
    step++;
  }
  if (n % 2 === 1) {
    let middle = Math.floor(n / 2);
    matrix[middle][middle] = num;
  }
  return matrix;
};

import { expect, test } from "vitest";

test("case 1", () => {
  const output = generateMatrix(3);
  expect(output).toEqual([
    [1, 2, 3],
    [8, 9, 4],
    [7, 6, 5]
  ]);
});

test("case 2", () => {
  const output = generateMatrix(1);
  expect(output).toEqual([[1]]);
});

test("case 3", () => {
  const output = generateMatrix(2);
  expect(output).toEqual([
    [1, 2],
    [4, 3]
  ]);
});
