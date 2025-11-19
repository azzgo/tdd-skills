// 给你一个非负整数 x ，计算并返回 x 的 算术平方根 。
//
// 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。
//
// 注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。
//
//
//
// 示例 1：
//
// 输入：x = 4
// 输出：2
// 示例 2：
//
// 输入：x = 8
// 输出：2
// 解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。
//
//
// 提示：
//
// 0 <= x <= 231 - 1

function mySqrt(x: number): number {
  let left = 0;
  let right = x + 1;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    const temp = mid * mid;
    if (temp <= x && (mid + 1) * (mid + 1) > x) {
      return mid;
    } else if (temp > x) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return 0;
}

import { describe, expect, test } from "vitest";

describe("Sqrt X", () => {
  test("should return 0 for input 0", () => {
    expect(mySqrt(0)).toBe(0);
  });

  test("should return 1 for input 1", () => {
    expect(mySqrt(1)).toBe(1);
  });

  test("should return 2 for input 4", () => {
    expect(mySqrt(4)).toBe(2);
  });

  test("should return 2 for input 8 (truncate decimal)", () => {
    expect(mySqrt(8)).toBe(2);
  });

  test("should return 46339 for input 2147395599 (large number)", () => {
    expect(mySqrt(2147395599)).toBe(46339);
  });
});
