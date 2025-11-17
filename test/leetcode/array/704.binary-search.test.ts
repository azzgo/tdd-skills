// 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果 target 存在返回下标，否则返回 -1。
//
// 你必须编写一个具有 O(log n) 时间复杂度的算法。
//
//
// 示例 1:
//
// 输入: nums = [-1,0,3,5,9,12], target = 9
// 输出: 4
// 解释: 9 出现在 nums 中并且下标为 4
// 示例 2:
//
// 输入: nums = [-1,0,3,5,9,12], target = 2
// 输出: -1
// 解释: 2 不存在 nums 中因此返回 -1
//  
//
// 提示：
//
// 你可以假设 nums 中的所有元素是不重复的。
// n 将在 [1, 10000]之间。
// nums 的每个元素都将在 [-9999, 9999]之间。
/**
 * https://leetcode.cn/problems/binary-search/description/
 **/

import { expect, test } from "vitest";

/**
 * 左闭右开区间
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
export const binary_search = function (nums, target) {
  let left = 0;
  // 关键区别 1 因为右开，为了在搜索区间包含最后一个元素，所以 right 取 nums.length
  let right = nums.length;
  while (left < right) {
    let middle = left + Math.floor((right - left) / 2);
    if (nums[middle] === target) {
      return middle;
    } else if (nums[middle] < target) {
      left = middle + 1;
    } else {
      // 关键区别 2 在于这里，因为 middle 不在左闭右开区间内
      right = middle;
    }
  }
  return -1;
};

export const binary_search_2 = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let middle = left + Math.floor((right - left) / 2);
    if (nums[middle] === target) {
      return middle;
    } else if (nums[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }
  return -1;
};

/**
 *
 *
 * Input: nums = [-1,0,3,5,9,12], target = 9
 * Output: 4
 * Explanation: 9 exists in nums and its index is 4
 **/
test("binary-search case 1", () => {
  let output = binary_search([-1, 0, 3, 5, 9, 12], 9);
  expect(output).toEqual(4);
});

/**
 * Input: nums = [-1,0,3,5,9,12], target = 2
 * Output: -1
 * Explanation: 2 does not exist in nums so return -1
 **/
test("binary-search case 2", () => {
  let output = binary_search([-1, 0, 3, 5, 9, 12], 2);
  expect(output).toEqual(-1);
});

/**
 * Input: nums = [5], target = 5
 * Output: 0
 **/
test("binary-search case 3", () => {
  let output = binary_search([5], 5);
  expect(output).toEqual(0);
});
