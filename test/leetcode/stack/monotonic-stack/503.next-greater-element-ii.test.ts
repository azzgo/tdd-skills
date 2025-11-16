// 503. 下一个更大元素 II
// 中等
// 相关标签
// premium lock icon相关企业
//
// 给定一个循环数组 nums （ nums[nums.length - 1] 的下一个元素是 nums[0] ），返回 nums 中每个元素的 下一个更大元素 。
//
// 数字 x 的 下一个更大的元素 是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1 。
//
//
//
// 示例 1:
//
// 输入: nums = [1,2,1]
// 输出: [2,-1,2]
// 解释: 第一个 1 的下一个更大的数是 2；
// 数字 2 找不到下一个更大的数；
// 第二个 1 的下一个最大的数需要循环搜索，结果也是 2。
//
// 示例 2:
//
// 输入: nums = [1,2,3,4,3]
// 输出: [2,3,4,-1,4]
//
//
//
// 提示:
//
//     1 <= nums.length <= 104
//     -109 <= nums[i] <= 109

function nextGreaterElements(nums: number[]): number[] {
  const increaseStack = [0];
  const result = new Array(nums.length).fill(-1);
  // 循环的处理方式就是将数组处理两遍就可以模拟循环的场景
  for (let i = 0; i < 2 * nums.length; i++) {
    const index = i % nums.length;
    while(increaseStack.length > 0 && nums[index] > nums[increaseStack[increaseStack.length -1]]) {
      const topIndex = increaseStack.pop()!;
      result[topIndex] = nums[index];
    }
    increaseStack.push(index);
  }
  return result;
}

import { describe, expect, test } from "vitest";

describe("Next Greater Element ii", () => {
  test("case 1", () => {
    expect(nextGreaterElements([1, 2, 1])).toEqual([2, -1, 2]);
  });
  test("case 2", () => {
    expect(nextGreaterElements([1, 2, 3, 4, 3])).toEqual([2, 3, 4, -1, 4]);
  });
});
