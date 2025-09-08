// 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的 子集（幂集）。
//
// 解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。
//
// 示例 1：
//
// 输入：nums = [1,2,2]
// 输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
// 示例 2：
//
// 输入：nums = [0]
// 输出：[[],[0]]
//
//
// 提示：
//
// 1 <= nums.length <= 10
// -10 <= nums[i] <= 10

function subsetsWithDup(nums: number[]): number[][] {
  const result: number[][] = [];
  nums.sort((a, b) => a - b);
  const backtrace = (start: number = 0, path: number[] = []) => {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i-1]) {
        continue;
      }
      path.push(nums[i]);
      backtrace(i + 1, path);
      path.pop();
    }
  }
  backtrace();
  return result;
}

import { describe, expect, test } from "vitest";

describe("name", () => {
  test("示例 1: nums = [1,2,2]", () => {
    const nums = [1, 2, 2];
    const result = subsetsWithDup(nums);
    expect(result.sort()).toEqual(
      [[], [1], [2], [1, 2], [2, 2], [1, 2, 2]].sort(),
    );
  });

  test("示例 2: nums = [0]", () => {
    const nums = [0];
    const result = subsetsWithDup(nums);
    expect(result.sort()).toEqual([[], [0]].sort());
  });
});
