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
