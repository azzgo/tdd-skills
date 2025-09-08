// 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
//
// 示例 1：
//
// 输入：nums = [1,1,2]
// 输出：
// [[1,1,2],
//  [1,2,1],
//  [2,1,1]]
//
// 示例 2：
//
// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
//
//
//
// 提示：
//
//     1 <= nums.length <= 8
//     -10 <= nums[i] <= 10

function permuteUnique(nums: number[]): number[][] {
  const result: number[][] = [];
  nums.sort((a, b) => a - b);
  const backtrace = (path: number[] = []) => {
    if (path.length === nums.length) {
      result.push(path.map((i) => nums[i]));
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      // 如果已经取过当前位数字，跳过
      if (path.length > 0 && path.includes(i)) {
        continue;
      // 排序去重，并且
      // 路径上前一位相同数字没有加入路径
      // -- 也可通过前一位相同数字已加入路径作为筛选条件, 但这样搜索低效很多
      } else if (i > 0 && nums[i] === nums[i - 1] && !path.includes(i - 1)) {
        continue;
      }
      path.push(i);
      backtrace(path);
      path.pop();
    }
  };
  backtrace();
  return result;
}

import { describe, expect, test } from "vitest";

describe("permuteUnique", () => {
  test("[1,1,2] 的全排列", () => {
    const nums = [1, 1, 2];
    const expected = [
      [1, 1, 2],
      [1, 2, 1],
      [2, 1, 1],
    ];
    const result = permuteUnique(nums);
    // 检查结果长度和内容
    expect(result.length).toBe(expected.length);
    expect(result).toEqual(expect.arrayContaining(expected));
  });

  test("[1,2,3] 的全排列", () => {
    const nums = [1, 2, 3];
    const expected = [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ];
    const result = permuteUnique(nums);
    expect(result.length).toBe(expected.length);
    expect(result).toEqual(expect.arrayContaining(expected));
  });
});
