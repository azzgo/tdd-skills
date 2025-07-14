// 给定两个数组 nums1 和 nums2 ，返回 它们的
//
//  。输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。
//
//
//
// 示例 1：
//
// 输入：nums1 = [1,2,2,1], nums2 = [2,2]
// 输出：[2]
//
// 示例 2：
//
// 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出：[9,4]
// 解释：[4,9] 也是可通过的
//
//
//
// 提示：
//
//     1 <= nums1.length, nums2.length <= 1000
//     0 <= nums1[i], nums2[i] <= 1000

function intersection(nums1: number[], nums2: number[]): number[] {
  const numbers = new Set<number>();
  const result: number[] = [];
  for (const num of nums1) {
    numbers.add(num);
  }
  for (const num of nums2) {
    if (numbers.has(num)) {
      result.push(num);
      numbers.delete(num);
    }
  }
  return result;
}

import { describe, expect, test } from "vitest";

describe("intersection test case", () => {
  test("test case 1", () => {
    expect(intersection([1, 2, 2, 1], [2, 2])).toEqual([2]);
  });

  test("test case 2", () => {
    expect(intersection([4, 9, 5], [9, 4, 9, 8, 4]).sort()).toEqual(
      [9, 4].sort(),
    );
  });
});
