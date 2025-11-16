// 496. 下一个更大元素 I
// 简单
// 相关标签
// premium lock icon相关企业
//
// nums1 中数字 x 的 下一个更大元素 是指 x 在 nums2 中对应位置 右侧 的 第一个 比 x 大的元素。
//
// 给你两个 没有重复元素 的数组 nums1 和 nums2 ，下标从 0 开始计数，其中nums1 是 nums2 的子集。
//
// 对于每个 0 <= i < nums1.length ，找出满足 nums1[i] == nums2[j] 的下标 j ，并且在 nums2 确定 nums2[j] 的 下一个更大元素 。如果不存在下一个更大元素，那么本次查询的答案是 -1 。
//
// 返回一个长度为 nums1.length 的数组 ans 作为答案，满足 ans[i] 是如上所述的 下一个更大元素 。
//
//
//
// 示例 1：
//
// 输入：nums1 = [4,1,2], nums2 = [1,3,4,2].
// 输出：[-1,3,-1]
// 解释：nums1 中每个值的下一个更大元素如下所述：
// - 4 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
// - 1 ，用加粗斜体标识，nums2 = [1,3,4,2]。下一个更大元素是 3 。
// - 2 ，用加粗斜体标识，nums2 = [1,3,4,2]。不存在下一个更大元素，所以答案是 -1 。
//
// 示例 2：
//
// 输入：nums1 = [2,4], nums2 = [1,2,3,4].
// 输出：[3,-1]
// 解释：nums1 中每个值的下一个更大元素如下所述：
// - 2 ，用加粗斜体标识，nums2 = [1,2,3,4]。下一个更大元素是 3 。
// - 4 ，用加粗斜体标识，nums2 = [1,2,3,4]。不存在下一个更大元素，所以答案是 -1 。
//
//
//
// 提示：
//
//     1 <= nums1.length <= nums2.length <= 1000
//     0 <= nums1[i], nums2[i] <= 104
//     nums1和nums2中所有整数 互不相同

function nextGreaterElementWay1(nums1: number[], nums2: number[]): number[] {
  const result = new Array(nums1.length).fill(-1);

  // 记录 nums1 中每个 num 的位置信息
  const numsToIndex = new Map();
  for (let i = 0; i < nums1.length; i++) {
    numsToIndex.set(nums1[i], i);
  }

  const inscreaseStack = [0];

  for (let j = 0; j < nums2.length; j++) {
    while (
      inscreaseStack.length > 0 &&
      nums2[j] > nums2[inscreaseStack[inscreaseStack.length - 1]]
    ) {
      const topIndex = inscreaseStack.pop()!;
      if (numsToIndex.has(nums2[topIndex])) {
        result[numsToIndex.get(nums2[topIndex])] = nums2[j];
      }
    }
    inscreaseStack.push(j);
  }

  return result;
}

function nextGreaterElementWay2(nums1: number[], nums2: number[]): number[] {
  // 单调栈
  const increaseStack = [0];
  // nums2 每个 num 对应比它大的值
  const numsToGreater = new Map<number, number>();
  for (let i = 1; i < nums2.length; i++) {
    while (
      increaseStack.length > 0 &&
      nums2[i] > nums2[increaseStack[increaseStack.length - 1]]
    ) {
      const topIndex = increaseStack.pop()!;
      numsToGreater.set(nums2[topIndex], nums2[i]);
    }
    increaseStack.push(i);
  }

  const result = new Array(nums1.length).fill(-1);

  for (let i = 0; i < nums1.length; i++) {
    if (numsToGreater.get(nums1[i])) {
      result[i] = numsToGreater.get(nums1[i]);
    }
  }
  return result;
}

function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  return nextGreaterElementWay2(nums1, nums2);
}

import { describe, expect, test } from "vitest";

describe("Next greater element i", () => {
  test("case 1", () => {
    expect(nextGreaterElement([4, 1, 2], [1, 3, 4, 2])).toEqual([-1, 3, -1]);
  });

  test("case 2", () => {
    expect(nextGreaterElement([2, 4], [1, 2, 3, 4])).toEqual([3, -1]);
  });
});
