import { expect, test } from "vitest";

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const searchInsert = function (nums, target) {
  let left = 0;
  let right = nums.length;
  while (left < right) {
    let middle = left + Math.floor((right - left) / 2);
    if (nums[middle] === target) {
      return middle;
    } else if (nums[middle] < target) {
      left = middle + 1;
    } else {
      right = middle;
    }
  }
  return left;
};

// Example 1:
//
// Input: nums = [1,3,5,6], target = 5
// Output: 2
test("search-insert-position case 1", () => {
  let output = searchInsert([1, 3, 5, 6], 5);
  expect(output).toEqual(2);
});

// Example 2:
//
// Input: nums = [1,3,5,6], target = 2
// Output: 1
test("search-insert-position case 2", () => {
  let output = searchInsert([1, 3, 5, 6], 2);
  expect(output).toEqual(1);
});

// Example 3:
//
// Input: nums = [1,3,5,6], target = 7
// Output: 4
test("search-insert-position case 3", () => {
  let output = searchInsert([1, 3, 5, 6], 7);
  expect(output).toEqual(4);
});


test("search-insert-position case 4", () => {
  let output = searchInsert([1, 3, 5, 6], 0);
  expect(output).toEqual(0);
});
