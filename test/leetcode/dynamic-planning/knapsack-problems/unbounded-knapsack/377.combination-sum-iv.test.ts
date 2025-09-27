// 给你一个由 不同 整数组成的数组 nums ，和一个目标整数 target 。请你从 nums 中找出并返回总和为 target 的元素组合的个数。
//
// 题目数据保证答案符合 32 位整数范围。
//
//
//
// 示例 1：
//
// 输入：nums = [1,2,3], target = 4
// 输出：7
// 解释：
// 所有可能的组合为：
// (1, 1, 1, 1)
// (1, 1, 2)
// (1, 2, 1)
// (1, 3)
// (2, 1, 1)
// (2, 2)
// (3, 1)
// 请注意，顺序不同的序列被视作不同的组合。
//
// 示例 2：
//
// 输入：nums = [9], target = 3
// 输出：0
//
//
//
// 提示：
//
//     1 <= nums.length <= 200
//     1 <= nums[i] <= 1000
//     nums 中的所有元素 互不相同
//     1 <= target <= 1000
//
//
//
// 进阶：如果给定的数组中含有负数会发生什么？问题会产生何种变化？如果允许负数出现，需要向题目中添加哪些限制条件？

const implDimension: 1 | 2 = 2;

function combinationSum4(nums: number[], target: number): number {
  const oneDimemsionSolution = () => {
    // dp[j] 背包容量 j，可装取的整数组合(其实是排列，题目中说顺序会形成差异)个数
    const dp = new Array(target + 1).fill(0);

    // 按题目要求，target 最小是 1，dp[0] 无意义
    // 但推导需需要到 dp[0]，反推应该是 1
    dp[0] = 1;
    // 递推
    for (let j = 1; j <= target; j++) {
      for (let i = 0; i < nums.length; i++) {
        if (j < nums[i]) continue;
        dp[j] = dp[j] + dp[j - nums[i]];
      }
      console.log(`j=${j}, dp=`, dp.slice(0, target + 1)); // 打印每一步
    }

    return dp[target];
  };

  const twoDimensionSolution = () => {
    const n = nums.length;
    const dp = Array.from({ length: n + 1 }, () =>
      new Array(target + 1).fill(0),
    );

    dp[0][0] = 1;

    // 递推
    for (let j = 0; j <= target; j++) {
      for (let i = 1; i <= n; i++) {
        if (j < nums[i - 1]) {
          dp[i][j] = dp[i - 1][j];
        } else {
          dp[i][j] = dp[i - 1][j] + dp[n][j - nums[i - 1]];
        }
        console.log(`i=${i}, j=${j}, dp[i]=`, dp[i].slice(0, target + 1)); // 打印每一行
      }
    }

    return dp[n][target];
  };

  switch (implDimension) {
    case 1:
      return oneDimemsionSolution();
    case 2:
      return twoDimensionSolution();
  }
}

import { describe, expect, test } from "vitest";

describe("组合总和 IV (combinationSum4)", () => {
  test("基础用例：nums = [1,2,3], target = 4，输出 7", () => {
    // 解释：所有可能的组合为：(1,1,1,1), (1,1,2), (1,2,1), (1,3), (2,1,1), (2,2), (3,1)
    expect(combinationSum4([1, 2, 3], 4)).toBe(7);
  });

  test("无解用例：nums = [9], target = 3，输出 0", () => {
    expect(combinationSum4([9], 3)).toBe(0);
  });

  test("边界用例：nums = [1], target = 1，输出 1", () => {
    expect(combinationSum4([1], 1)).toBe(1);
  });
});
