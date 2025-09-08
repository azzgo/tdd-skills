// 给你一个整数数组 nums ，找出并返回所有该数组中不同的递增子序列，递增子序列中 至少有两个元素 。你可以按 任意顺序 返回答案。
//
// 数组中可能含有重复元素，如出现两个整数相等，也可以视作递增序列的一种特殊情况。
//
// 示例 1：
//
// 输入：nums = [4,6,7,7]
// 输出：[[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
// 示例 2：
//
// 输入：nums = [4,4,3,2,1]
// 输出：[[4,4]]
//
//
// 提示：
//
// 1 <= nums.length <= 15
// -100 <= nums[i] <= 100
function findSubsequences(nums: number[]): number[][] {
  const result: number[][] = [];
  const backtrace = (start: number = 0, path: number[] = []) => {
    // 递增序列至少需要两个元素
    if (path.length > 1) {
      result.push([...path]);
    }
    // 标记单次循环,不能取相同元素
    const uniset = new Set<number>();
    for (let i = start; i < nums.length; i++) {
      // 如果不是递增,或循环取过相同元素,退出
      if (
        (path.length > 0 && nums[i] < path[path.length - 1]) ||
        uniset.has(nums[i])
      ) {
        continue;
      }
      uniset.add(nums[i]);
      path.push(nums[i]);
      backtrace(i + 1, path);
      path.pop();
    }
  };
  backtrace();
  return result;
}

import { describe, expect, test } from "vitest";

// 引入待测试方法
// 如果 findSubsequences 在同文件实现则无需 import，否则请根据实际路径调整
// import { findSubsequences } from "./491.non-decreasing-subsequences";
describe("findSubsequences", () => {
  test("示例1: [4,6,7,7]", () => {
    const nums = [4, 6, 7, 7];
    const result = findSubsequences(nums);
    const expected = [
      [4, 6],
      [4, 6, 7],
      [4, 6, 7, 7],
      [4, 7],
      [4, 7, 7],
      [6, 7],
      [6, 7, 7],
      [7, 7],
    ];
    // 转为字符串比较，避免顺序影响
    expect(result.map((a) => a.toString()).sort()).toEqual(
      expected.map((a) => a.toString()).sort(),
    );
  });

  test("示例2: [4,4,3,2,1]", () => {
    const nums = [4, 4, 3, 2, 1];
    const result = findSubsequences(nums);
    const expected = [[4, 4]];
    expect(result.map((a) => a.toString()).sort()).toEqual(
      expected.map((a) => a.toString()).sort(),
    );
  });

  test("边界: 单元素数组", () => {
    const nums = [1];
    const result = findSubsequences(nums);
    expect(result).toEqual([]);
  });

  test("边界: 全相同元素", () => {
    const nums = [2, 2, 2];
    const result = findSubsequences(nums);
    const expected = [
      [2, 2],
      [2, 2, 2],
    ];
    expect(result.map((a) => a.toString()).sort()).toEqual(
      expected.map((a) => a.toString()).sort(),
    );
  });

  test("边界: 全递减", () => {
    const nums = [5, 4, 3, 2, 1];
    const result = findSubsequences(nums);
    expect(result).toEqual([]);
  });
});
