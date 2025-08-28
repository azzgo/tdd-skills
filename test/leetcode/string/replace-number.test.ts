// 给定一个字符串 s，它包含小写字母和数字字符，请编写一个函数，将字符串中的字母字符保持不变，而将每个数字字符替换为number。
//
// 例如，对于输入字符串 "a1b2c3"，函数应该将其转换为 "anumberbnumbercnumber"。
//
// 对于输入字符串 "a5b"，函数应该将其转换为 "anumberb"
//
// 输入：一个字符串 s,s 仅包含小写字母和数字字符。
//
// 输出：打印一个新的字符串，其中每个数字字符都被替换为了number
//
// 样例输入：a1b2c3
//
// 样例输出：anumberbnumbercnumber
//
// 数据范围：1 <= s.length < 10000。

// 这里不要使用正则表达式和内置方法,使用基本的数组和循环操作实现
function replaceNumber(s: string): string {
  let count = 0;
  for (let char of s) {
    if (char >= "0" && char <= "9") {
      count++;
    }
  }
  if (count === 0) return s;
  const result: string[] = new Array(s.length + count * 5);

  let index = result.length - 1;
  for (let i = s.length - 1; i >= 0; i--) {
    const char = s[i];
    if (char >= "0" && char <= "9") {
      result[index] = "r";
      result[index - 1] = "e";
      result[index - 2] = "b";
      result[index - 3] = "m";
      result[index - 4] = "u";
      result[index - 5] = "n";
      index -= 6;
    } else {
      result[index] = char;
      index--;
    }
  }
  return result.join("");
}

import { describe, expect, test } from "vitest";

describe("Replace Number", () => {
  test("case 1", () => {
    expect(replaceNumber("a1b2c3")).toBe("anumberbnumbercnumber");
  });
  test("case 2", () => {
    expect(replaceNumber("a5b")).toBe("anumberb");
  });
  test("case 3", () => {
    expect(replaceNumber("abc")).toBe("abc");
  });
  test("case 4", () => {
    expect(replaceNumber("123")).toBe("numbernumbernumber");
  });
  test("case 5", () => {
    expect(replaceNumber("a0b9c8")).toBe("anumberbnumbercnumber");
  });
});
