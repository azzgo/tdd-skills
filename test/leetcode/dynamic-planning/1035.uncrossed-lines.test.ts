// 1035. 不相交的线
// 中等
// 相关标签
// premium lock icon相关企业
// 提示
//
// 在两条独立的水平线上按给定的顺序写下 nums1 和 nums2 中的整数。
//
// 现在，可以绘制一些连接两个数字 nums1[i] 和 nums2[j] 的直线，这些直线需要同时满足：
//
//      nums1[i] == nums2[j]
//     且绘制的直线不与任何其他连线（非水平线）相交。
//
// 请注意，连线即使在端点也不能相交：每个数字只能属于一条连线。
//
// 以这种方法绘制线条，并返回可以绘制的最大连线数。
//
//
//
// 示例 1：
//
// 输入：nums1 = [1,4,2], nums2 = [1,2,4]
// 输出：2
// 解释：可以画出两条不交叉的线，如上图所示。
// 但无法画出第三条不相交的直线，因为从 nums1[1]=4 到 nums2[2]=4 的直线将与从 nums1[2]=2 到 nums2[1]=2 的直线相交。
//
// 示例 2：
//
// 输入：nums1 = [2,5,1,2,5], nums2 = [10,5,2,1,5,2]
// 输出：3
//
// 示例 3：
//
// 输入：nums1 = [1,3,7,1,7,5], nums2 = [1,9,2,5,1]
// 输出：2
//
//
//
// 提示：
//
//     1 <= nums1.length, nums2.length <= 500
//     1 <= nums1[i], nums2[j] <= 2000

// 本题说是求绘制的最大连线数，其实就是求两个字符串的最长公共子序列的长度！
function maxUncrossedLines(nums1: number[], nums2: number[]): number {
  // 以 nums1[i] 和 nums2[j] 结尾的子序列的最长子序列长度
  const dp: number[][] = Array.from({ length: nums1.length }, () =>
    new Array(nums2.length).fill(0),
  );

  let maxLen = 0;
  for (let i = 0; i < nums1.length; i++) {
    if (nums1[i] === nums2[0] || (i > 0 && dp[i - 1][0] === 1)) {
      dp[i][0] = 1;
      maxLen = 1;
    }
  }
  for (let j = 0; j < nums2.length; j++) {
    if (nums1[0] === nums2[j] || (j > 0 && dp[0][j - 1] === 1)) {
      dp[0][j] = 1;
      maxLen = 1;
    }
  }

  for (let i = 1; i < nums1.length; i++) {
    for (let j = 1; j < nums2.length; j++) {
      if (nums1[i] === nums2[j]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
      if (dp[i][j] > maxLen) {
        maxLen = dp[i][j];
      }
    }
  }

  return maxLen;
}

import { describe, expect, test } from "vitest";

describe("maxUncrossedLines", () => {
  test("示例1: nums1 = [1,4,2], nums2 = [1,2,4] => 2", () => {
    expect(maxUncrossedLines([1, 4, 2], [1, 2, 4])).toBe(2);
  });
  test("示例2: nums1 = [2,5,1,2,5], nums2 = [10,5,2,1,5,2] => 3", () => {
    expect(maxUncrossedLines([2, 5, 1, 2, 5], [10, 5, 2, 1, 5, 2])).toBe(3);
  });
  test("示例3: nums1 = [1,3,7,1,7,5], nums2 = [1,9,2,5,1] => 2", () => {
    expect(maxUncrossedLines([1, 3, 7, 1, 7, 5], [1, 9, 2, 5, 1])).toBe(2);
  });

  test("case 4", () => {
    expect(maxUncrossedLines([2], [3, 1, 1, 3, 3])).toBe(0);
  });
});
