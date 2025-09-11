// 给定一个长度为 n 的 0 索引整数数组 nums。初始位置在下标 0。
//
// 每个元素 nums[i] 表示从索引 i 向后跳转的最大长度。换句话说，如果你在索引 i 处，你可以跳转到任意 (i + j) 处：
// 0 <= j <= nums[i] 且
//
// i + j < n
// 返回到达 n - 1 的最小跳跃次数。测试用例保证可以到达 n - 1。
//
// 示例 1:
//
// 输入: nums = [2,3,1,1,4]
// 输出: 2
// 解释: 跳到最后一个位置的最小跳跃数是 2。
//      从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
// 示例 2:
//
// 输入: nums = [2,3,0,1,4]
// 输出: 2
//
//
// 提示:
//
// 1 <= nums.length <= 104
// 0 <= nums[i] <= 1000
// 题目保证可以到达 n - 1
function jump(nums: number[]): number {
  if (nums.length === 1) return 0;
  let curDistance = 0;
  let nextDistance = 0;
  let counter = 0;
  for (let i = 0; i < nums.length; i++) {
    // 刷新最远能跳的位置
    nextDistance = Math.max(nums[i] + i, nextDistance);
    // 尽量让游标走到当前能去的最大距离后,再往后跳
    if (i === curDistance) {
      curDistance = nextDistance;
      counter++;
      if (nextDistance + 1 >= nums.length) break;
    }
  }

  return counter;
}

import { describe, expect, test } from "vitest";

describe("jump-game-ii", () => {
  test("示例1: [2,3,1,1,4] => 2", () => {
    expect(jump([2, 3, 1, 1, 4])).toBe(2);
  });

  test("示例2: [2,3,0,1,4] => 2", () => {
    expect(jump([2, 3, 0, 1, 4])).toBe(2);
  });

  test("边界: 只有一个元素 [0] => 0", () => {
    expect(jump([0])).toBe(0);
  });

  test("全为1: [1,1,1,1] => 3", () => {
    expect(jump([1, 1, 1, 1])).toBe(3);
  });

  test("全为最大跳跃值: [1000,1000,1000,1000] => 1", () => {
    expect(jump([1000, 1000, 1000, 1000])).toBe(1);
  });

  test("较长数组: [2,3,1,1,4,2,1,1,1,1]", () => {
    expect(jump([2, 3, 1, 1, 4, 2, 1, 1, 1, 1])).toBeGreaterThanOrEqual(2);
  });
});
