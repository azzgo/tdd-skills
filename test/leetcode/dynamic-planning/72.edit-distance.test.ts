// 72. 编辑距离
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。
//
// 你可以对一个单词进行如下三种操作：
//
// 插入一个字符
// 删除一个字符
// 替换一个字符
//
//
// 示例 1：
//
// 输入：word1 = "horse", word2 = "ros"
// 输出：3
// 解释：
// horse -> rorse (将 'h' 替换为 'r')
// rorse -> rose (删除 'r')
// rose -> ros (删除 'e')
// 示例 2：
//
// 输入：word1 = "intention", word2 = "execution"
// 输出：5
// 解释：
// intention -> inention (删除 't')
// inention -> enention (将 'i' 替换为 'e')
// enention -> exention (将 'n' 替换为 'x')
// exention -> exection (将 'n' 替换为 'c')
// exection -> execution (插入 'u')
//
//
// 提示：
//
// 0 <= word1.length, word2.length <= 500
// word1 和 word2 由小写英文字母组成


function minDistance(word1: string, word2: string): number {
  // dp 数组定义: 以 word1[i-1] 结尾的 转化成 word2[j-1] 所使用的最少操作数
  const dp = Array.from(
    { length: word1.length + 1 },
    () => new Array(word2.length + 1),
  );
  // initialization
  dp[0][0] = 0;
  for (let i = 1; i <= word1.length; i++) {
    // word1 从 i 个字符删除到空串
    dp[i][0] = i;
  }
  for (let j = 1; j <= word2.length; j++) {
    // word1 从空串增加 j 个字符达到 word2[j-1]
    dp[0][j] = j;
  }

  for (let i = 1; i <= word1.length; i++) {
    for (let j = 1; j <= word2.length; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // 增加一个元素, dp[i-1][j] 的基础上 word1 多了一个字符, 删除在 word1 上多出的字符
        // 删除一个元素, dp[i][j-1] 的基础上 word2 多了一个字符, 需要在 word1 上增加一个字符
        // 替换一个元素, dp[i-1][j-1] 的基础上增加一个替换操作
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + 1,
        );
      }
    }
  }

  return dp[word1.length][word2.length];
}

import { describe, expect, test } from "vitest";

describe("编辑距离", () => {
  test("示例1 horse -> ros", () => {
    expect(minDistance("horse", "ros")).toBe(3);
  });

  test("示例2 intention -> execution", () => {
    expect(minDistance("intention", "execution")).toBe(5);
  });

  test("空字符串", () => {
    expect(minDistance("", "abc")).toBe(3);
    expect(minDistance("abc", "")).toBe(3);
    expect(minDistance("", "")).toBe(0);
  });
});
