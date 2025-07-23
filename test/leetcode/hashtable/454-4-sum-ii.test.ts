// 给你四个整数数组 nums1、nums2、nums3 和 nums4 ，数组长度都是 n ，请你计算有多少个元组 (i, j, k, l) 能满足：
//
//     0 <= i, j, k, l < n
//     nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0
//
//  
//
// 示例 1：
//
// 输入：nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
// 输出：2
// 解释：
// 两个元组如下：
// 1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
// 2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0
//
// 示例 2：
//
// 输入：nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
// 输出：1

function fourSumCount(
  nums1: number[],
  nums2: number[],
  nums3: number[],
  nums4: number[],
): number {
  const sumCountMap = new Map<number, number>();
  let count = 0;
  for (const a of nums1) {
    for (const b of nums2) {
      const sum = a + b;
      sumCountMap.set(sum, (sumCountMap.get(sum) || 0) + 1);
    }
  }

  for (const a of nums3) {
    for (const b of nums4) {
      const target = -(a + b);
      if (sumCountMap.has(target)) {
        count += sumCountMap.get(target)!;
      }
    }
  }
  return count;
}

import { beforeEach, describe, expect, test } from "vitest";

describe("4 Sum", () => {
  beforeEach(() => {});

  test("case 1", () => {
    const A = [1, 2];
    const B = [-2, -1];
    const C = [-1, 2];
    const D = [0, 2];
    expect(fourSumCount(A, B, C, D)).toBe(2);
  });

  test("case 2", () => {
    const A = [0];
    const B = [0];
    const C = [0];
    const D = [0];
    expect(fourSumCount(A, B, C, D)).toBe(1);
  });
});
