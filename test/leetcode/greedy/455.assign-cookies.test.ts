// 假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。
//
// 对每个孩子 i，都有一个胃口值 g[i]，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j，都有一个尺寸 s[j] 。如果 s[j] >= g[i]，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是满足尽可能多的孩子，并输出这个最大数值。
//
//
// 示例 1:
//
// 输入: g = [1,2,3], s = [1,1]
// 输出: 1
// 解释:
// 你有三个孩子和两块小饼干，3 个孩子的胃口值分别是：1,2,3。
// 虽然你有两块小饼干，由于他们的尺寸都是 1，你只能让胃口值是 1 的孩子满足。
// 所以你应该输出 1。
//
// 示例 2:
//
// 输入: g = [1,2], s = [1,2,3]
// 输出: 2
// 解释:
// 你有两个孩子和三块小饼干，2 个孩子的胃口值分别是 1,2。
// 你拥有的饼干数量和尺寸都足以让所有孩子满足。
// 所以你应该输出 2。
//
//
//
// 提示：
//
//     1 <= g.length <= 3 * 104
//     0 <= s.length <= 3 * 104
//     1 <= g[i], s[j] <= 231 - 1
//
//
//
// 注意：本题与 2410. 运动员和训练师的最大匹配数 题相同。
function findContentChildren(kids: number[], cookies: number[]): number {
  kids.sort((a, b) => a - b);
  cookies.sort((a, b) => a - b);
  let result: number = 0;
  let kidIndex = 0;

  for (const cookie of cookies) {
    // 用饼干找小孩，一定找到就 +1
    if (kidIndex < kids.length && kids[kidIndex] <= cookie) {
      kidIndex++;
      result++;
    }
  }
  return result;
}

import { describe, expect, test } from "vitest";

describe("Assign cookies", () => {
  test("示例1: g = [1,2,3], s = [1,1]", () => {
    expect(findContentChildren([1, 2, 3], [1, 1])).toBe(1);
  });

  test("示例2: g = [1,2], s = [1,2,3]", () => {
    expect(findContentChildren([1, 2], [1, 2, 3])).toBe(2);
  });

  test("边界: 没有孩子", () => {
    expect(findContentChildren([], [1, 2, 3])).toBe(0);
  });

  test("边界: 没有饼干", () => {
    expect(findContentChildren([1, 2, 3], [])).toBe(0);
  });

  test("所有孩子都能满足", () => {
    expect(findContentChildren([1, 2, 3], [3, 2, 1])).toBe(3);
  });

  test("饼干尺寸都小于孩子胃口", () => {
    expect(findContentChildren([5, 6, 7], [1, 2, 3])).toBe(0);
  });
});
