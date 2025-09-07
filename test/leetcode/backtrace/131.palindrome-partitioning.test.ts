// 给你一个字符串 s，请你将 s 分割成一些 子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。
//
// 示例 1：
//
// 输入：s = "aab"
// 输出：[["a","a","b"],["aa","b"]]
// 示例 2：
//
// 输入：s = "a"
// 输出：[["a"]]
//  
//
// 提示：
//
// 1 <= s.length <= 16
// s 仅由小写英文字母组成

const isPalindrome = (s: string) => {
  let left = 0;
  let right = s.length -1;
  while (left < right) {
    if (s[left] !== s[right]) {
      return false
    }
    left++;
    right--;
  }
  return true;
}

// 思路是先把可能的切割组合切出来, 需要确保切割的字符串符合回文串定义
function partition(s: string): string[][] {
  const result : string[][] = [];
  const backtrace = (start: number = 0, path: string[] = []) => {
    if (start >= s.length) {
      result.push([...path]);
      return;
    }

    for (let i = start; i < s.length; i++) {
      const str = s.slice(start, i + 1)
      if (isPalindrome(str)) {
        path.push(str);
        backtrace(i + 1, path);
        path.pop();
      } else {
        continue
      }
    }
  };
  backtrace();
  return result;
};

import { describe, expect, test } from "vitest";

describe("name", () => {
  test("should return all palindrome partitions for 'aab'", () => {
    expect(partition("aab")).toEqual([
      ["a", "a", "b"],
      ["aa", "b"]
    ]);
  });

  test("should return single partition for 'a'", () => {
    expect(partition("a")).toEqual([
      ["a"]
    ]);
  });

  test("should return all palindrome partitions for 'aba'", () => {
    expect(partition("aba")).toEqual([
      ["a", "b", "a"],
      ["aba"]
    ]);
  });

  test("should return empty partition for empty string", () => {
    expect(partition("")).toEqual([
      []
    ]);
  });
});
