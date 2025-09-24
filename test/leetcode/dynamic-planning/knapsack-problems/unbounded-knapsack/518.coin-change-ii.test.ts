// 给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。
//
// 请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0 。
//
// 假设每一种面额的硬币有无限个。 
//
// 题目数据保证结果符合 32 位带符号整数。
//
//  
//
// 示例 1：
//
// 输入：amount = 5, coins = [1, 2, 5]
// 输出：4
// 解释：有四种方式可以凑成总金额：
// 5=5
// 5=2+2+1
// 5=2+1+1+1
// 5=1+1+1+1+1
//
// 示例 2：
//
// 输入：amount = 3, coins = [2]
// 输出：0
// 解释：只用面额 2 的硬币不能凑成总金额 3 。
//
// 示例 3：
//
// 输入：amount = 10, coins = [10] 
// 输出：1
//
//  
//
// 提示：
//
//     1 <= coins.length <= 300
//     1 <= coins[i] <= 5000
//     coins 中的所有值 互不相同
//     0 <= amount <= 5000

function change(amount: number, coins: number[]): number {
  // 填满背包 j 取物品的方式有几种
  const dp = new Array(amount + 1).fill(0);
  // dp[0] = 1
  dp[0] = 1;

  for (let i = 0; i < coins.length; i++) {
    for (let j = 1; j <= amount +1; j++) {
      if (j - coins[i] < 0) {
        continue
      } else {
        dp[j] = dp[j] + dp[j-coins[i]]
      }
    }
  }
  return dp[amount];
};

import { describe, expect, test } from "vitest";

describe("零钱兑换 II", () => {
  test("amount=5, coins=[1,2,5]，常规多组合", () => {
    expect(change(5, [1, 2, 5])).toBe(4);
  });

  test("amount=3, coins=[2]，无法组合", () => {
    expect(change(3, [2])).toBe(0);
  });

  test("amount=10, coins=[10]，只有一种组合", () => {
    expect(change(10, [10])).toBe(1);
  });

  test("amount=0, coins=[1,2,5]，金额为0", () => {
    expect(change(0, [1, 2, 5])).toBe(1);
  });

  test("amount=5, coins=[]，硬币数组为空", () => {
    expect(change(5, [])).toBe(0);
  });

  test("amount=3, coins=[5,6,7]，所有硬币都大于金额", () => {
    expect(change(3, [5, 6, 7])).toBe(0);
  });

  test("amount=5, coins=[1]，只有1元硬币", () => {
    expect(change(5, [1])).toBe(1);
  });

  test("amount=5, coins=[2,2,3]，硬币有重复面额", () => {
    expect(change(5, [2, 2, 3])).toBe(2);
  });

  test("amount=5000, coins=[1,2,5]，大金额性能边界", () => {
    expect(typeof change(5000, [1, 2, 5])).toBe("number");
  });
});
