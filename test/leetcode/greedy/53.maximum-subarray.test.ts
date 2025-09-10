// 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
//
// 是数组中的一个连续部分。
//
//
// 示例 1：
//
// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
//
// 示例 2：
//
// 输入：nums = [1]
// 输出：1
//
// 示例 3：
//
// 输入：nums = [5,4,-1,7,8]
// 输出：23
//
//
//
// 提示：
//
//     1 <= nums.length <= 105
//     -104 <= nums[i] <= 104
//
// 进阶：如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的 分治法 求解。

function maxSubArray(nums: number[]): number {
  let sum = 0;
  // 需要考虑负数场景，不然最大和可能只能在有正数场景下生效了
  let maxSum = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    // 这里要先加和，不然输入数据为负数的场景无法被 maxSum 计算到
    sum += nums[i];
    if (sum > maxSum) maxSum = sum;
    // 如果遇到累加和成负数了，说明一个累加片段统计完成
    // 含有这个区间的累加和，不可能更大了
    if (sum < 0) {
      sum = 0;
    }
  }

  return maxSum;
}

import { describe, expect, test } from "vitest";

describe("Maximum SubArray", () => {
  test("示例1: 包含负数和正数的数组", () => {
    expect(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
  });

  test("示例2: 单元素数组", () => {
    expect(maxSubArray([1])).toBe(1);
  });

  test("示例3: 全为正数的数组", () => {
    expect(maxSubArray([5, 4, -1, 7, 8])).toBe(23);
  });

  test("边界: 全为负数的数组", () => {
    expect(maxSubArray([-3, -2, -1, -4])).toBe(-1);
  });

  test("边界: 全为正数的数组", () => {
    expect(maxSubArray([1, 2, 3, 4])).toBe(10);
  });

  test("边界: 只有一个负数", () => {
    expect(maxSubArray([-5])).toBe(-5);
  });
});
