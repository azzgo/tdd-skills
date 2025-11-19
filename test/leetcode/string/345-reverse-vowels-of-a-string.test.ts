// 给你一个字符串 s ，仅反转字符串中的所有元音字母，并返回结果字符串。
//
// 元音字母包括 'a'、'e'、'i'、'o'、'u'，且可能以大小写两种形式出现不止一次。
//
//
//
// 示例 1：
//
// 输入：s = "IceCreAm"
//
// 输出："AceCreIm"
//
// 解释：
//
// s 中的元音是 ['I', 'e', 'e', 'A']。反转这些元音，s 变为 "AceCreIm".
//
// 示例 2：
//
// 输入：s = "leetcode"
//
// 输出："leotcede"
//
//
//
// 提示：
//
// 1 <= s.length <= 3 * 105
// s 由 可打印的 ASCII 字符组成

function reverseVowels(s: string): string {
  const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);

  let left = 0;
  let right = s.length - 1;
  const result = s.split("");

  while (left < right) {
    while (left < right && !vowels.has(s[right])) right--;
    while (left < right && !vowels.has(s[left])) left++;
    if (left < right && vowels.has(s[left]) && vowels.has(s[right])) {
      result[left] = s[right];
      result[right] = s[left];
      left++;
      right--;
    }
  }

  return result.join("");
}

import { describe, expect, test } from "vitest";

describe("reverseVowels", () => {
  test("should reverse vowels in 'IceCreAm'", () => {
    expect(reverseVowels("IceCreAm")).toBe("AceCreIm");
  });

  test("should reverse vowels in 'leetcode'", () => {
    expect(reverseVowels("leetcode")).toBe("leotcede");
  });
});
