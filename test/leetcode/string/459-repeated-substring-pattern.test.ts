// 459. 重复的子字符串
// 给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成。
//
// 示例 1:
//
// 输入: s = "abab"
// 输出: true
// 解释: 可由子串 "ab" 重复两次构成。
// 示例 2:
//
// 输入: s = "aba"
// 输出: false
// 示例 3:
//
// 输入: s = "abcabcabcabc"
// 输出: true
// 解释: 可由子串 "abc" 重复四次构成。 (或子串 "abcabc" 重复两次构成。)
//
//
// 提示：
//
// 1 <= s.length <= 104
// s 由小写英文字母组成
function repeatedSubstringPatternMatch(s: string): boolean {
  return (s + s).slice(1, -1).includes(s);
}

function repeatedSubstringPattern(s: string): boolean {
  const n = s.length;
  const next = new Array(n).fill(0);
  let j = 0;
  for (let i = 1; i < n; i++) {
    while (j > 0 && s[i] !== s[j]) {
      j = next[j - 1];
    }
    if (s[i] === s[j]) {
      j++;
    }
    next[i] = j;
  }
  // 当 next[n-1] 存在前后缀匹配, 且 n 能被子串长度整除时, 则说明 s 由子串重复多次构成
  if (next[n - 1] !== 0 && n % (n - next[n - 1]) === 0) {
    return true;
  }
  return false;
}

import { beforeEach, describe, expect, test, vi } from "vitest";

describe("repeated-substring-pattern", () => {
  beforeEach(() => {});

  test("case 1", () => {
    expect(repeatedSubstringPattern("abab")).toEqual(true);
  });

  test("case 2", () => {
    expect(repeatedSubstringPattern("aba")).toEqual(false);
  });

  test("case 3", () => {
    expect(repeatedSubstringPattern("abcabcabcabc")).toEqual(true);
  });
});
