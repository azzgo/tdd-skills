// 给你一个字符串数组 words ，请你找出所有在 words 的每个字符串中都出现的共用字符（ 包括重复字符），并以数组形式返回。你可以按 任意顺序 返回答案。
//
// 示例 1：
//
// 输入：words = ["bella","label","roller"] 输出：["e","l","l"]
//
// 示例 2：
//
// 输入：words = ["cool","lock","cook"] 输出：["c","o"]
//
// 提示：
//
// 1 <= words.length <= 100 1 <= words[i].length <= 100 words[i] 由小写英文字母组成

function commonChars(words: string[]): string[] {
  if (words.length === 0) return [];
  const minCharCountMap: Map<string, number> = new Map();
  const firstWord = words[0];
  for (const char of firstWord) {
    minCharCountMap.set(char, (minCharCountMap.get(char) || 0) + 1);
  }

  for (let i = 1; i < words.length; i++) {
    const currentWord = words[i];
    const currentCharCountMap: Map<string, number> = new Map();
    for (const char of currentWord) {
      currentCharCountMap.set(char, (currentCharCountMap.get(char) || 0) + 1);
    }
    for (const [char, count] of minCharCountMap.entries()) {
      if (minCharCountMap.has(char)) {
        minCharCountMap.set(char, Math.min(count, currentCharCountMap.get(char) || 0));
      } else {
        minCharCountMap.delete(char);
      }
    }
  }

  const result: string[] = [];
  for (const [char, count] of minCharCountMap.entries()) {
    for (let i = 0; i < count; i++) {
      result.push(char);
    }
  }

  return result;
}

import { expect, test, vitest } from "vitest";

test("returns common characters including duplicates (example 1)", () => {
  expect(commonChars(["bella", "label", "roller"]).sort()).toEqual(
    ["e", "l", "l"].sort(),
  );
});

test("returns common characters including duplicates (example 2)", () => {
  expect(commonChars(["cool", "lock", "cook"]).sort()).toEqual(
    ["c", "o"].sort(),
  );
});

