// 674. 最长连续递增序列
// 简单
// 相关标签
// premium lock icon相关企业
//
// 给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。
//
// 连续递增的子序列 可以由两个下标 l 和 r（l < r）确定，如果对于每个 l <= i < r，都有 nums[i] < nums[i + 1] ，那么子序列 [nums[l], nums[l + 1], ..., nums[r - 1], nums[r]] 就是连续递增子序列。
//
//
//
// 示例 1：
//
// 输入：nums = [1,3,5,4,7]
// 输出：3
// 解释：最长连续递增序列是 [1,3,5], 长度为3。
// 尽管 [1,3,5,7] 也是升序的子序列, 但它不是连续的，因为 5 和 7 在原数组里被 4 隔开。
//
// 示例 2：
//
// 输入：nums = [2,2,2,2,2]
// 输出：1
// 解释：最长连续递增序列是 [2], 长度为1。
//
//
//
// 提示：
//
//     1 <= nums.length <= 104
//     -109 <= nums[i] <= 109

function findLengthOfLCIS(nums: number[]): number {
  // 边界场景
  if (nums.length === 0) return 0;
  // dp 定义：从0-i元素中，以 nums[i] 结尾的，最大连续递增子序列的最大长度
  const dp = new Array(nums.length)
    // 默认当前元素本身也是一个连续子集，最小应该是 1
    .fill(1);
  let maxLength = 1;
  for (let i = 1; i < nums.length; i++) {
    // 只要连续增加的，就增加
    if (nums[i] > nums[i - 1]) {
      dp[i] = dp[i - 1] + 1;
      if (dp[i] > maxLength) {
        maxLength = dp[i];
      }
    }
  }
  return maxLength;
}

import { describe, test, expect } from "vitest";

describe("674. 最长连续递增序列", () => {
  test("示例1：正常递增序列中断", () => {
    expect(findLengthOfLCIS([1, 3, 5, 4, 7])).toBe(3); // [1,3,5]
  });

  test("示例2：所有元素相等", () => {
    expect(findLengthOfLCIS([2, 2, 2, 2, 2])).toBe(1); // [2]
  });

  test("只有一个元素", () => {
    expect(findLengthOfLCIS([10])).toBe(1);
  });

  test("全部递增", () => {
    expect(findLengthOfLCIS([1, 2, 3, 4, 5])).toBe(5);
  });

  test("递增后递减", () => {
    expect(findLengthOfLCIS([1, 2, 3, 2, 1])).toBe(3);
  });

  test("递增段在末尾", () => {
    expect(findLengthOfLCIS([5, 1, 2, 3, 4])).toBe(4);
  });

  test("递增段在开头", () => {
    expect(findLengthOfLCIS([1, 2, 3, 1, 0])).toBe(3);
  });

  test("空数组", () => {
    expect(findLengthOfLCIS([])).toBe(0);
  });
});
