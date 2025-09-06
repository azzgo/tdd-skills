// 给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
//
// candidates 中的每个数字在每个组合中只能使用 一次 。
//
// 注意：解集不能包含重复的组合。
//
// 示例 1:
//
// 输入: candidates = [10,1,2,7,6,1,5], target = 8,
// 输出:
// [
// [1,1,6],
// [1,2,5],
// [1,7],
// [2,6]
// ]
// 示例 2:
//
// 输入: candidates = [2,5,2,1,2], target = 5,
// 输出:
// [
// [1,2,2], [5]
// ]
//
//
// 提示:
//
// 1 <= candidates.length <= 100
// 1 <= candidates[i] <= 50
// 1 <= target <= 30

function combinationSum2(candidates: number[], target: number): number[][] {
  const result: number[][] = [];
  candidates.sort((a, b) => a - b);
  const backtrace = (
    sum: number = 0,
    start: number = 0,
    path: number[] = [],
  ) => {
    if (sum === target) {
      result.push([...path]);
      return;
    }
    for (
      let i = start;
      i < candidates.length && sum + candidates[i] <= target;
      i++
    ) {
      // 利用排序加前序比对,去除重复组合
      if (i > start && candidates[i] == candidates[i - 1]) {
        continue;
      }
      path.push(candidates[i]);
      backtrace(sum + candidates[i], i + 1, path);
      path.pop();
    }
  };

  backtrace();
  return result;
}

import { describe, expect, test } from "vitest";

describe("name", () => {
  test("case 1", () => {
    // 示例1: candidates = [10,1,2,7,6,1,5], target = 8
    expect(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)).toEqual([
      [1, 1, 6],
      [1, 2, 5],
      [1, 7],
      [2, 6],
    ]);
  });

  test("case 2", () => {
    // 示例2: candidates = [2,5,2,1,2], target = 5
    expect(combinationSum2([2, 5, 2, 1, 2], 5)).toEqual([[1, 2, 2], [5]]);
  });
});
