// 给定 s 和 t 两个字符串，当它们分别被输入到空白的文本编辑器后，如果两者相等，返回 true 。# 代表退格字符。
//
// 注意：如果对空文本输入退格字符，文本继续为空。
//
//  
//
// 示例 1：
//
// 输入：s = "ab#c", t = "ad#c"
// 输出：true
// 解释：s 和 t 都会变成 "ac"。
// 示例 2：
//
// 输入：s = "ab##", t = "c#d#"
// 输出：true
// 解释：s 和 t 都会变成 ""。
// 示例 3：
//
// 输入：s = "a#c", t = "b"
// 输出：false
// 解释：s 会变成 "c"，但 t 仍然是 "b"。
//  
//
// 提示：
//
// 1 <= s.length, t.length <= 200
// s 和 t 只含有小写字母以及字符 '#'
//  
//
// 进阶：
//
// 你可以用 O(n) 的时间复杂度和 O(1) 的空间复杂度解决该问题吗？

import { describe, it, expect } from "vitest";
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  let left = s.length - 1;
  let right = t.length - 1;

  while (left >= 0 || right >= 0) {
    let skipS = 0;
    while (left >= 0 && (s[left] === "#" || skipS > 0)) {
      if (s[left] === "#") {
        skipS++;
      } else {
        skipS--;
      }
      left--;
    }

    let skipT = 0;
    while (right >= 0 && (t[right] === "#" || skipT > 0)) {
      if (t[right] === "#") {
        skipT++;
      } else {
        skipT--;
      }
      right--;
    }

    if (left >= 0 && right >= 0) {
      if (s[left] !== t[right]) return false;
    }
    // 说明一个字符串已经遍历完了，另一个字符串还有字符没有遍历完，这种情况一定不相等
    else if (left >= 0 || right >= 0) {
      return false;
    }

    left--;
    right--;
  }
  return true;
};

describe("backspaceCompare", () => {
  it("should return true for inputs 'ab#c' and 'ad#c'", () => {
    expect(backspaceCompare("ab#c", "ad#c")).toBe(true);
  });

  it("should return true for inputs 'ab##' and 'c#d#'", () => {
    expect(backspaceCompare("ab##", "c#d#")).toBe(true);
  });

  it("should return false for inputs 'ab#' and 'c#d#'", () => {
    expect(backspaceCompare("ab#", "c#d#")).toBe(false);
  });
});
