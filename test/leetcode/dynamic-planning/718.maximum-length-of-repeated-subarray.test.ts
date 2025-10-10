// 718. 最长重复子数组
// 中等
// 相关标签
// premium lock icon相关企业
// 提示
//
// 给两个整数数组 nums1 和 nums2 ，返回 两个数组中 公共的 、长度最长的子数组的长度 。
//
//
//
// 示例 1：
//
// 输入：nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
// 输出：3
// 解释：长度最长的公共子数组是 [3,2,1] 。
//
// 示例 2：
//
// 输入：nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]
// 输出：5
//
//
//
// 提示：
//
//     1 <= nums1.length, nums2.length <= 1000
//     0 <= nums1[i], nums2[i] <= 100

function findLength(nums1: number[], nums2: number[]): number {
  // dp[i][j] 代表以 nums1[i] 和 nums2[j] 结尾可构成的最大公共子数组长度
  const dp = Array.from({ length: nums1.length }, () =>
    new Array(nums2.length).fill(0),
  );
  let maxLen = 0;
  // 初始化
  for (let i = 0; i < nums1.length; i++) {
    if (nums1[i] === nums2[0]) {
      dp[i][0] = 1;
      maxLen = 1;
    }
  }
  for (let j = 0; j < nums2.length; j++) {
    if (nums1[0] === nums2[j]) {
      dp[0][j] = 1;
      maxLen = 1;
    }
  }

  // 递推公式
  for (let i = 1; i < nums1.length; i++) {
    for (let j = 1; j < nums2.length; j++) {
      if (nums1[i] === nums2[j]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      }
      if (dp[i][j] > maxLen) {
        maxLen = dp[i][j];
      }
    }
  }
  return maxLen;
}

import { describe, expect, test } from "vitest";

describe("最长重复子数组", () => {
  test("示例1：存在公共子数组", () => {
    const nums1 = [1, 2, 3, 2, 1];
    const nums2 = [3, 2, 1, 4, 7];
    expect(findLength(nums1, nums2)).toBe(3); // 最长公共子数组为 [3,2,1]
  });

  test("示例2：全部元素相同", () => {
    const nums1 = [0, 0, 0, 0, 0];
    const nums2 = [0, 0, 0, 0, 0];
    expect(findLength(nums1, nums2)).toBe(5); // 最长公共子数组为 [0,0,0,0,0]
  });

  test('case 3', () => {
    const nums1 = [70,39,25,40,7];
    const nums2 = [52,20,67,5,31];
    expect(findLength(nums1, nums2)).toBe(0);
  });
});
