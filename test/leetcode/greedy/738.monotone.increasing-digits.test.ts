// 当且仅当每个相邻位数上的数字 x 和 y 满足 x <= y 时，我们称这个整数是单调递增的。
//
// 给定一个整数 n ，返回 小于或等于 n 的最大数字，且数字呈 单调递增 。
//
//
//
// 示例 1:
//
// 输入: n = 10
// 输出: 9
// 示例 2:
//
// 输入: n = 1234
// 输出: 1234
// 示例 3:
//
// 输入: n = 332
// 输出: 299
//
//
// 提示:
//
// 0 <= n <= 109
function monotoneIncreasingDigits(n: number): number {
  const digits = String(n).split("");

  // 标记最早需要翻成 9 的位置
  let flag = digits.length;
  for (let i = digits.length - 1; i >= 1; i--) {
    if (Number(digits[i]) < Number(digits[i - 1])) {
      digits[i - 1] = String(Number(digits[i - 1]) - 1);
      flag = i;
    }
  }
  for (let i = flag; i < digits.length; i++) {
    digits[i] = "9";
  }
  return Number(digits.join(""));
}

import { describe, expect, test } from "vitest";

describe("monotoneIncreasingDigits", () => {
  test("returns 9 for input 10", () => {
    expect(monotoneIncreasingDigits(10)).toBe(9);
  });
  test("returns 1234 for input 1234", () => {
    expect(monotoneIncreasingDigits(1234)).toBe(1234);
  });
  test("returns 299 for input 332", () => {
    expect(monotoneIncreasingDigits(332)).toBe(299);
  });
  test("returns 0 for input 0", () => {
    expect(monotoneIncreasingDigits(0)).toBe(0);
  });
  test("returns 999999999 for input 1000000000", () => {
    expect(monotoneIncreasingDigits(1000000000)).toBe(999999999);
  });
});
