/**
 * 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
 * 注意：
 *   对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
 *   如果 s 中存在这样的子串，我们保证它是唯一的答案。
 **/

import { expect, test } from "vitest";

function minWindow(source: string, target: string): string {
  if (source.length < target.length) {
    return "";
  }
  let left = 0;
  let right = 0;
  let subStringSlice = [0, 0];
  const letterMap = new Map<string, number>();
  for (const letter of target.split("")) {
    letterMap.set(letter, (letterMap.get(letter) || 0) + 1);
  }
  let counter = 0;
  const size = letterMap.size;
  while (right < source.length) {
    letterMap.set(source[right], (letterMap.get(source[right]) || 0) - 1);
    if (letterMap.get(source[right]) === 0) {
      counter++;
    }
    while ((letterMap.get(source[left])! || 0) < 0) {
      letterMap.set(source[left], (letterMap.get(source[left]) || 0) + 1);
      left++;
    }
    if (counter === size) {
      if (
        subStringSlice[1] - subStringSlice[0] > right - left ||
        subStringSlice.every((v) => v === 0)
      ) {
        subStringSlice = [left, right + 1];
      }
    }
    right++;
  }
  return subStringSlice[1] - subStringSlice[0] > 0
    ? source.slice(subStringSlice[0], subStringSlice[1])
    : "";
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function minWindow_v2(source: string, target: string): string {
  if (source.length < target.length) {
    return "";
  }
  let left = 0;
  let right = 0;
  let subStringSlice = [0, 0];
  // 这里的 letterMap target 字符出现的次数，但后面循环中会记录所有的 source 中字符额外占据的次数
  const targetLetterMap = new Map<string, number>();
  const sourceWindowLetterMap = new Map<string, number>();
  for (const letter of target.split("")) {
    targetLetterMap.set(letter, (targetLetterMap.get(letter) || 0) + 1);
  }
  let counter = 0;
  while (right < source.length) {
    sourceWindowLetterMap.set(
      source[right],
      (sourceWindowLetterMap.get(source[right]) || 0) + 1,
    );
    if (
      (sourceWindowLetterMap.get(source[right]) || 0) <=
      (targetLetterMap.get(source[right]) || 0)
    ) {
      counter++;
    }
    while (
      left < right &&
      (sourceWindowLetterMap.get(source[left]) || 0) >
        (targetLetterMap.get(source[left]) || 0)
    ) {
      sourceWindowLetterMap.set(
        source[left],
        (sourceWindowLetterMap.get(source[left]) || 0) - 1,
      );
      left++;
    }
    if (counter === target.length) {
      if (
        subStringSlice[1] - subStringSlice[0] > right - left ||
        subStringSlice.every((v) => v === 0)
      ) {
        subStringSlice = [left, right + 1];
      }
    }
    right++;
  }
  return subStringSlice[1] - subStringSlice[0] > 0
    ? source.slice(subStringSlice[0], subStringSlice[1])
    : "";
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function minWindow_v1(source: string, target: string): string {
  let left = 0;
  let right = 0;
  let subStringSlice = [0, 0];
  // 这里的 letterMap 初始存储 target 字符出现的次数，但后面循环中会记录所有的 source 中字符额外占据的次数
  // 并用 counter 记录亏欠的字符数量，用来调整窗口的大小
  const letterMap = new Map<string, number>();
  let counter = target.length;
  for (const letter of target.split("")) {
    letterMap.set(letter, (letterMap.get(letter) || 0) + 1);
  }

  while (right < source.length) {
    if (letterMap.has(source[right]) && letterMap.get(source[right])! > 0) {
      counter--;
    }
    letterMap.set(source[right], (letterMap.get(source[right]) || 0) - 1);
    while (counter === 0) {
      if (
        subStringSlice[1] - subStringSlice[0] > right - left ||
        subStringSlice.every((v) => v === 0)
      ) {
        subStringSlice = [left, right + 1];
      }
      letterMap.set(source[left], letterMap.get(source[left])! + 1);
      if (letterMap.has(source[left]) && letterMap.get(source[left])! > 0) {
        counter++;
      }
      left++;
    }
    right++;
  }
  return subStringSlice[1] - subStringSlice[0] > 0
    ? source.slice(subStringSlice[0], subStringSlice[1])
    : "";
}
/**
  * 示例 1：

输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。
**/
test("test case 1", () => {
  const result = minWindow("ADOBECODEBANC", "ABC");
  expect(result).toEqual("BANC");
});
/**
示例 2：

输入：s = "a", t = "a"
输出："a"
解释：整个字符串 s 是最小覆盖子串。
**/
test("test case 2", () => {
  const result = minWindow("a", "a");
  expect(result).toEqual("a");
});

/**
示例 3:

输入: s = "a", t = "aa"
输出: ""
解释: t 中两个字符 'a' 均应包含在 s 的子串中，
因此没有符合条件的子字符串，返回空字符串。
**/
test("test case 3", () => {
  const result = minWindow("a", "aa");
  expect(result).toEqual("");
});

/**
 * 示例 4：
 * 输入：s = "a", t = "aa"
 * 输出："aa"
 **/
test("test case 4", () => {
  const result = minWindow("aa", "aa");
  expect(result).toEqual("aa");
});

// 输入
// s ="acbbaca"
// t = "aba"
// 预期结果 "baca"
test("test case 5", () => {
  const result = minWindow("acbbaca", "aba");
  expect(result).toEqual("baca");
});

// 输入
// s ="ab"
// t = "a"
// 预期结果 "a"
test("test case 6", () => {
  const result = minWindow("ab", "a");
  expect(result).toEqual("a");
});
