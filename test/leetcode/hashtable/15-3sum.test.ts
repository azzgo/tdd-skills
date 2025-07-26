// 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。
//
// 注意：答案中不可以包含重复的三元组。
//
// 示例 1：
//
// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]
// 解释：
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
// 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
// 注意，输出的顺序和三元组的顺序并不重要。
//
// 示例 2：
//
// 输入：nums = [0,1,1]
// 输出：[]
// 解释：唯一可能的三元组和不为 0 。
//
// 示例 3：
//
// 输入：nums = [0,0,0]
// 输出：[[0,0,0]]
// 解释：唯一可能的三元组和为 0 。
//
// 提示：
//
//     3 <= nums.length <= 3000
//     -105 <= nums[i] <= 105

// hashmap solution
// time: O(n^2) space: O(n)
// discard, the test case 4 cost 50ms, over leetcode timelimit
function threeSum_old(nums: number[]): number[][] {
  let result: number[][] = [];
  nums.sort((a, b) => a - b);
  let twoSumList = new Map<number, number[]>();
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      let sum = nums[i] + nums[j];
      if (!twoSumList.has(sum)) {
        twoSumList.set(sum, []);
      }
      twoSumList.get(sum)?.push(i, j);
    }
  }
  for (let sum of twoSumList.keys()) {
    if (nums.includes(-sum)) {
      let indices = twoSumList.get(sum)!;
      for (let i = 0; i < indices.length; i += 2) {
        let firstIndex = indices[i];
        let secondIndex = indices[i + 1];
        if (
          firstIndex !== secondIndex &&
          firstIndex !== nums.indexOf(-sum) &&
          secondIndex !== nums.indexOf(-sum)
        ) {
          let triplet = [
            nums[firstIndex],
            nums[secondIndex],
            Object.is(-sum, -0) ? 0 : -sum,
          ].sort((a, b) => a - b);
          if (!result.some((r) => r.toString() === triplet.toString())) {
            result.push(triplet);
          }
        }
      }
    }
  }
  return result;
}

// two pointers solution
// time: O(n^2) space: O(1)
function threeSum(nums: number[]): number[][] {
  const result: number[][] = [];
  nums.sort((a, b) => a - b);
  if (nums[0] > 0) {
    return result; // if the smallest number is greater than 0, no triplet can sum to 0
  }
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;
    while (right > left) {
      if (nums[i] + nums[left] + nums[right] > 0) right--;
      else if (nums[i] + nums[left] + nums[right] < 0) left++;
      else {
        result.push([nums[i], nums[left], nums[right]]);
        while (right > left && nums[right] === nums[right - 1]) {
          right--; // skip duplicates on the right
        }
        while (right > left && nums[left] === nums[left + 1]) {
          left++; // skip duplicates on the left
        }
        right--;
        left++;
      }
    }
  }

  return result;
}

import { beforeEach, describe, expect, test, vi } from "vitest";

describe("3 Sum", () => {
  test("case 1", () => {
    expect(threeSum([-1, 0, 1, 2, -1, -4])).toEqual([
      [-1, -1, 2],
      [-1, 0, 1],
    ]);
  });
  test("case 2", () => {
    expect(threeSum([0, 1, 1])).toEqual([]);
  });
  test("case 3", () => {
    expect(threeSum([0, 0, 0])).toEqual([[0, 0, 0]]);
  });

  test("case 4", () => {
    const testData = [
      -15, 6, 7, 0, -14, -5, -3, -10, -14, 1, -14, -1, -11, -11, -15, -1, 3,
      -12, 7, 14, 1, 6, -6, 7, 1, 1, 0, -4, 8, 7, 2, 1, -2, -6, -14, -9, -3, -1,
      -12, -2, 7, 11, 4, 12, -14, -4, -4, 4, -1, 10, 3, -14, 1, 12, 0, 10, -9,
      8, -9, 14, -8, 8, 0, -3, 10, -6, 4, -8, 0, -1, -3, -8, -4, 8, 11, -3, -11,
      -8, 8, 3, 10, -3, -4, -4, -14, 12, 13, -8, -3, 12, -8, 4, 5, -1, -14, -8,
      8, -3, -9, -15, 12, -5, -7, -15, -12, 11, -11, 14, 11, 12, 3, 6, -6,
    ];
    expect(threeSum(testData)).toEqual([
      [-15, 1, 14],
      [-15, 2, 13],
      [-15, 3, 12],
      [-15, 4, 11],
      [-15, 5, 10],
      [-15, 7, 8],
      [-14, 0, 14],
      [-14, 1, 13],
      [-14, 2, 12],
      [-14, 3, 11],
      [-14, 4, 10],
      [-14, 6, 8],
      [-14, 7, 7],
      [-12, -2, 14],
      [-12, -1, 13],
      [-12, 0, 12],
      [-12, 1, 11],
      [-12, 2, 10],
      [-12, 4, 8],
      [-12, 5, 7],
      [-12, 6, 6],
      [-11, -3, 14],
      [-11, -2, 13],
      [-11, -1, 12],
      [-11, 0, 11],
      [-11, 1, 10],
      [-11, 3, 8],
      [-11, 4, 7],
      [-11, 5, 6],
      [-10, -4, 14],
      [-10, -3, 13],
      [-10, -2, 12],
      [-10, -1, 11],
      [-10, 0, 10],
      [-10, 2, 8],
      [-10, 3, 7],
      [-10, 4, 6],
      [-9, -5, 14],
      [-9, -4, 13],
      [-9, -3, 12],
      [-9, -2, 11],
      [-9, -1, 10],
      [-9, 1, 8],
      [-9, 2, 7],
      [-9, 3, 6],
      [-9, 4, 5],
      [-8, -6, 14],
      [-8, -5, 13],
      [-8, -4, 12],
      [-8, -3, 11],
      [-8, -2, 10],
      [-8, 0, 8],
      [-8, 1, 7],
      [-8, 2, 6],
      [-8, 3, 5],
      [-8, 4, 4],
      [-7, -6, 13],
      [-7, -5, 12],
      [-7, -4, 11],
      [-7, -3, 10],
      [-7, -1, 8],
      [-7, 0, 7],
      [-7, 1, 6],
      [-7, 2, 5],
      [-7, 3, 4],
      [-6, -6, 12],
      [-6, -5, 11],
      [-6, -4, 10],
      [-6, -2, 8],
      [-6, -1, 7],
      [-6, 0, 6],
      [-6, 1, 5],
      [-6, 2, 4],
      [-6, 3, 3],
      [-5, -5, 10],
      [-5, -3, 8],
      [-5, -2, 7],
      [-5, -1, 6],
      [-5, 0, 5],
      [-5, 1, 4],
      [-5, 2, 3],
      [-4, -4, 8],
      [-4, -3, 7],
      [-4, -2, 6],
      [-4, -1, 5],
      [-4, 0, 4],
      [-4, 1, 3],
      [-3, -3, 6],
      [-3, -2, 5],
      [-3, -1, 4],
      [-3, 0, 3],
      [-3, 1, 2],
      [-2, -2, 4],
      [-2, -1, 3],
      [-2, 0, 2],
      [-2, 1, 1],
      [-1, -1, 2],
      [-1, 0, 1],
      [0, 0, 0],
    ]);
  });
});
