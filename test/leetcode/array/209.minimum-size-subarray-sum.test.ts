/**
 * 给定一个含有 n 个正整数的数组和一个正整数 target 。
 * 找出该数组中满足其总和大于等于 target 的长度最小的
 * [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
 **/
import { expect, test } from "vitest";

// impl1: 滑动窗口 O(n)
const minSubArrayLen = (target: number, nums: number[]): number => {
  let left = 0;
  let right = 0;

  let sum = 0;
  let len: number = 0;
  while (right < nums.length) {
    sum += nums[right];
    while (sum >= target) {
      const sumLength = right - left + 1;
      len = len !== 0 && len < sumLength ? len : sumLength;
      sum -= nums[left];
      left++;
    }
    right++;
  }

  return len;
};

// impl2: 前缀和+二分查找
const minSubArrayLen_impl2 = (target: number, nums: number[]): number => {
  const prefixSum = [0];
  for (let num of nums) {
    prefixSum.push(prefixSum[prefixSum.length - 1] + num);
  }

  let minLength = Infinity;

  // Step 2: 遍历前缀和数组，使用二分查找
  for (let i = 0; i < prefixSum.length; i++) {
    const targetSum = prefixSum[i] + target;

    // 二分查找第一个大于等于 targetSum 的位置
    let left = i + 1,
      right = prefixSum.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      // prefixSum[mid] - prefixSum[i] >= target
      if (prefixSum[mid] >= targetSum) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    // 如果找到有效位置，更新最小长度
    if (left < prefixSum.length) {
      minLength = Math.min(minLength, left - i);
    }
  }

  // Step 3: 返回结果
  return minLength === Infinity ? 0 : minLength;
};

/**
 * 输入：target = 7, nums = [2,3,1,2,4,3]
 * 输出：2
 * 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
 **/
test("test case 1", () => {
  const len = minSubArrayLen(7, [2, 3, 1, 2, 4, 3]);

  expect(len).toEqual(2);
});

/**
 * 输入：target = 4, nums = [1,4,4]
 * 输出：1
 **/
test("test case 2", () => {
  const len = minSubArrayLen(4, [1, 4, 4]);

  expect(len).toEqual(1);
});

/**
 * 输入：target = 11, nums = [1,1,1,1,1,1,1,1]
 * 输出：0
 * 解释：前缀和为 11 的子数组不存在。
 **/
test("test case 3", () => {
  const len = minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]);
  expect(len).toEqual(0);
});

/**
 * 输入 target = 15
 * nums =[5,1,3,5,10,7,4,9,2,8]
 * 输出3
 **/
test("test case 3", () => {
  const len = minSubArrayLen(15, [5, 1, 3, 5, 10, 7, 4, 9, 2, 8]);
  expect(len).toEqual(2);
});
