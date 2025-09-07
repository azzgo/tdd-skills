// 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
//
// 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
//
//
//
// 示例 1：
//
// 输入：nums = [1,2,3]
// 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
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
// nums 中的所有元素 互不相同

function subsets(nums: number[]): number[][] {
  const result: number[][] = [];
  const backtrace = (start: number = 0, path: number[] = []) => {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrace(i + 1, path);
      path.pop();
    }
  };

  backtrace();
  return result;
}

import { describe, expect, test } from "vitest";

describe("subsets", () => {
  test("示例1: [1,2,3]", () => {
    const nums = [1, 2, 3];
    const result = subsets(nums);
    const expected = [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]];
    // 检查长度和内容（顺序不重要）
    expect(result).toHaveLength(expected.length);
    expected.forEach((subset) => {
      expect(result).toContainEqual(subset);
    });
  });

  test("示例2: [0]", () => {
    const nums = [0];
    const result = subsets(nums);
    const expected = [[], [0]];
    expect(result).toHaveLength(expected.length);
    expected.forEach((subset) => {
      expect(result).toContainEqual(subset);
    });
  });

  test("边界: 空数组", () => {
    const nums: number[] = [];
    const result = subsets(nums);
    const expected = [[]];
    expect(result).toEqual(expected);
  });
});
