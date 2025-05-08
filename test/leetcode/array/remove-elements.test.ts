import { expect, test } from "vitest";

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function removeElement(nums: number[], val: number): number {
  let slowIndex = 0;
  for (let fastIndex = 0; fastIndex < nums.length; fastIndex++) {
    if (nums[fastIndex] !== val) {
      nums[slowIndex] = nums[fastIndex];
      slowIndex++;
    }
  }
  return slowIndex;
}

/**
 * 输入：nums = [3,2,2,3], val = 3
 * 输出：2, nums = [2,2,_,_]
 * 解释：你的函数函数应该返回 k = 2, 并且 nums 中的前两个元素均为 2。
 * 你在返回的 k 个元素之外留下了什么并不重要（因此它们并不计入评测）。
 **/
test("removeElement test case 1", () => {
  let nums = [3, 2, 2, 3];
  let expectNum = [2, 2];

  expect(removeElement(nums, 3)).toBe(2);
  for (let i = 0; i < 2; i++) {
    expect(nums[i]).toBe(expectNum[i]);
  }
});

/**
 * 输入：nums = [0,1,2,2,3,0,4,2], val = 2
 * 输出：5, nums = [0,1,4,0,3,_,_,_]
 * 解释：你的函数应该返回 k = 5，并且 nums 中的前五个元素为 0,0,1,3,4。
 * 你在返回的 k 个元素之外留下了什么并不重要（因此它们并不计入评测）。
 **/
test("removeElement test case 2", () => {
  let nums = [0, 1, 2, 2, 3, 0, 4, 2];
  let expectNum = [0, 1, 3, 0, 4];
  expect(removeElement(nums, 2)).toBe(5);
  for (let i = 0; i < 5; i++) {
    expect(nums[i]).toBe(expectNum[i]);
  }
});
