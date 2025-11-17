// 给你一个满足下述两条属性的 m x n 整数矩阵：
//
// 每行中的整数从左到右按非严格递增顺序排列。
// 每行的第一个整数大于前一行的最后一个整数。
// 给你一个整数 target ，如果 target 在矩阵中，返回 true ；否则，返回 false 。
//
//
//
// 示例 1：
//
//
// 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
// 输出：true
// 示例 2：
//
//
// 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
// 输出：false
//
//
// 提示：
//
// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 100
// -104 <= matrix[i][j], target <= 104

function searchMatrix(matrix: number[][], target: number): boolean {
  if (!matrix.length || !matrix[0].length) return false;

  let left = 0;
  let right = matrix.length;
  let marchedArr = null;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (
      target >= matrix[mid][0] &&
      target <= matrix[mid][matrix[mid].length - 1]
    ) {
      marchedArr = matrix[mid];
      break;
    } else if (target < matrix[mid][0]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  if (!marchedArr) {
    return false;
  }

  left = 0;
  right = marchedArr.length;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (marchedArr[mid] === target) {
      return true;
    } else if (target < marchedArr[mid]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return false;
}

import { describe, expect, test } from "vitest";

describe("Search a 2d matrix", () => {
  test("should return true when target exists in the matrix (example 1)", () => {
    const matrix = [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ];
    expect(searchMatrix(matrix, 3)).toBe(true);
  });

  test("should return false when target does not exist in the matrix (example 2)", () => {
    const matrix = [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ];
    expect(searchMatrix(matrix, 13)).toBe(false);
  });

  test("should return true for single row matrix", () => {
    const matrix = [[1, 2, 3, 4, 5]];
    expect(searchMatrix(matrix, 4)).toBe(true);
    expect(searchMatrix(matrix, 6)).toBe(false);
  });

  test("should return true for single column matrix", () => {
    const matrix = [[1], [3], [5], [7]];
    expect(searchMatrix(matrix, 5)).toBe(true);
    expect(searchMatrix(matrix, 2)).toBe(false);
  });

  test("should return false for empty matrix", () => {
    expect(searchMatrix([], 1)).toBe(false);
  });

  test("should return false for matrix with empty rows", () => {
    expect(searchMatrix([[]], 1)).toBe(false);
  });

  test("should return true for target at the first or last position", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    expect(searchMatrix(matrix, 1)).toBe(true);
    expect(searchMatrix(matrix, 9)).toBe(true);
  });
});
