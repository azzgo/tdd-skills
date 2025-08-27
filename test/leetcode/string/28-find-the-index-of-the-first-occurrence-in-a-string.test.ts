// 28. 找出字符串中第一个匹配项的下标
// 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。如果 needle 不是 haystack 的一部分，则返回  -1 。
// 示例 1：
//
// 输入：haystack = "sadbutsad", needle = "sad"
// 输出：0
// 解释："sad" 在下标 0 和 6 处匹配。
// 第一个匹配项的下标是 0 ，所以返回 0 。
// 示例 2：
//
// 输入：haystack = "leetcode", needle = "leeto"
// 输出：-1
// 解释："leeto" 没有在 "leetcode" 中出现，所以返回 -1 。
//
//
// 提示：
//
// 1 <= haystack.length, needle.length <= 104
// haystack 和 needle 仅由小写英文字符组成
const nextArray = (needle: string) => {
  const next = new Array(needle.length).fill(0);
  // 前缀结束位置, 也是前后缀匹配长度
  let prefixEndIndex = 0;
  for (let postfixEndIndex = 1; postfixEndIndex < needle.length; postfixEndIndex++) {
    // 不匹配时，回退到上一匹配位置/匹配长度
   while (prefixEndIndex > 0 && needle[postfixEndIndex] !== needle[prefixEndIndex]) {
      prefixEndIndex = next[prefixEndIndex - 1];
    }
    // 匹配时，前后缀匹配长度+1
    if (needle[postfixEndIndex] === needle[prefixEndIndex]) {
      prefixEndIndex++;
    }
    // 记录当前前后缀匹配长度
    next[postfixEndIndex] = prefixEndIndex;
  }
  return next;
};
function strStr(haystack: string, needle: string): number {
  if (needle.length === 0) {
    return 0;
  }
  const next = nextArray(needle);
  // matchIndex 表示当前匹配到 needle 的位置
  let matchIndex = 0;
  for (let i = 0; i < haystack.length; i++) {
    while (matchIndex > 0 && haystack[i] !== needle[matchIndex]) {
      matchIndex = next[matchIndex - 1];
    }

    if (haystack[i] === needle[matchIndex]) {
      matchIndex++;
    }
    // 当 j === needle.length 时，表示匹配完成
    if (matchIndex === needle.length) {
      return i - needle.length + 1;
    }
  }
  return -1;
}
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("find the index of the first occurrence in a string", () => {
  test("case 1", () => {
    expect(strStr("sadbutsad", "sad")).toEqual(0);
  });
  test("case 2", () => {
    expect(strStr("leetcode", "leeto")).toEqual(-1);
  });
  
  test("case 3", () => {
    expect(strStr("a", "a")).toEqual(0);
  });
  test("case 4", () => {
    expect(strStr("aaa", "aaaa")).toEqual(-1);
  });
  test("case 5", () => {
    expect(strStr("mississippi", "issip")).toEqual(4);
  });
});
