/**
 * 有N种物品和一个容量为V 的背包。
 * 第i种物品最多有Mi件可用，每件耗费的空间是Ci ，价值是Wi 。
 * 求解将哪些物品装入背包可使这些物品的耗费的空间 总和不超过背包容量，且价值总和最大。
 **/

// 多重背包问题函数签名
function knapsack(
  itemCount: number, // 物品种类数
  capacity: number, // 背包容量
  counts: number[], // 每种物品可取数量
  weight: number[], // 每种物品体积
  values: number[], // 每种物品价值
): number {
  // 定义: dp[v] 表示容量为v时可获得的最大价值
  const dp = new Array(capacity + 1).fill(0);
  // 枚举每一种物品
  for (let i = 0; i < itemCount; i++) {
    // 逆序遍历容量，保证每种物品不会被重复选择
    for (let j = capacity; j >= weight[i]; j--) {
      // 枚举当前物品选择的数量k（从1到counts[i]）
      for (let k = 1; k <= counts[i]; k++) {
        // 如果当前容量不足以放下k件该物品，则跳过
        if (j - k * weight[i] < 0) continue;
        // 状态转移：尝试选择k件该物品，更新最大价值
        dp[j] = Math.max(dp[j], dp[j - k * weight[i]] + k * values[i]);
      }
    }
  }
  // 返回容量为capacity时的最大价值
  return dp[capacity];
}

import { describe, expect, test } from "vitest";

describe("Mutiple Knapsack Problem", () => {
  test("多重背包问题-基础用例", () => {
    // 有3种物品，背包最大承重为10
    // 物品0: 最多3件，每件重量3，价值4
    // 物品1: 最多2件，每件重量4，价值5
    // 物品2: 最多1件，每件重量2，价值3
    const n = 3;
    const maxWeight = 10;
    const count = [3, 2, 1];
    const weight = [3, 4, 2];
    const values = [4, 5, 3];
    const result = knapsack(n, maxWeight, count, weight, values);
    // weight: 4*1 + 3*2 = 10
    // values: 13 = 5 + 4 + 4
    expect(result).toBe(13);
  });

  test("背包容量为0", () => {
    const n = 2;
    const maxWeight = 0;
    const count = [2, 3];
    const weight = [1, 2];
    const values = [10, 20];
    expect(knapsack(n, maxWeight, count, weight, values)).toBe(0);
  });

  test("没有物品", () => {
    const n = 0;
    const maxWeight = 10;
    const count: number[] = [];
    const weight: number[] = [];
    const values: number[] = [];
    expect(knapsack(n, maxWeight, count, weight, values)).toBe(0);
  });

  test("所有物品数量为0", () => {
    const n = 2;
    const maxWeight = 10;
    const count = [0, 0];
    const weight = [2, 3];
    const values = [5, 6];
    expect(knapsack(n, maxWeight, count, weight, values)).toBe(0);
  });

  test("只有一种物品，能全部装下", () => {
    const n = 1;
    const maxWeight = 10;
    const count = [3];
    const weight = [2];
    const values = [5];
    // 3件都能装下，总价值15
    expect(knapsack(n, maxWeight, count, weight, values)).toBe(15);
  });

  test("所有物品都无法放入背包", () => {
    const n = 2;
    const maxWeight = 1;
    const count = [1, 1];
    const weight = [2, 3];
    const values = [10, 20];
    expect(knapsack(n, maxWeight, count, weight, values)).toBe(0);
  });

  test("所有物品都能全部放入背包", () => {
    const n = 2;
    const maxWeight = 10;
    const count = [2, 2];
    const weight = [2, 3];
    const values = [5, 6];
    // 2*2+2*3=10，2*5+2*6=22
    expect(knapsack(n, maxWeight, count, weight, values)).toBe(22);
  });
});
