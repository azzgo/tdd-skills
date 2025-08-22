// 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。
//
// 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。
//
//
//
// 示例 1：
//
// 输入：s = ["h","e","l","l","o"]
// 输出：["o","l","l","e","h"]
// 示例 2：
//
// 输入：s = ["H","a","n","n","a","h"]
// 输出：["h","a","n","n","a","H"]

/**
 Do not return anything, modify s in-place instead.
 */
function reverseString(s: string[]): void {
  const swap = (i: number, j: number) => {
    const temp = s[i];
    s[i] = s[j];
    s[j] = temp;
  };

  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    swap(i, j);
  }
}

import { beforeEach, describe, expect, test, vi } from "vitest";

describe("Reverse String", () => {
  test("case 1", () => {
    const s = ["h", "e", "l", "l", "o"];
    reverseString(s);
    expect(s).toEqual(["o", "l", "l", "e", "h"]);
  });

  test("case 2", () => {
    const s = ["H", "a", "n", "n", "a", "h"];
    reverseString(s);
    expect(s).toEqual(["h", "a", "n", "n", "a", "H"]);
  });
});
