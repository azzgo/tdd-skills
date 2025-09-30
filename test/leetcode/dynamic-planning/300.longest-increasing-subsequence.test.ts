// 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
//
// 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的
//
// 。
//
//
// 示例 1：
//
// 输入：nums = [10,9,2,5,3,7,101,18]
// 输出：4
// 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
//
// 示例 2：
//
// 输入：nums = [0,1,0,3,2,3]
// 输出：4
//
// 示例 3：
//
// 输入：nums = [7,7,7,7,7,7,7]
// 输出：1
//
//
//
// 提示：
//
//     1 <= nums.length <= 2500
//     -104 <= nums[i] <= 104
//
//
//
// 进阶：
//
//     你能将算法的时间复杂度降低到 O(n log(n)) 吗?

const implType: "dp" | "greedy" = "greedy";

const dpImpl = (nums: number[]): number => {
  // dp 定义：从0-i元素中，以 nums[i] 结尾的，最大递增子序列的最大长度
  const dp = new Array(nums.length).fill(1);

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        // 取循环中比较中最大的
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  // 以 nums[length -1] 结尾的最大子序列可能不是最大的
  return Math.max(...dp);
};
const greedyImpl = (nums: number[]): number => {
  // 维护 tails 数组
  // tails[i] 代表的含意是，如果构建 i+1 长度的递增子序列，最后一位选取 nums 中尽量小的数字作为 tails[i] 的值
  // 这是因为这样找到的数组更可能构建更大的数组
  const tails = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > tails[tails.length - 1]) {
      tails.push(nums[i]);
    } else {
      let left = 0;
      let right = tails.length - 1;
      // 在 tails 中找合适的位置将 nums[i] 把对应位置替换了
      while (left < right) {
        let middle = left + Math.floor((right - left) / 2);
        if (tails[middle] < nums[i]) {
          left = middle + 1;
        } else {
          // 这里需要
          right = middle;
        }
      }
      tails[left] = nums[i];
    }
  }

  return tails.length;
};

function lengthOfLIS(nums: number[]): number {
  switch (implType) {
    case "dp":
      return dpImpl(nums);
    case "greedy":
      return greedyImpl(nums);
  }
}

import { describe, expect, test } from "vitest";

describe("lengthOfLIS", () => {
  test("returns the length of the longest increasing subsequence for example 1", () => {
    expect(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])).toBe(4);
  });

  test("returns the length of the longest increasing subsequence for example 2", () => {
    expect(lengthOfLIS([0, 1, 0, 3, 2, 3])).toBe(4);
  });

  test("returns the length of the longest increasing subsequence for example 3 (all elements equal)", () => {
    expect(lengthOfLIS([7, 7, 7, 7, 7, 7, 7])).toBe(1);
  });

  test("returns 1 for single element array", () => {
    expect(lengthOfLIS([42])).toBe(1);
  });

  test("returns correct length for strictly increasing array", () => {
    expect(lengthOfLIS([1, 2, 3, 4, 5])).toBe(5);
  });

  test("returns correct length for strictly decreasing array", () => {
    expect(lengthOfLIS([5, 4, 3, 2, 1])).toBe(1);
  });

  test("edge case", () => {
    const arr = [3, 5, 6, 2, 5, 4, 19, 5, 6, 7, 12];
    expect(lengthOfLIS(arr)).toBe(6);
  });
});
