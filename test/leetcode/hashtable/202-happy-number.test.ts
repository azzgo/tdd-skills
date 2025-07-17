/*
 * *编写一个算法来判断一个数 n 是不是快乐数。
 *
 *「快乐数」 定义为：
 *
 *    对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
 *    然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
 *    如果这个过程 结果为 1，那么这个数就是快乐数。
 *
 * 如果 n 是 快乐数 就返回 true ；不是，则返回 false 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：n = 19
 * 输出：true
 * 解释：
 * 12 + 92 = 82
 * 82 + 22 = 68
 * 62 + 82 = 100
 * 12 + 02 + 02 = 1
 *
 * 示例 2：
 *
 * 输入：n = 2
 * 输出：false
 *
 *
 *
 * 提示：1 <= n <= 231 - 1
 *
 * */

function isHappy(n: number): boolean {
  const seen = new Set<number>();

  let cur = n;
  while (cur !== 1 && !seen.has(cur)) {
    seen.add(cur)
    const digits = String(cur).split('');
    cur = digits.reduce((res, digit) => {
      res += Math.pow(Number(digit), 2)
      return res
    }, 0)
  }
  return cur === 1;
}

import { beforeEach, describe, expect, test, vi } from "vitest";

describe("isHappy", () => {
  test("returns true for happy number 19", () => {
    expect(isHappy(19)).toBe(true);
  });

  test("returns false for unhappy number 2", () => {
    expect(isHappy(2)).toBe(false);
  });

  test("returns true for happy number 1", () => {
    expect(isHappy(1)).toBe(true);
  });

  test("returns false for unhappy number 4", () => {
    expect(isHappy(4)).toBe(false);
  });

  test("returns true for happy number 7", () => {
    expect(isHappy(7)).toBe(true);
  });
});
