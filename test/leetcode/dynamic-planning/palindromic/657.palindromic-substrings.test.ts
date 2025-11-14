// 647. 回文子串
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。
//
// 回文字符串 是正着读和倒过来读一样的字符串。
//
// 子字符串 是字符串中的由连续字符组成的一个序列。
//
//
//
// 示例 1：
//
// 输入：s = "abc"
// 输出：3
// 解释：三个回文子串: "a", "b", "c"
// 示例 2：
//
// 输入：s = "aaa"
// 输出：6
// 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
//
//
// 提示：
//
// 1 <= s.length <= 1000
// s 由小写英文字母组成

const solutionType: "dp" | "doublePointer" = "doublePointer";

// dp solution
function dp(s: string): number {
  // dp 定义, 这里 dp 定义部分比较巧妙
  // 定义为: 从位置 i 到 位置j (含j)的字符子串是否是回文串
  // 原因:
  // 1. 因为按之前 s[i-1] 结尾的子串, 难以找到 s[i-2] 到 s[i-1] 的状态转移方程
  // 2. 如果 s[i,j] 是回文子串,且 s[i-1] 和 s[j+1] 相同,那么, s[i-1, i+1] 一定也是回文串,容易得出状态转移方程
  const dp = Array.from({ length: s.length }, () =>
    new Array(s.length).fill(false),
  );
  let result = 0;

  /**
   *            | dp[i+1][j-1] |
   * | dp[i][j] |
   *
   * 可以看出,dp[i][j] 从右上方数据推导而来
   **/
  for (let i = s.length - 1; i >= 0; i--) {
    // 因为 j>=i 判断才有意义
    for (let j = i; j < s.length; j++) {
      if (s[i] === s[j]) {
        if (i === j || i + 1 === j) {
          result++;
          dp[i][j] = true;
        } else if (dp[i + 1][j - 1]) {
          result++;
          dp[i][j] = true;
        }
      }
    }
  }

  return result;
}

// 从一定是回文串的部分开始向外扩展,如果 s[a,b] 是回文串, 且 s[a-1] 等于 s[b+1] 那回文串数量 +1
function doublePointer(s: string): number {
  let result = 0;

  for (let i = 0; i < s.length; i++) {
    let left = i
    let right = i;

    // 以单字符为中心扩展判断
    while (i >= 0 && right < s.length && s[right] === s[left]) {
      right++;
      left--;
      result++;
    }
    // 以双字符为中心扩展判断, 重复判断方法,可抽方法
    left = i;
    right = i + 1;
    while (i >= 0 && right < s.length && s[right] === s[left]) {
      right++;
      left--;
      result++;
    }
  }

  return result;
}

function countSubstrings(s: string): number {
  switch (solutionType) {
    case "dp":
      return dp(s);
    case "doublePointer":
      return doublePointer(s);
  }
}

import { describe, expect, test } from "vitest";

describe("Palindormic substrings", () => {
  test("case 1", () => {
    expect(countSubstrings("abc")).toBe(3);
  });
  test("case 2", () => {
    expect(countSubstrings("aaa")).toBe(6);
  });
});
