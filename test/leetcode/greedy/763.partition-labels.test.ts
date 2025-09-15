// 给你一个字符串 s 。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。例如，字符串 "ababcc" 能够被分为 ["abab", "cc"]，但类似 ["aba", "bcc"] 或 ["ab", "ab", "cc"] 的划分是非法的。
//
// 注意，划分结果需要满足：将所有划分结果按顺序连接，得到的字符串仍然是 s 。
//
// 返回一个表示每个字符串片段的长度的列表。
//
//
//
// 示例 1：
// 输入：s = "ababcbacadefegdehijhklij"
// 输出：[9,7,8]
// 解释：
// 划分结果为 "ababcbaca"、"defegde"、"hijhklij" 。
// 每个字母最多出现在一个片段中。
// 像 "ababcbacadefegde", "hijhklij" 这样的划分是错误的，因为划分的片段数较少。
// 示例 2：
//
// 输入：s = "eccbbbbdec"
// 输出：[10]
//
//
// 提示：
//
// 1 <= s.length <= 500
// s 仅由小写英文字母组成

function partitionLabels(s: string): number[] {
  const charEndIndex = new Map<string, number>();
  // 统计字符出现的最后位置
  for (let i = 0; i < s.length; i++) {
    charEndIndex.set(s[i], i);
  }
  let left = 0;
  let right = 0;
  const parts: number[] = [];
  for (let i = 0; i < s.length; i++) {
    // 当前遍历顺序中,最远可到达的右边界
    right = Math.max(right, charEndIndex.get(s[i])!);
    // 如果达到右边界,依此作为分割点
    if (i === right) {
      parts.push(right - left + 1);
      left = i + 1;
    }
  }
  return parts;
}

import { describe, expect, test } from "vitest";

describe("partitionLabels", () => {
  test("should partition string into as many parts as possible so that each letter appears in at most one part (example 1)", () => {
    const s = "ababcbacadefegdehijhklij";
    const expected = [9, 7, 8];
    expect(partitionLabels(s)).toEqual(expected);
  });

  test("should partition string into as many parts as possible so that each letter appears in at most one part (example 2)", () => {
    const s = "eccbbbbdec";
    const expected = [10];
    expect(partitionLabels(s)).toEqual(expected);
  });
});
