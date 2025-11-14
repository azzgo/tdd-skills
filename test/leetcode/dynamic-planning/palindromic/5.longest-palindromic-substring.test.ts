// 5. 最长回文子串
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个字符串 s，找到 s 中最长的 回文 子串。
//
//
//
// 示例 1：
//
// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。
// 示例 2：
//
// 输入：s = "cbbd"
// 输出："bb"
//
//
// 提示：
//
// 1 <= s.length <= 1000
// s 仅由数字和英文字母组成

// 和 516 的解题思路一致
function longestPalindrome(s: string): string {
  let longestPalindromeResult = "";

  for (let i = 0; i < s.length; i++) {
    let left = i;
    let right = i;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      if (right - left + 1 > longestPalindromeResult.length) {
        longestPalindromeResult = s.slice(left, right + 1);
      }
      left--;
      right++;
    }
    left = i;
    right = i + 1;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      if (right - left + 1 > longestPalindromeResult.length) {
        longestPalindromeResult = s.slice(left, right + 1);
      }
      left--;
      right++;
    }
  }

  return longestPalindromeResult;
}

import { describe, expect, test } from "vitest";

describe("Longest Palindormic Substrings", () => {
  test("case 1", () => {
    expect(longestPalindrome("babad")).toBeOneOf(["bab", "aba"]);
  });

  test("case 2", () => {
    expect(longestPalindrome("cbbd")).toBe("bb");
  });
});
