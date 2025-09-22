// 给你一个非负整数数组 nums 和一个整数 target 。
//
// 向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：
//
//     例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
//
// 返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。
//
//
//
// 示例 1：
//
// 输入：nums = [1,1,1,1,1], target = 3
// 输出：5
// 解释：一共有 5 种方法让最终目标和为 3 。
// -1 + 1 + 1 + 1 + 1 = 3
// +1 - 1 + 1 + 1 + 1 = 3
// +1 + 1 - 1 + 1 + 1 = 3
// +1 + 1 + 1 - 1 + 1 = 3
// +1 + 1 + 1 + 1 - 1 = 3
//
// 示例 2：
//
// 输入：nums = [1], target = 1
// 输出：1
//
//
//
// 提示：
//
//     1 <= nums.length <= 20
//     0 <= nums[i] <= 1000
//     0 <= sum(nums[i]) <= 1000
//     -1000 <= target <= 1000

/**
 * 这里问题转化后，可以用 0 1 背包方式解题
 * left - right = target
 * left - (sum - left) = target
 * 2left - sum = target
 * left = (target + sum) / 2
 * -----------------------------------------
 *
 * 然后变成是否能找到一个子集，最大和达到 (target + sum) / 2
 *
 * dp 数组的含意也发生了变化
 * dp[i][j] 的含意为，从 0-i 物品中选择，共有多少种方式填满背包(背包为j)
 * 变成了一个组合问题
 * PS: 通过列举的方式我发现，其实这里可以直接套组合公式来着
 * eg: j=[0,4], 假设nums[i] 的值都是 1
 * * i = 0, dp[i][0,4] = [1,1,0,0,0]
 * * i = 1, dp[i][0,4] = [1,2,1,0,0]
 * * i = 2, dp[i][0,4] = [1,3,3,1,0]
 **/
function findTargetSumWays2dp(nums: number[], target: number): number {
  const sum = nums.reduce((a, b) => a + b);
  const n = nums.length;
  // 如果无法整除得到 left，说明不存在这种子集(因为子集都是整数构成, 这样求得的解是小数)
  if ((target + sum) % 2 === 1) return 0;
  // 说明需要重复使用 nums 中的数字，这与题意不符
  if (Math.abs(target) > sum) return 0;
  const left = (target + sum) / 2;

  const dp = Array.from({ length: n }, () => new Array(left + 1));

  // 初始化
  // 特殊情况: 如果 nums[i] === 0, 就可以组合放入背包了
  let zeroCount = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) zeroCount++;
    dp[i][0] = Math.pow(2, zeroCount);
  }
  for (let j = 1; j <= left; j++) {
    dp[0][j] = j === nums[0] ? 1 : 0;
  }

  for (let i = 1; i < nums.length; i++) {
    for (let j = 1; j <= left; j++) {
      if (j < nums[i]) {
        dp[i][j] = dp[i - 1][j];
      } else {
        // 两者之和
        // 不放 nums[i]: dp[i-1][j]
        // 放 nums[i]: dp[i-1][j-nums[i]]
        // - 理解为背包j在有 nums[i] 这个物品占着位置的情况下，有几种方式
        dp[i][j] = dp[i - 1][j] + dp[i - 1][j - nums[i]];
      }
    }
  }
  return dp[n - 1][left];
}

/**
 * 思路仍然是压缩数组，滚动更新
 */
function findTargetSumWays1dp(nums: number[], target: number): number {
  const sum = nums.reduce((a, b) => a + b);
  const n = nums.length;
  // 如果无法整除得到 left，说明不存在这种子集(因为子集都是整数构成, 这样求得的解是小数)
  if ((target + sum) % 2 === 1) return 0;
  // 说明需要重复使用 nums 中的数字，这与题意不符
  if (Math.abs(target) > sum) return 0;
  const left = (target + sum) / 2;

  const dp = new Array(left + 1).fill(0);
  // 初始化：物品0，背包空间0，只有1种情况。无论物品0是否等于0
  dp[0] = 1;

  for (let i = 0; i < n; i++) {
    for (let j = left; j >= nums[i]; j--) {
      if (j < nums[i]) {
        continue;
      } else {
        dp[j] = dp[j] + dp[j - nums[i]];
      }
    }
  }

  return dp[left];
}

const dpImplArrayDeminsion: 1 | 2 = 1;

function findTargetSumWays(nums: number[], target: number): number {
  switch (dpImplArrayDeminsion) {
    case 2:
      return findTargetSumWays2dp(nums, target);
    case 1:
      return findTargetSumWays1dp(nums, target);
  }
}

import { describe, expect, test } from "vitest";

describe("Target Sum", () => {
  test("example 1: [1,1,1,1,1], target = 3", () => {
    expect(findTargetSumWays([1, 1, 1, 1, 1], 3)).toBe(5);
  });

  test("example 2: [1], target = 1", () => {
    expect(findTargetSumWays([1], 1)).toBe(1);
  });

  test("case 3", () => {
    expect(findTargetSumWays([1, 1, 1, 1], -1000)).toBe(0);
  });
});
