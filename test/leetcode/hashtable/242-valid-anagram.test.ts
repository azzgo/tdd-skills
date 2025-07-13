/**
  * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的 字母异位词
  *示例 1:
  *
  *输入: s = "anagram", t = "nagaram"
  *输出: true
  *
  *示例 2:
  *
  *输入: s = "rat", t = "car"
  *输出: false
  *
  *提示:
  *    1 <= s.length, t.length <= 5 * 104
  *    s 和 t 仅包含小写字母
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = function (s: string, t: string): boolean {
  if (s.length !== t.length) {
    return false;
  }
  const sMap = new Map();

  for (const char of s) {
    sMap.set(char, (sMap.get(char) || 0) + 1);
  }
  for (const char of t) {
    if (!sMap.has(char) || sMap.get(char) === 0) {
      return false;
    }
    sMap.set(char, sMap.get(char) - 1);
  }
  for (const count of sMap.values()) {
    if (count !== 0) {
      return false;
    }
  }
  return true;
};

import { expect, test } from "vitest";

test("test case 1", () => {
  expect(isAnagram("anagram", "nagaram")).toBe(true);
});

test("test case 2", () => {
  expect(isAnagram("rat", "car")).toBe(false);
});
