// 给你一个二进制字符串数组 strs 和两个整数 m 和 n 。
//
// 请你找出并返回 strs 的最大子集的长度，该子集中 最多 有 m 个 0 和 n 个 1 。
//
// 如果 x 的所有元素也是 y 的元素，集合 x 是集合 y 的 子集 。
//
//
//
// 示例 1：
//
// 输入：strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3
// 输出：4
// 解释：最多有 5 个 0 和 3 个 1 的最大子集是 {"10","0001","1","0"} ，因此答案是 4 。
// 其他满足题意但较小的子集包括 {"0001","1"} 和 {"10","1","0"} 。{"111001"} 不满足题意，因为它含 4 个 1 ，大于 n 的值 3 。
//
// 示例 2：
//
// 输入：strs = ["10", "0", "1"], m = 1, n = 1
// 输出：2
// 解释：最大的子集是 {"0", "1"} ，所以答案是 2 。
//
//
//
// 提示：
//
//     1 <= strs.length <= 600
//     1 <= strs[i].length <= 100
//     strs[i] 仅由 '0' 和 '1' 组成
//     1 <= m, n <= 100

/**
 * 转化成 dp 问题描述
 *    - 求当背包容量为可以放 m 个 0 n 个1 时，最大子集 size
 * dp 定义: dp[i][j] 当背包可放 i 个 0，j 个 1 时，最大子集 size
 */
function findMaxForm(strs: string[], m: number, n: number): number {
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (const str of strs) {
    let zeroCount = 0;
    let oneCount = 0;
    for (const char of str) {
      if (char === "0") zeroCount++;
      else if (char === "1") oneCount++;
    }

    for (let i = m; i >= zeroCount; i--) {
      for (let j = n; j >= oneCount; j--) {
        dp[i][j] = Math.max(dp[i][j], dp[i - zeroCount][j - oneCount] + 1);
      }
    }
  }
  return dp[m][n];
}

import { describe, expect, test } from "vitest";

describe("0-1 背包：474. 一和零", () => {
  test("示例 1：strs = ['10', '0001', '111001', '1', '0'], m = 5, n = 3，最大子集长度为 4", () => {
    expect(findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3)).toBe(4);
  });

  test("示例 2：strs = ['10', '0', '1'], m = 1, n = 1，最大子集长度为 2", () => {
    expect(findMaxForm(["10", "0", "1"], 1, 1)).toBe(2);
  });

  test("case 3", () => {
    expect(findMaxForm(["00011", "00001", "00001", "0011", "111"], 8, 5)).toBe(
      3,
    );
  });
});
