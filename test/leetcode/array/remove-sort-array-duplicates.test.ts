import { expect, test } from "vitest";

function removeDuplicates(nums: number[]): number {
  let slowIndex = 0;
  for (let fastIndex = 0; fastIndex < nums.length; fastIndex++) {
    if (nums[fastIndex] !== nums[slowIndex]) {
      slowIndex++;
      nums[slowIndex] = nums[fastIndex];
    }
  }
  return slowIndex + 1;
}

/**
 * 输入：nums = [1,1,2]
 * 输出：2, nums = [1,2,_]
 **/
test("removeDuplicates test case 1", () => {
  let nums = [1, 1, 2];
  let expectNum = [1, 2];
  expect(removeDuplicates(nums)).toBe(2);
  for (let i = 0; i < 2; i++) {
    expect(nums[i]).toBe(expectNum[i]);
  }
});

/**
 * 输入：nums = [0,0,1,1,1,2,2,3,3,4]
 * 输出：5, nums = [0,1,2,3,4,_,_,_,_,_]
 **/
test("removeDuplicates test case 2", () => {
  let nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
  let expectNum = [0, 1, 2, 3, 4];
  expect(removeDuplicates(nums)).toBe(5);
  for (let i = 0; i < 5; i++) {
    expect(nums[i]).toBe(expectNum[i]);
  }
});
