// 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。
//
// 给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。
//
//  
//
// 示例 1：
//
// 输入：nums = [2,3,2]
// 输出：3
// 解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
//
// 示例 2：
//
// 输入：nums = [1,2,3,1]
// 输出：4
// 解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
//      偷窃到的最高金额 = 1 + 3 = 4 。
//
// 示例 3：
//
// 输入：nums = [1,2,3]
// 输出：3
//
//  
//
// 提示：
//
//     1 <= nums.length <= 100
//     0 <= nums[i] <= 1000


function rob(nums: number[]): number {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  const _rob = (list: number[]) => {
    if (nums.length === 0) return 0;
    const n = list.length;
    // 定义: 最后偷取 nums[i] 的最大偷取金额
    const dp = new Array(n).fill(0);

    dp[0] = list[0];
    dp[1] = Math.max(list[0], list[1]);

    for (let i = 2; i < n; i++) {
      dp[i] = Math.max(dp[i - 2] + list[i], dp[i - 1]);
    }

    return dp[n - 1];
  }

  return Math.max(_rob(nums.slice(0, -1)), _rob(nums.slice(1)));
};

import { describe, expect, test } from "vitest";

describe("213. House Robber II", () => {
  test("should return 3 for [2,3,2]", () => {
    expect(rob([2, 3, 2])).toBe(3);
  });

  test("should return 4 for [1,2,3,1]", () => {
    expect(rob([1, 2, 3, 1])).toBe(4);
  });

  test("should return 3 for [1,2,3]", () => {
    expect(rob([1, 2, 3])).toBe(3);
  });

  test("should return 0 for empty array", () => {
    expect(rob([])).toBe(0);
  });

  test("should return the single house amount for [5]", () => {
    expect(rob([5])).toBe(5);
  });

  test("should return max of two houses for [2,3]", () => {
    expect(rob([2, 3])).toBe(3);
  });

  test("should handle complex circular case [1,3,1,3,100]", () => {
    expect(rob([1, 3, 1, 3, 100])).toBe(103);
  });
});
