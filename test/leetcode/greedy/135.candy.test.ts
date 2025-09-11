// n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。
//
// 你需要按照以下要求，给这些孩子分发糖果：
//
// 每个孩子至少分配到 1 个糖果。
// 相邻两个孩子中，评分更高的那个会获得更多的糖果。
// 请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。
//
//
//
// 示例 1：
//
// 输入：ratings = [1,0,2]
// 输出：5
// 解释：你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。
// 示例 2：
//
// 输入：ratings = [1,2,2]
// 输出：4
// 解释：你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。
//      第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。
//
//
// 提示：
//
// n == ratings.length
// 1 <= n <= 2 * 104
// 0 <= ratings[i] <= 2 * 104

function candy(ratings: number[]): number {
  const candyList = new Array(ratings.length).fill(1);
  // forward, if i > i -1, can get extra candy
  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candyList[i] = candyList[i - 1] + 1;
    }
  }
  // backward, if i > i+1, can get extra candy, but need compare with forward direction. put the larger one
  for (let i = ratings.length - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candyList[i] = Math.max(candyList[i], candyList[i + 1] + 1);
    }
  }
  return candyList.reduce((a, b) => a + b, 0);
}

import { describe, expect, test } from "vitest";

describe("Distribute candy", () => {
  test("ratings = [1,0,2] 应返回 5", () => {
    expect(candy([1, 0, 2])).toBe(5);
  });

  test("ratings = [1,2,2] 应返回 4", () => {
    expect(candy([1, 2, 2])).toBe(4);
  });

  test("单个孩子应返回 1", () => {
    expect(candy([5])).toBe(1);
  });

  test("递增序列应返回累加和", () => {
    expect(candy([1, 2, 3, 4])).toBe(10);
  });

  test("递减序列应返回累加和", () => {
    expect(candy([4, 3, 2, 1])).toBe(10);
  });

  test("全部相等应返回人数", () => {
    expect(candy([2, 2, 2, 2])).toBe(4);
  });

  test("case 6", () => {
    expect(candy([1, 3, 2, 2, 1])).toBe(7);
  });
});
