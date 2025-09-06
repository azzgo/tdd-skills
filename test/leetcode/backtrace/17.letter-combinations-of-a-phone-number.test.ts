// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
//
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
// 示例 1：
//
// 输入：digits = "23"
// 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
// 示例 2：
//
// 输入：digits = ""
// 输出：[]
// 示例 3：
//
// 输入：digits = "2"
// 输出：["a","b","c"]

const digitMap = {
  2: ["a", "b", "c"],
  3: ["d", "e", "f"],
  4: ["g", "h", "i"],
  5: ["j", "k", "l"],
  6: ["m", "n", "o"],
  7: ["p", "q", "r", "s"],
  8: ["t", "u", "v"],
  9: ["w", "x", "y", "z"],
};
type DigitType = keyof typeof digitMap;
function letterCombinations(digits: string): string[] {
  const result: string[] = [];
  if (digits === "") {
    return result;
  }
  const backtrace = (index: number, path: string[] = []) => {
    const charList = digitMap[digits[index] as unknown as DigitType];
    // 非法输入, 比如 1, #, 0, * 这类按键输入
    if (charList == null) {
      return;
    }
    if (index === digits.length - 1) {
      for (const letter of charList) {
        path.push(letter);
        result.push(path.join(""));
        path.pop();
      }
      return;
    }
    for (const letter of charList) {
      path.push(letter);
      backtrace(index + 1, path);
      path.pop();
    }
  };
  backtrace(0);
  return result;
}

import { describe, expect, test } from "vitest";

describe("letterCombinations", () => {
  test("case 1", () => {
    // 示例1: digits = "23"
    expect(letterCombinations("23")).toEqual([
      "ad",
      "ae",
      "af",
      "bd",
      "be",
      "bf",
      "cd",
      "ce",
      "cf",
    ]);
  });

  test("case 2", () => {
    // 示例2: digits = ""
    expect(letterCombinations("")).toEqual([]);
  });

  test("case 3", () => {
    // 示例3: digits = "2"
    expect(letterCombinations("2")).toEqual(["a", "b", "c"]);
  });
});
