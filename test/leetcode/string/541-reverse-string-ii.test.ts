// 给定一个字符串 s 和一个整数 k，从字符串开头算起，每计数至 2k 个字符，就反转这 2k 字符中的前 k 个字符。
//
// 如果剩余字符少于 k 个，则将剩余字符全部反转。
// 如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
//
//
// 示例 1：
//
// 输入：s = "abcdefg", k = 2
// 输出："bacdfeg"
// 示例 2：
//
// 输入：s = "abcd", k = 2
// 输出："bacd"
//
//
// 提示：
//
// 1 <= s.length <= 104
// s 仅由小写英文组成
// 1 <= k <= 104
function reverseStr(s: string, k: number) {
  const chars = s.split("");
  const n = chars.length;
  const swap = (i: number, j: number) => {
    const temp = chars[i];
    chars[i] = chars[j];
    chars[j] = temp;
  };

  for (let i = 0; i < n; i += 2 * k) {
    let end = Math.min(i + k - 1, n - 1);
    while (start < end) {
      let start = i;
      swap(start, end);
      start++;
      end--;
    }
  }

  return chars.join("");
}

import { beforeEach, describe, expect, test, vi } from "vitest";

describe("reverseStr", () => {
  test('示例1：s = "abcdefg", k = 2', () => {
    expect(reverseStr("abcdefg", 2)).toBe("bacdfeg");
  });

  test('示例2：s = "abcd", k = 2', () => {
    expect(reverseStr("abcd", 2)).toBe("bacd");
  });

  test("剩余字符少于 k 个", () => {
    expect(reverseStr("a", 2)).toBe("a");
    expect(reverseStr("ab", 3)).toBe("ba");
  });

  test("剩余字符小于 2k 但大于或等于 k 个", () => {
    expect(reverseStr("abcde", 2)).toBe("bacde");
  });

  test("k = 1", () => {
    expect(reverseStr("abcdefg", 1)).toBe("abcdefg");
  });

  test("空字符串", () => {
    expect(reverseStr("", 2)).toBe("");
  });
});
