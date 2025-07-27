// 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：
//
//     0 <= a, b, c, d < n
//     a、b、c 和 d 互不相同
//     nums[a] + nums[b] + nums[c] + nums[d] == target
//
// 你可以按 任意顺序 返回答案 。
//
//
//
// 示例 1：
//
// 输入：nums = [1,0,-1,0,-2,2], target = 0
// 输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
//
// 示例 2：
//
// 输入：nums = [2,2,2,2,2], target = 8
// 输出：[[2,2,2,2]]

function fourSum(nums: number[], target: number): number[][] {
  if (nums.length < 4) return [];
  const result: number[][] = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    // 剪枝，额外判断 > 0 是因为，正数才会越加越大
    if (nums[i] > target && nums[i] >= 0) {
      break;
    }
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < nums.length - 2; j++) {
      // 剪枝，额外判断 > 0 是因为，正数才会越加越大
      if (nums[j] > target && nums[i] >= 0) {
        break;
      }
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let left = j + 1,
        right = nums.length - 1;
      while (right > left) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];
        if (sum > target) right--;
        else if (sum < target) left++;
        else {
          result.push([nums[i], nums[j], nums[left], nums[right]]);
          while (right > left && nums[right] === nums[right - 1]) {
            right--;
          }
          while (right > left && nums[left] === nums[left + 1]) {
            left++;
          }
          right--;
          left++;
        }
      }
    }
  }

  return result;
}

import { beforeEach, describe, expect, test, vi } from "vitest";

describe("4 Sum", () => {
  test("case 1", () => {
    const nums = [1, 0, -1, 0, -2, 2];
    const target = 0;
    const expected = [
      [-2, -1, 1, 2],
      [-2, 0, 0, 2],
      [-1, 0, 0, 1],
    ];
    expect(fourSum(nums, target)).toEqual(expected);
  });
  test("case 2", () => {
    const nums = [2, 2, 2, 2, 2];
    const target = 8;
    const expected = [[2, 2, 2, 2]];
    expect(fourSum(nums, target)).toEqual(expected);
  });
});
