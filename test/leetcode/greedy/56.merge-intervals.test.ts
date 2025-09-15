// 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
//
// 示例 1：
//
// 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
// 输出：[[1,6],[8,10],[15,18]]
// 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
// 示例 2：
//
// 输入：intervals = [[1,4],[4,5]]
// 输出：[[1,5]]
// 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
// 示例 3：
//
// 输入：intervals = [[4,7],[1,4]]
// 输出：[[1,7]]
// 解释：区间 [1,4] 和 [4,7] 可被视为重叠区间。
//
//
// 提示：
//
// 1 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= starti <= endi <= 104

function merge(intervals: number[][]): number[][] {
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  const result: number[][] = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] <= result[result.length - 1][1]) {
      result[result.length - 1][1] = Math.max(
        intervals[i][1],
        result[result.length - 1][1],
      );
    } else {
      result.push(intervals[i]);
    }
  }
  return result;
}

import { describe, expect, test } from "vitest";

describe("Merge Intervals", () => {
  test("合并重叠区间：示例1", () => {
    const intervals = [
      [1, 3],
      [2, 6],
      [8, 10],
      [15, 18],
    ];
    const expected = [
      [1, 6],
      [8, 10],
      [15, 18],
    ];
    expect(merge(intervals)).toEqual(expected);
  });

  test("合并重叠区间：示例2", () => {
    const intervals = [
      [1, 4],
      [4, 5],
    ];
    const expected = [[1, 5]];
    expect(merge(intervals)).toEqual(expected);
  });

  test("合并重叠区间：示例3，乱序输入", () => {
    const intervals = [
      [4, 7],
      [1, 4],
    ];
    const expected = [[1, 7]];
    expect(merge(intervals)).toEqual(expected);
  });

  test("无重叠区间", () => {
    const intervals = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const expected = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    expect(merge(intervals)).toEqual(expected);
  });

  test("全部重叠为一个区间", () => {
    const intervals = [
      [1, 5],
      [2, 6],
      [3, 7],
    ];
    const expected = [[1, 7]];
    expect(merge(intervals)).toEqual(expected);
  });

  test("单个区间", () => {
    const intervals = [[1, 2]];
    const expected = [[1, 2]];
    expect(merge(intervals)).toEqual(expected);
  });
});
