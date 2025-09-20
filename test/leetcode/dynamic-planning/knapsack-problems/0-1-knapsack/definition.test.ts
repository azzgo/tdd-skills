// 对于 0-1 背包问题，类似的动态规划解法也以伪多项式时间运行。假设 w 1 , w 2 , … , w n , W {\displaystyle w_{1},\,w_{2},\,\ldots ,\,w_{n},\,W} 是严格正整数。
// 定义 m [ i , w ] {\displaystyle m[i,w]} 为使用前 i {\displaystyle i} 件物品，
// 在重量不超过 w {\displaystyle w} 的情况下可获得的最大价值。

const implType: "2-d array" | "1-d array" | "force" = "1-d array";

function knapsack(
  weight: number[],
  value: number[],
  n: number,
  size: number,
): number {
  const forceSolution = () => {
    let maxValue = 0;
    const backtrace = (start = 0, w = 0, v = 0) => {
      // for 循环中已经有终止条件判断了，这里多余
      // if (w > size) {
      //   return;
      // }

      for (let i = start; i <= n && w + weight[i] <= size; i++) {
        maxValue = Math.max(maxValue, v + value[i]);
        backtrace(i + 1, w + weight[i], v + value[i]);
      }
    };

    backtrace();
    return maxValue;
  };

  const twoDimensionSolution = () => {
    // 如果无物可取，没必要推导，返回价值永远是0
    if (n === 0) {
      return 0;
    }
    // dp[i][j] 表示，容量为 j 的背包，从物品编号从 0-i 中选择，能装取的最大价值 value
    const dp: number[][] = Array.from({ length: n }, () => new Array(size + 1));
    // 初始化 dp 数组
    for (let j = 0; j <= size; j++) {
      if (weight[0] > j) {
        dp[0][j] = 0;
      } else {
        dp[0][j] = value[0];
      }
    }
    for (let i = 0; i < n; i++) {
      dp[i][0] = 0;
    }

    for (let i = 1; i < n; i++) {
      for (let j = 1; j <= size; j++) {
        // 如果装不下，就延用不装当前物品的最大价值
        if (j < weight[i]) {
          dp[i][j] = dp[i - 1][j];
        } else {
          dp[i][j] = Math.max(
            dp[i - 1][j],
            dp[i - 1][j - weight[i]] + value[i],
          );
        }
      }
    }

    return dp[n - 1][size];
  };
  const oneDimensionSolution = () => {
    const dp = new Array(size + 1).fill(0);

    for (let i = 0; i < n; i++) {
      // 减少到比 weight[i] 更小，就没有遍历的必要了，因为装不下 weight[i] 了
      for (let j = size; j >= weight[i]; j--) {
        // 如果装不下，就延用不装当前物品的最大价值
        if (j < weight[i]) {
          // dp[j] = dp[j];
          continue;
        } else {
          dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
        }
      }
    }
    return dp[size];
  };

  switch (implType) {
    case "force":
      return forceSolution();
    case "2-d array":
      return twoDimensionSolution();
    case "1-d array":
      return oneDimensionSolution();
  }
}

import { describe, expect, test } from "vitest";

describe("0 1 knapsack problems", () => {
  test("returns the maximum value for a given weight and value array", () => {
    // 物品重量
    const weight = [2, 1, 3];
    // 物品价值
    const value = [4, 2, 3];
    // 背包最大承重
    const maxWeight = 4;
    // 物品数量
    const n = weight.length;
    // 期望最大价值为 6（选择第 1 和第 2 个物品）
    expect(knapsack(weight, value, n, maxWeight)).toBe(6);
  });

  test("returns 0 when there are no items", () => {
    expect(knapsack([], [], 0, 10)).toBe(0);
  });

  test("returns 0 when max weight is 0", () => {
    expect(knapsack([1, 2, 3], [10, 20, 30], 3, 0)).toBe(0);
  });

  test("returns value of single item if it fits", () => {
    expect(knapsack([2], [5], 1, 2)).toBe(5);
  });

  test("returns 0 if single item does not fit", () => {
    expect(knapsack([5], [10], 1, 3)).toBe(0);
  });

  test("returns 0 if all items are too heavy", () => {
    expect(knapsack([5, 6, 7], [10, 20, 30], 3, 4)).toBe(0);
  });

  test("returns sum of all values if all items fit", () => {
    expect(knapsack([1, 2, 3], [10, 20, 30], 3, 6)).toBe(60);
  });

  test("returns correct value when only some items can be chosen", () => {
    expect(knapsack([1, 3, 4, 5], [15, 20, 30, 40], 4, 7)).toBe(55); // 选第1和第4件
  });
});
