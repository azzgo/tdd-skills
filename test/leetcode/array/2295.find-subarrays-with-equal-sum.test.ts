// 给你一个下标从 0 开始的整数数组 nums ，判断是否存在 两个 长度为 2 的子数组且它们的 和 相等。注意，这两个子数组起始位置的下标必须 不相同 。
//
// 如果这样的子数组存在，请返回 true，否则返回 false 。
//
// 子数组 是一个数组中一段连续非空的元素组成的序列。
//
//
//
// 示例 1：
//
// 输入：nums = [4,2,4]
// 输出：true
// 解释：元素为 [4,2] 和 [2,4] 的子数组有相同的和 6 。
// 示例 2：
//
// 输入：nums = [1,2,3,4,5]
// 输出：false
// 解释：没有长度为 2 的两个子数组和相等。
// 示例 3：
//
// 输入：nums = [0,0,0]
// 输出：true
// 解释：子数组 [nums[0],nums[1]] 和 [nums[1],nums[2]] 的和相等，都为 0 。
// 注意即使子数组的元素相同，这两个子数组也视为不相同的子数组，因为它们在原数组中的起始位置不同。
function findSubarrays(nums: number[]): boolean {
  const seen = new Set<number>();

  for (let i = 0; i < nums.length - 1; i++) {
    const sum = nums[i] + nums[i + 1];
    if (seen.has(sum)) {
      return true;
    } else {
      seen.add(sum);
    }
  }
  return false;
}

import { describe, expect, test } from "vitest";

describe("findSubarrays: 判断是否存在两个长度为2的子数组和相等", () => {
  test("存在相等子数组和，返回true", () => {
    // 例如: [4,2,4]，4+2=6, 2+4=6
    expect(findSubarrays([4, 2, 4])).toBe(true);
  });
  test("不存在相等子数组和，返回false", () => {
    // 例如: [1,2,3,4,5]，所有长度为2的子数组和都不同
    expect(findSubarrays([1, 2, 3, 4, 5])).toBe(false);
  });
  test("数组长度小于3，必定返回false", () => {
    expect(findSubarrays([1])).toBe(false);
    expect(findSubarrays([1, 2])).toBe(false);
  });
  test("有多个重复的和，返回true", () => {
    expect(findSubarrays([1, 1, 1, 1])).toBe(true); // 1+1=2 多次出现
  });
  test("负数情况", () => {
    expect(findSubarrays([-1, 0, 1, -1, 0, 1])).toBe(true);
  });

  test("case 0", () => {
    expect(findSubarrays([0, 0, 0])).toEqual(true);
  });
});
