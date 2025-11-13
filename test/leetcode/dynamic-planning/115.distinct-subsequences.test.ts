// 115. 不同的子序列
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 给你两个字符串 s 和 t ，统计并返回在 s 的 子序列 中 t 出现的个数。
//
// 测试用例保证结果在 32 位有符号整数范围内。
//
//
//
// 示例 1：
//
// 输入：s = "rabbbit", t = "rabbit"
// 输出：3
// 解释：
// 如下所示, 有 3 种可以从 s 中得到 "rabbit" 的方案。
// rabbbit
// rabbbit
// rabbbit
// 示例 2：
//
// 输入：s = "babgbag", t = "bag"
// 输出：5
// 解释：
// 如下所示, 有 5 种可以从 s 中得到 "bag" 的方案。
// babgbag
// babgbag
// babgbag
// babgbag
// babgbag
//
//
// 提示：
//
// 1 <= s.length, t.length <= 1000
// s 和 t 由英文字母组成
function numDistinct(s: string, t: string): number {
  // dp 定义, 以 s[i-1] 结尾的字符串中出现 t[j-1] 结尾的字符串的个数
  const dp = Array.from({ length: s.length + 1 }, () =>
    new Array(t.length + 1).fill(0),
  );
  // 初始化
  dp[0][0] = 1;
  for (let i = 1; i < s.length +1; i++) {
    dp[i][0] = 1;
  }
  for (let j = 1; j < t.length + 1; j++) {
    dp[0][j] = 0;
  }

  for (let i = 1; i < s.length + 1; i++) {
    for (let j = 1; j < t.length +1; j++) {
      // 当最后一位字母匹配
      if (s[i-1] === t[j-1]) {
        // 因为计算总数, 需要按场景求和
        // s-1 匹配 t-1 场景: dp[i-1][j-1]
        // s-1 不匹配场景(即用 s-2 结尾来匹配 j-1 的结论数量):  dp[i-1][j]
        dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
      } else {
        // s-1 不匹配场景(即用 s-2 结尾来匹配 j-1 的结论数量):  dp[i-1][j]
        dp[i][j] = dp[i-1][j]
      }
      
    }
    
  }

  return dp[s.length][t.length];
}

import { describe, expect, test } from "vitest";

describe("115. 不同的子序列 numDistinct", () => {
  test("示例1: s = 'rabbbit', t = 'rabbit' => 3", () => {
    expect(numDistinct("rabbbit", "rabbit")).toBe(3);
  });

  test("示例2: s = 'babgbag', t = 'bag' => 5", () => {
    expect(numDistinct("babgbag", "bag")).toBe(5);
  });

  test("边界情况: s = 'a', t = 'a' => 1", () => {
    expect(numDistinct("a", "a")).toBe(1);
  });

  test("边界情况: s = 'a', t = 'b' => 0", () => {
    expect(numDistinct("a", "b")).toBe(0);
  });

  test("边界情况: s = '', t = 'a' => 0", () => {
    expect(numDistinct("", "a")).toBe(0);
  });

  test("边界情况: s = 'a', t = '' => 1", () => {
    expect(numDistinct("a", "")).toBe(1);
  });
});
