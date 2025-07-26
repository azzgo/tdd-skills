// 给你两个字符串：ransomNote 和 magazine ，判断 ransomNote 能不能由 magazine 里面的字符构成。
//
// 如果可以，返回 true ；否则返回 false 。
//
// magazine 中的每个字符只能在 ransomNote 中使用一次。
//
// 示例 1：
//
// 输入：ransomNote = "a", magazine = "b"
// 输出：false
//
// 示例 2：
//
// 输入：ransomNote = "aa", magazine = "ab"
// 输出：false
//
// 示例 3：
//
// 输入：ransomNote = "aa", magazine = "aab"
// 输出：true
//
// 提示：
//
//     1 <= ransomNote.length, magazine.length <= 105
//     ransomNote 和 magazine 由小写英文字母组成


function canConstruct(ransomNote: string, magazine: string): boolean {
  const magazineCountArray = Array(26).fill(0);
  for (const char of magazine) {
    magazineCountArray[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }

  for (const char of ransomNote) {
    const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
    if (magazineCountArray[index] === 0) {
      return false;
    }
    magazineCountArray[index]--; 
  }
  return true;
};

import { beforeEach, describe, expect, test, vi } from "vitest";

describe("Ransom note", () => {

  test("test case1", () => {
    expect(canConstruct("a", "b")).toBe(false);
  });
  test("test case2", () => {
    expect(canConstruct("aa", "ab")).toBe(false);
  });
  test("test case3", () => {
    expect(canConstruct("aa", "aab")).toBe(true);
  });
});
