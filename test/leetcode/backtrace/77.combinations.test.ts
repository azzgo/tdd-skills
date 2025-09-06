// 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
//
// 你可以按 任何顺序 返回答案。
// 示例 1：
//
// 输入：n = 4, k = 2
// 输出：
// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]
// 示例 2：
//
// 输入：n = 1, k = 1
// 输出：[[1]]

function combine(n: number, k: number): number[][] {
  const result: number[][] = [];
  const backtrace = (l: number, h: number, k: number, path: number[] = []) => {
    if (k === 1) {
      for (let i = l; i <= h; i++) {
        result.push([...path, i]);
      }
      return;
    }
    // 优化处理, k - path.length 是剩余需要凑齐的数; n - (k - path.length) + 1 是我们需要从 n 个树中, 取几个数
    for (let i = l; i <= n - (k - path.length) + 1; i++) {
      path.push(i);
      backtrace(i + 1, h, k - 1, path);
      path.pop();
    }
  };
  backtrace(1, n, k);
  return result;
}

import { describe, expect, test } from "vitest";

describe("combine", () => {
  test("case 1", () => {
    expect(combine(4, 2)).toEqual([
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
      [3, 4],
    ]);
  });

  test("case 2", () => {
    expect(combine(1, 1)).toEqual([[1]]);
  });

  test("case 3", () => {
    expect(combine(4, 4)).toEqual([[1, 2, 3, 4]]);
  });
});
