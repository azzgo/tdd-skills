// 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。
//
// 示例 1:
//
// 输入: nums = [1,1,1,2,2,3], k = 2
// 输出: [1,2]
// 示例 2:
//
// 输入: nums = [1], k = 1
// 输出: [1]
// 提示：
//
// 你可以假设给定的 k 总是合理的，且 1 ≤ k ≤ 数组中不相同的元素的个数。
// 你的算法的时间复杂度必须优于
//  , n 是数组的大小。
// 题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的。
// 你可以按任意顺序返回答案。
// 提示：
//
// 1 <= nums.length <= 105
// k 的取值范围是 [1, 数组中不相同的元素的个数]

function topKFrequent(nums: number[], k: number): number[] {
  const map = new Map<number, number>();
  for (const num of nums) {
    map.set(num, map.get(num) ? map.get(num)! + 1 : 1);
  }
  const heap = new PriorityQueue();
  for (const [num, freq] of map) {
    heap.enqueue(num, freq);
    if (heap.size() > k) {
      heap.dequeue();
    }
  }
  const result: number[] = [];
  while (heap.size() > 0) {
    result.push(heap.dequeue()!.value);
  }
  return result;
}

import { beforeEach, describe, expect, test, vi } from "vitest";
import { PriorityQueue } from "./helper";

describe("Top K frequent element", () => {
  test("case 1", () => {
    expect(topKFrequent([1, 1, 1, 2, 2, 3], 2).sort()).toEqual([1, 2].sort());
  });
  test("case 2", () => {
    expect(topKFrequent([1], 1)).toEqual([1]);
  });
  test("case 3", () => {
    expect(topKFrequent([1, 2], 2).sort()).toEqual([1, 2].sort());
  });
  test('case 4', () => {
    expect(topKFrequent([4,1,-1,2,-1,2,3], 2).sort()).toEqual([-1,2].sort());
  });
});
