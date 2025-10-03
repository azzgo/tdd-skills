const implType: "dp" | "greedy" | "simulate" = "simulate";

// 动态规划实现，O(n^2)
const dpImpl = (nums: number[]): number[] => {
  if (nums.length === 0) return [];
  // dp[i] 记录以 nums[i] 结尾的最长递增子序列
  const dp: number[][] = Array(nums.length)
    .fill(0)
    .map((_, i) => [nums[i]]);
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j] && dp[j].length + 1 > dp[i].length) {
        dp[i] = [...dp[j], nums[i]];
      }
    }
  }
  // 返回最长的那个子序列
  return dp.reduce((a, b) => (a.length >= b.length ? a : b));
};

// 贪心+二分查找实现，O(nlogn)
const greedyImpl = (nums: number[]): number[] => {
  if (nums.length === 0) return [];
  // tails[i] 表示长度为 i+1 的递增子序列的最小结尾
  const tails: number[] = [];
  // prev[i] 记录 nums[i] 的前驱索引，用于还原序列
  const prev: number[] = Array(nums.length).fill(-1);
  // pos[i] 记录长度为 i+1 的子序列最后一个元素的索引
  const pos: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    let left = 0,
      right = tails.length;
    // 二分查找 tails
    while (left < right) {
      const mid = (left + right) >> 1;
      if (tails[mid] < nums[i]) left = mid + 1;
      else right = mid;
    }
    tails[left] = nums[i];
    pos[left] = i;
    if (left > 0) prev[i] = pos[left - 1];
  }
  // 还原最长递增子序列
  let k = pos[tails.length - 1];
  const lis: number[] = [];
  while (k !== -1) {
    lis.push(nums[k]);
    k = prev[k];
  }
  return lis.reverse();
};

/**
 * 模拟法实现，空间换时间，便于理解和回溯具体序列
 * is[i] 表示长度为 i+1 的一个递增子序列
 * 每次尝试将新元素 n 接到最长的可扩展子序列后面
 * 如果无法扩展，则以 n 作为新的长度为 1 的子序列
 * 最终返回最长的那个递增子序列
 */
const simulateImpl = (nums: number[]): number[] => {
  if (nums.length === 0) return [];
  // is[i] 表示长度为 i+1 的一个递增子序列
  const is: number[][] = [];
  is[0] = [nums[0]];

  /**
   * 尝试将 n 接到某个递增子序列后面
   * 从最长的子序列开始，找到第一个末尾元素 < n 的子序列
   * 在其后追加 n，形成新子序列
   * 如果没有找到，则以 n 作为新的长度为 1 的子序列
   */
  const update = (n: number): void => {
    for (let i = is.length - 1; i >= 0; i--) {
      const tail = is[i].at(-1);
      // 如果 n 可以接到当前子序列后面，生成更长的新子序列
      if (n > tail!) {
        is[i + 1] = [...is[i], n];
        return;
      }
    }
    // 如果所有子序列末尾都 >= n，则以 n 作为新的长度为 1 的子序列
    is[0] = [n];
  };

  // 依次处理每个元素
  for (let i = 1; i < nums.length; i++) {
    update(nums[i]);
  }

  // 返回最长的递增子序列
  return is.at(-1)!;
};

/**
 * 求解最长递增子序列
 **/
function lfs(nums: number[]): number[] {
  switch (implType) {
    case "dp":
      return dpImpl(nums);
    case "greedy":
      return greedyImpl(nums);
    case "simulate":
      return simulateImpl(nums);
  }
}

import { describe, expect, test } from "vitest";

describe("lfs - 最长递增子序列", () => {
  test("返回最长递增子序列，典型样例", () => {
    const nums = [10, 9, 2, 5, 3, 7, 101, 18];
    // 期望输出为最长递增子序列之一
    const result = lfs(nums);
    expect(result).toBeOneOf([
      [2, 3, 7, 101],
      [2, 3, 7, 18],
      [2, 5, 7, 101],
    ]);
  });

  test("空数组输入，返回空数组", () => {
    const nums: number[] = [];
    const result = lfs(nums);
    expect(result).toEqual([]);
  });

  test("单元素数组，返回自身", () => {
    const nums = [42];
    const result = lfs(nums);
    expect(result).toEqual([42]);
  });

  test("所有元素相同，返回单元素", () => {
    const nums = [7, 7, 7, 7];
    const result = lfs(nums);
    expect(result).toEqual([7]);
  });

  test("严格递减序列，返回单元素", () => {
    const nums = [5, 4, 3, 2, 1];
    const result = lfs(nums);
    expect(result).toBeOneOf([[1], [2], [3], [4], [5]]);
  });

  test("严格递增序列，返回原数组", () => {
    const nums = [1, 2, 3, 4, 5];
    const result = lfs(nums);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test("有多个相同长度的递增子序列，返回其中之一", () => {
    const nums = [3, 1, 2, 1, 2, 3];
    const result = lfs(nums);
    // 最长递增子序列长度为3，可以是[1,2,3]或[1,2,3]
    expect(result.length).toBe(3);
    expect([1, 2, 3]).toEqual(result);
  });
});
