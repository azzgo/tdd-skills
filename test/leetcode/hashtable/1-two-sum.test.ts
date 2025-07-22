// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
//
// 你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。
//
// 你可以按任意顺序返回答案。
//
//
//
// 示例 1：
//
// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
//
// 示例 2：
//
// 输入：nums = [3,2,4], target = 6
// 输出：[1,2]
//
// 示例 3：
//
// 输入：nums = [3,3], target = 6
// 输出：[0,1]

function twoSum(nums: number[], target: number): number[] {
  const numToIndex: Map<number, number> = new Map();

  for (let index = 0; index < nums.length; index++) {
    const complement = target - nums[index];
    if (numToIndex.has(complement)) {
      return [numToIndex.get(complement)!, index];
    } else {
      numToIndex.set(nums[index], index);
    }
  }
  return [];
}

import { describe, expect, test } from "vitest";

describe("Two Sum", () => {
  test("case 1", () => {
    const nums = [2, 7, 11, 15];
    const target = 9;
    const result = twoSum(nums, target);
    expect(result).toEqual([0, 1]);
  });
  test("case 2", () => {
    const nums = [3, 2, 4];
    const target = 6;
    const result = twoSum(nums, target);
    expect(result).toEqual([1, 2]);
  });
  test("case 3", () => {
    const nums = [3, 3];
    const target = 6;
    const result = twoSum(nums, target);
    expect(result).toEqual([0, 1]);
  });
});
