// 给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。
//
// 判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。
//
// 示例 1：
//
// 输入：nums = [2,3,1,1,4]
// 输出：true
// 解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
// 示例 2：
//
// 输入：nums = [3,2,1,0,4]
// 输出：false
// 解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
//
//
// 提示：
//
// 1 <= nums.length <= 104
// 0 <= nums[i] <= 105
function canJump(nums: number[]): boolean {
  let maxJump = 0;
  for (let i = 0; i < nums.length; i++) {
    // 当前位置最远可达
    const jumpEndPos = i + nums[i];
    // 之前最大跳跃距离可以跳到当前位置
    if (jumpEndPos > maxJump && maxJump >= i) {
      maxJump = jumpEndPos;
    }
  }

  return maxJump + 1 >= nums.length;
}

import { describe, expect, test } from "vitest";

describe("Jump Game", () => {
  test("能跳到终点：示例1", () => {
    expect(canJump([2, 3, 1, 1, 4])).toBe(true);
  });

  test("不能跳到终点：示例2", () => {
    expect(canJump([3, 2, 1, 0, 4])).toBe(false);
  });

  test("只有一个元素", () => {
    expect(canJump([0])).toBe(true);
  });

  test("全部为零，长度大于1", () => {
    expect(canJump([0, 0, 0])).toBe(false);
  });

  test("最后一个元素为零但可达", () => {
    expect(canJump([2, 0, 0])).toBe(true);
  });

  test("大跳跃直接到终点", () => {
    expect(canJump([5, 0, 0, 0, 0])).toBe(true);
  });
});
