// 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
//
// 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
//
// 你可以认为每种硬币的数量是无限的。
//
//
//
// 示例 1：
//
// 输入：coins = [1, 2, 5], amount = 11
// 输出：3
// 解释：11 = 5 + 5 + 1
//
// 示例 2：
//
// 输入：coins = [2], amount = 3
// 输出：-1
//
// 示例 3：
//
// 输入：coins = [1], amount = 0
// 输出：0
//
//
//
// 提示：
//
//     1 <= coins.length <= 12
//     1 <= coins[i] <= 231 - 1
//     0 <= amount <= 104

function coinChange(coins: number[], amount: number): number {
  // 给极大值作为初始值，最后以便片段是否找到解
  const dp = new Array(amount + 1).fill(Infinity);

  dp[0] = 0;

  const n = coins.length;
  for (let i = 0; i < n; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      if (j - coins[i] === Infinity) continue;
      // 要求最小，所以要求组合中最小的
      dp[j] = Math.min(dp[j - coins[i]] + 1, dp[j]);
    }
  }

  return dp[amount] == Infinity ? -1 : dp[amount];
}

import { describe, expect, test } from "vitest";

describe("零钱兑换（Coin Change）", () => {
  test("常规用例：coins = [1, 2, 5], amount = 11，最少硬币数为3", () => {
    expect(coinChange([1, 2, 5], 11)).toBe(3); // 11 = 5 + 5 + 1
  });

  test("无法凑成金额：coins = [2], amount = 3，返回-1", () => {
    expect(coinChange([2], 3)).toBe(-1);
  });

  test("金额为0：coins = [1], amount = 0，返回0", () => {
    expect(coinChange([1], 0)).toBe(0);
  });
});
