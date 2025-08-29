// 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
//
// 返回 滑动窗口中的最大值 。
//
//
//
// 示例 1：
//
// 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
// 输出：[3,3,5,5,6,7]
// 解释：
// 滑动窗口的位置                最大值
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7
// 示例 2：
//
// 输入：nums = [1], k = 1
// 输出：[1]
//
//
// 提示：
//
// 1 <= nums.length <= 105
// -104 <= nums[i] <= 104
// 1 <= k <= nums.length
function maxSlidingWindow(nums: number[], k: number): number[] {
  let left = 0;
  let right = 0;
  const decreasingDeque: number[] = [];
  const result: number[] = [];
  while (right < nums.length) {
    while (
      decreasingDeque.length &&
      decreasingDeque[decreasingDeque.length - 1] < nums[right]
    ) {
      decreasingDeque.pop();
    }
    decreasingDeque.push(nums[right]);
    if (right - left + 1 > k) {
      if (decreasingDeque[0] === nums[left]) {
        decreasingDeque.shift();
      }
      left++;
    }
    if (right - left + 1 === k) {
      result.push(decreasingDeque[0]);
    }
    right++;
  }
  return result;
}

import { beforeEach, describe, expect, test, vi } from "vitest";

describe("Sliding window maximum test", () => {
  test("case 1", () => {
    expect(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)).toEqual([
      3, 3, 5, 5, 6, 7,
    ]);
  });
  test("case 2", () => {
    expect(maxSlidingWindow([1], 1)).toEqual([1]);
  });
  test("case 3", () => {
    expect(maxSlidingWindow([1, 3, 3, -3, 5, 3, 6, 7], 3)).toEqual([
      3, 3, 5, 5, 6, 7,
    ]);
  });
  test("case 4", () => {
    expect(maxSlidingWindow([7, 2, 4], 2)).toEqual([7, 4]);
  });
});
