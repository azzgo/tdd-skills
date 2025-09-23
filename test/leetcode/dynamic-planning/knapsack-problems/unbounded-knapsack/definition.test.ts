// 完全背包问题(Unbounded Knapsack Problem)
// 背包问题的一种变体
// 其中每种物品都可以被无限次地放入背包中，与一次只能选一个的0/1背包问题不同

const implType: "2-d array" | "1-d array" = "1-d array";

function knapsack(
  weight: number[],
  value: number[],
  n: number,
  size: number,
): number {
  const twoDimensionSolution = () => {
    if (n === 0) return 0;
    // dp[i][j] 物品编号 0-i, 物品可以无限取，放入背包容量为 j 的最大价值
    const dp: number[][] = Array.from({ length: n }, () => new Array(size + 1));
    // 初始化
    for (let i = 0; i < n; i++) {
      dp[i][0] = 0;
    }
    // 因为可以无限存放，只要能放下物品0，就不断堆叠
    for (let j = 0; j <= size; j++) {
      // 先确保有值，避免 weight 为0，计算出 NaN
      dp[0][j] = 0;
      if (j >= weight[0]) {
        dp[0][j] = dp[0][j - weight[0]] + value[0];
      }
    }

    // 递推
    for (let i = 0; i < n; i++) {
      for (let j = 0; j <= size; j++) {
        if (j < weight[i]) {
          dp[i][j] = dp[i - 1][j];
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - weight[i]] + value[i]);
        }
      }
    }
    return dp[n - 1][size];
  };
  const oneDimensionSolution = () => {
    const dp = new Array(size + 1).fill(0);
    for (let i = 0; i < n; i++) {
      for (let j = 1; j <= size; j++) {
        if (j < weight[i]) {
          continue;
        } else {
          dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
        }
      }
    }
    return dp[size];
  };

  switch (implType) {
    case "2-d array":
      return twoDimensionSolution();
    case "1-d array":
      return oneDimensionSolution();
  }
}

import { describe, expect, test } from "vitest";

describe("Unbounded Knapsack Problem", () => {
  test("should return the maximum value for given weights and values", () => {
    const weights = [2, 3, 4];
    const values = [3, 4, 5];
    const n = 3;
    const size = 7;
    expect(knapsack(weights, values, n, size)).toBe(10);
  });

  test("should return 0 when capacity is 0", () => {
    const weights = [1, 2, 3];
    const values = [10, 20, 30];
    const n = 3;
    const size = 0;
    expect(knapsack(weights, values, n, size)).toBe(0);
  });

  test("should return 0 when there are no items", () => {
    const weights: number[] = [];
    const values: number[] = [];
    const n = 0;
    const size = 10;
    expect(knapsack(weights, values, n, size)).toBe(0);
  });

  test("should handle single item multiple times", () => {
    const weights = [2];
    const values = [5];
    const n = 1;
    const size = 8;
    // 最多可以放4次，总价值20
    expect(knapsack(weights, values, n, size)).toBe(20);
  });

  test("should handle items with zero value or weight", () => {
    const weights = [0, 2];
    const values = [0, 3];
    const n = 2;
    const size = 4;
    // 0重量0价值物品应被忽略，最多放2个2重量物品，总价值6
    expect(knapsack(weights, values, n, size)).toBe(6);
  });

  test("should handle small capacity with large items", () => {
    const weights = [5, 6];
    const values = [10, 12];
    const n = 2;
    const size = 4;
    // 背包容量小于所有物品重量，无法放入任何物品
    expect(knapsack(weights, values, n, size)).toBe(0);
  });

  test("should handle all items with same weight and value", () => {
    const weights = [2, 2, 2];
    const values = [3, 3, 3];
    const n = 3;
    const size = 6;
    // 可以放3个，总价值9
    expect(knapsack(weights, values, n, size)).toBe(9);
  });
});
