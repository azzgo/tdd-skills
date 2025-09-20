// 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
//
//
//
// 示例 1：
//
// 输入：nums = [1,5,11,5]
// 输出：true
// 解释：数组可以分割成 [1, 5, 5] 和 [11] 。
//
// 示例 2：
//
// 输入：nums = [1,2,3,5]
// 输出：false
// 解释：数组不能分割成两个元素和相等的子集。
//
//
//
// 提示：
//
//     1 <= nums.length <= 200
//     1 <= nums[i] <= 100

/*
 * 问题转化下就是是否能在集合中找到和为 sum/2 的子集。
 * 这里问题转化为背包问题的前提是：
 * 1. 把集合中的数字等同于背包问题中的 weight 和 value 且两者相等
 * 2. 判断 sum/2 的最大价值是否刚好也是 sum/2
 **/
function canPartition(nums: number[]): boolean {
  const totalSum = nums.reduce((a, b) => a + b);
  // 总和为奇数，不能平分
  if (totalSum % 2 === 1) return false;

  const targetSum = totalSum / 2;
  const size = nums.length;

  const dp = Array.from({ length: targetSum + 1 }).fill(0);

  for (let i = 0; i < size; i++) {
    for (let j = targetSum; j >= nums[i]; j--) {
      if (j < nums[i]) continue;
      dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i]);
    }
  }

  return dp[targetSum] === targetSum;
}

import { describe, expect, test } from "vitest";

describe("partition-equal-subset-sum", () => {
  test("should return true for [1,5,11,5]", () => {
    expect(canPartition([1, 5, 11, 5])).toBe(true);
  });

  test("should return false for [1,2,3,5]", () => {
    expect(canPartition([1, 2, 3, 5])).toBe(false);
  });

  test("should return true for [2,2,1,1]", () => {
    expect(canPartition([2, 2, 1, 1])).toBe(true);
  });

  test("should return false for [1]", () => {
    expect(canPartition([1])).toBe(false);
  });

  test("should return true for [100,100]", () => {
    expect(canPartition([100, 100])).toBe(true);
  });

  test("should return false for [2,2,3,5]", () => {
    expect(canPartition([2, 2, 3, 5])).toBe(false);
  });
});
