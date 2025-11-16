// 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
//
// 求在该柱状图中，能够勾勒出来的矩形的最大面积。
//
//
//
// 示例 1:
//
// 输入：heights = [2,1,5,6,2,3]
// 输出：10
// 解释：最大的矩形为图中红色区域，面积为 10
//
// 示例 2：
//
// 输入： heights = [2,4]
// 输出： 4
//
//
//
// 提示：
//
//     1 <= heights.length <=105
//     0 <= heights[i] <= 104

/**
 * 思路是以当前柱子为基础，尽量向左和向右扩展，所有柱子都以这个思路扩展的面积最大的就是所求结果
 * 单调栈解法，就是利用其来寻找第一个低于其位置的柱子
 **/
function largestRectangleArea(heights: number[]): number {
  const decreaseStack = [0];
  let area = 0;

  // 单调栈使用中必须要前后有项才能实现比较的目录，这里前后增加 0 项，确保首尾的柱子能纳入计算中
  heights.push(0);
  heights.unshift(0);

  for (let i = 1; i < heights.length; i++) {
    while (
      decreaseStack.length > 0 &&
      heights[i] <= heights[decreaseStack[decreaseStack.length - 1]]
    ) {
      const mid = decreaseStack.pop()!;
      if (heights[i] < heights[mid] && decreaseStack.length > 0) {
        const r = i;
        const l = decreaseStack[decreaseStack.length - 1];

        const w = r - l - 1;
        area = Math.max(area, w * heights[mid]);
      }
    }
    decreaseStack.push(i);
  }

  return area;
}

import { describe, expect, test } from "vitest";

describe("Largest rectangle in histogram", () => {
  test("case 1", () => {
    expect(largestRectangleArea([2, 1, 5, 6, 2, 3])).toEqual(10);
  });

  test("case 2", () => {
    expect(largestRectangleArea([2, 4])).toEqual(4);
  });

  test("case 3", () => {
    expect(largestRectangleArea([2, 4, 4])).toEqual(8);
  });
});
