// 给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数。
//
// 示例 1：
//
// 输入：n = 3
// 输出：5
//
// 示例 2：
//
// 输入：n = 1
// 输出：1
//
//
//
// 提示：
//
//     1 <= n <= 19

function numTrees(n: number): number {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= n; i++) {
    for (let j = i - 1; j >= 0; j--) {
      dp[i] += dp[j] * dp[i - j - 1];
    }
  }
  return dp[n];
}

import { describe, expect, test } from "vitest";

describe("unique-binary-search-trees", () => {
  test("should return the number of unique BSTs for given n", () => {
    // 示例 2: n = 1, 输出 1
    expect(numTrees(1)).toBe(1);
    // 边界情况: n = 2, 输出 2
    expect(numTrees(2)).toBe(2);
    // 示例 1: n = 3, 输出 5
    expect(numTrees(3)).toBe(5);
    // 较大值: n = 4, 输出 14
    expect(numTrees(4)).toBe(14);
    // 边界最大值: n = 19, 只测试类型
    expect(typeof numTrees(19)).toBe("number");
  });
});
