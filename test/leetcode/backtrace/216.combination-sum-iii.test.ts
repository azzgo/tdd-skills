// 找出所有相加之和为 n 的 k 个数的组合，且满足下列条件：
//
// 只使用数字1到9
// 每个数字 最多使用一次
// 返回 所有可能的有效组合的列表 。该列表不能包含相同的组合两次，组合可以以任何顺序返回。
//
//
//
// 示例 1:
//
// 输入: k = 3, n = 7
// 输出: [[1,2,4]]
// 解释:
// 1 + 2 + 4 = 7
// 没有其他符合的组合了。
// 示例 2:
//
// 输入: k = 3, n = 9
// 输出: [[1,2,6], [1,3,5], [2,3,4]]
// 解释:
// 1 + 2 + 6 = 9
// 1 + 3 + 5 = 9
// 2 + 3 + 4 = 9
// 没有其他符合的组合了。
// 示例 3:
//
// 输入: k = 4, n = 1
// 输出: []
// 解释: 不存在有效的组合。
// 在[1,9]范围内使用4个不同的数字，我们可以得到的最小和是1+2+3+4 = 10，因为10 > 1，没有有效的组合。
function combinationSum3(k: number, n: number): number[][] {
  const result: number[][] = [];
  const backtrace = (
    k: number,
    leftSum: number,
    start: number,
    nums: number[] = [],
  ) => {
    if (leftSum < 0) {
      return;
    }
    if (k === 0 && leftSum === 0) {
      result.push([...nums]);
    }

    for (let i = start; i < 10; i++) {
      nums.push(i);
      backtrace(k - 1, leftSum - i, i + 1, nums);
      nums.pop();
    }
  };
  backtrace(k, n, 1);
  return result;
}

import { describe, expect, test } from "vitest";

describe("combinationSum3", () => {
  test("case 1", () => {
    // 示例1: k=3, n=7，期望输出 [[1,2,4]]
    expect(combinationSum3(3, 7)).toEqual([[1, 2, 4]]);
  });

  test("case 2", () => {
    // 示例2: k=3, n=9，期望输出 [[1,2,6], [1,3,5], [2,3,4]]
    // 结果顺序不重要，使用 toEqual 断言
    expect(combinationSum3(3, 9)).toEqual([
      [1, 2, 6],
      [1, 3, 5],
      [2, 3, 4],
    ]);
  });

  test("case 3", () => {
    // 示例3: k=4, n=1，期望输出 []
    expect(combinationSum3(4, 1)).toEqual([]);
  });
});
