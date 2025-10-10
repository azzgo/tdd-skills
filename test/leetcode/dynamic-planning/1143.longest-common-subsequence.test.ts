// 1143. 最长公共子序列
// 中等
// 相关标签
// premium lock icon相关企业
// 提示
//
// 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。
//
// 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
//
//     例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
//
// 两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。
//
//
//
// 示例 1：
//
// 输入：text1 = "abcde", text2 = "ace"
// 输出：3
// 解释：最长公共子序列是 "ace" ，它的长度为 3 。
//
// 示例 2：
//
// 输入：text1 = "abc", text2 = "abc"
// 输出：3
// 解释：最长公共子序列是 "abc" ，它的长度为 3 。
//
// 示例 3：
//
// 输入：text1 = "abc", text2 = "def"
// 输出：0
// 解释：两个字符串没有公共子序列，返回 0 。
//
//
//
// 提示：
//
//     1 <= text1.length, text2.length <= 1000
//     text1 和 text2 仅由小写英文字符组成。

function longestCommonSubsequence(text1: string, text2: string): number {
  // dp[i][j] 代表以 text1[i] 和 text2[j] 结尾可构成的最大公共子数组长度
  const dp = Array.from({ length: text1.length }, () =>
    new Array(text2.length).fill(0),
  );
  let maxLen = 0;
  // 初始化
  for (let i = 0; i < text1.length; i++) {
    if (text1[i] === text2[0]) {
      dp[i][0] = 1;
    }
  }
  for (let j = 0; j < text2.length; j++) {
    if (text1[0] === text2[j]) {
      dp[0][j] = 1;
    }
  }

  // 递推公式
  for (let i = 0; i < text1.length; i++) {
    for (let j = 0; j < text2.length; j++) {
      if (text1[i] === text2[j] && i > 0 && j > 0) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // 因为子序列可以不连续，所以要继承 i-1 和 j-1 中较大的值
        // 非初始化列行
        if (i > 0 && j > 0) {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        } else if (i > 0) {
          // 初始化的列行要和本身比大小
          dp[i][j] = Math.max(dp[i][j], dp[i - 1][j]);
        } else if (j > 0) {
          // 初始化的列行要和本身比大小
          dp[i][j] = Math.max(dp[i][j], dp[i][j - 1]);
        }
      }
      if (dp[i][j] > maxLen) {
        maxLen = dp[i][j];
      }
    }
  }


  return maxLen;
}
import { describe, expect, test } from "vitest";
describe("name", () => {
  test("示例1: text1 = 'abcde', text2 = 'ace'", () => {
    expect(longestCommonSubsequence("abcde", "ace")).toBe(3); // 最长公共子序列是 "ace"
  });

  test("示例2: text1 = 'abc', text2 = 'abc'", () => {
    expect(longestCommonSubsequence("abc", "abc")).toBe(3); // 最长公共子序列是 "abc"
  });

  test("示例3: text1 = 'abc', text2 = 'def'", () => {
    expect(longestCommonSubsequence("abc", "def")).toBe(0); // 没有公共子序列
  });

  test("边界: 空字符串", () => {
    expect(longestCommonSubsequence("", "abc")).toBe(0);
    expect(longestCommonSubsequence("abc", "")).toBe(0);
    expect(longestCommonSubsequence("", "")).toBe(0);
  });

  test("case 4", () => {
    expect(longestCommonSubsequence("bl", "yby")).toBe(1);
  });
});
