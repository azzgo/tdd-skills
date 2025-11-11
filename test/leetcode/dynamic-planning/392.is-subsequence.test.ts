// [力扣题目链接](https://leetcode.cn/problems/is-subsequence/)
//
// 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
//
// 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。
//
// 示例 1：
// * 输入：s = "abc", t = "ahbgdc"
// * 输出：true
//
// 示例 2：
// * 输入：s = "axc", t = "ahbgdc"
// * 输出：false
//
// 提示：
//
// * 0 <= s.length <= 100
// * 0 <= t.length <= 10^4
//
// 两个字符串都只由小写字符组成。

import { describe, it, expect } from "vitest";

// dp 解法, 双指针解法更优
function isSubsequence(s: string, t: string): boolean {
  // 定义: s[0,i-1] 与 t[0,i-1] 相同子序列的长度
  const dp = Array.from({ length: s.length + 1 }, () =>
    new Array(t.length + 1).fill(0),
  );

  // 初始化, 本身无意义
  dp[0][0] = 0;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= t.length; j++) {
      // 如果匹配成功,说明相同子序列的长度多匹配1位
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      // 如果匹配失败, 则回退到 t 的上一位匹配结果(j-2, 对应 dp[i][j-2])
      } else {
        dp[i][j] = dp[i][j - 1];
      }
    }
  }

  return dp[s.length][t.length] === s.length;
}

describe("isSubsequence 子序列判定", () => {
  it("空字符串 s 总是 t 的子序列", () => {
    expect(isSubsequence("", "abc")).toBe(true);
    expect(isSubsequence("", "")).toBe(true);
  });

  it("t 为空字符串时，只有 s 也为空才为 true", () => {
    expect(isSubsequence("a", "")).toBe(false);
    expect(isSubsequence("abc", "")).toBe(false);
    expect(isSubsequence("", "")).toBe(true);
  });

  it("s 是 t 的子序列", () => {
    expect(isSubsequence("abc", "ahbgdc")).toBe(true); // 示例 1
    expect(isSubsequence("ace", "abcde")).toBe(true);
    expect(isSubsequence("a", "a")).toBe(true);
    expect(isSubsequence("b", "abc")).toBe(true);
    expect(isSubsequence("ace", "abcde")).toBe(true);
  });

  it("s 不是 t 的子序列", () => {
    expect(isSubsequence("axc", "ahbgdc")).toBe(false); // 示例 2
    expect(isSubsequence("aec", "abcde")).toBe(false);
    expect(isSubsequence("abc", "acb")).toBe(false);
  });

  it("边界情况：s 和 t 都很长", () => {
    const s = "a".repeat(100);
    const t = "a".repeat(10000);
    expect(isSubsequence(s, t)).toBe(true);
    expect(isSubsequence(s + "b", t)).toBe(false);
  });
});
