// 给你一个整数数组 nums 和一个整数 k ，按以下方法修改该数组：
//
// 选择某个下标 i 并将 nums[i] 替换为 -nums[i] 。
// 重复这个过程恰好 k 次。可以多次选择同一个下标 i 。
//
// 以这种方式修改数组后，返回数组 可能的最大和 。
// 示例 1：
//
// 输入：nums = [4,2,3], k = 1
// 输出：5
// 解释：选择下标 1 ，nums 变为 [4,-2,3] 。
// 示例 2：
//
// 输入：nums = [3,-1,0,2], k = 3
// 输出：6
// 解释：选择下标 (1, 2, 2) ，nums 变为 [3,1,0,2] 。
// 示例 3：
//
// 输入：nums = [2,-3,-1,5,-4], k = 2
// 输出：13
// 解释：选择下标 (1, 4) ，nums 变为 [2,3,-1,5,4] 。
function largestSumAfterKNegations(nums: number[], k: number): number {
  nums.sort((a, b) => Math.abs(a) - Math.abs(b));
  let sum = 0;
  let i = nums.length - 1;
  let count = k;
  // 先处理大绝对值的数,负数颠倒过加总效应大
  while (i >= 0) {
    if (nums[i] < 0 && count > 0) {
      nums[i] = -nums[i];
      count--;
    }
    sum += nums[i];
    i--;
  }

  // 消耗剩余的 counter, 反复用绝对值最小的树当消耗品,将k用完
  if (count % 2 > 0) {
    sum -= 2 * nums[0];
  }

  return sum;
}

import { describe, expect, test } from "vitest";

describe("Largest sum of after k negations", () => {
  test("示例1: nums = [4,2,3], k = 1", () => {
    expect(largestSumAfterKNegations([4, 2, 3], 1)).toBe(5);
  });

  test("示例2: nums = [3,-1,0,2], k = 3", () => {
    expect(largestSumAfterKNegations([3, -1, 0, 2], 3)).toBe(6);
  });

  test("示例3: nums = [2,-3,-1,5,-4], k = 2", () => {
    expect(largestSumAfterKNegations([2, -3, -1, 5, -4], 2)).toBe(13);
  });

  test("全部为正数, k 任意", () => {
    expect(largestSumAfterKNegations([1, 2, 3], 5)).toBe(4);
  });

  test("全部为负数, k 足够大", () => {
    expect(largestSumAfterKNegations([-1, -2, -3], 3)).toBe(6);
  });

  test("有零, k 为偶数", () => {
    expect(largestSumAfterKNegations([0, -2, 3], 2)).toBe(5);
  });

  test("有零, k 为奇数", () => {
    expect(largestSumAfterKNegations([0, -2, 3], 3)).toBe(5);
  });

  test("k 大于数组长度", () => {
    expect(largestSumAfterKNegations([2, -1], 5)).toBe(3);
  });

  test("case 4", () => {
    expect(largestSumAfterKNegations([-8, 3, -5, -3, -5, -2], 6)).toBe(22);
  });
});
