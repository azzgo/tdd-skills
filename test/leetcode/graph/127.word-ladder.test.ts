// 字典 wordList 中从单词 beginWord 到 endWord 的 转换序列 是一个按下述规格形成的序列 beginWord -> s1 -> s2 -> ... -> sk：
//
//     每一对相邻的单词只差一个字母。
//      对于 1 <= i <= k 时，每个 si 都在 wordList 中。注意， beginWord 不需要在 wordList 中。
//     sk == endWord
//
// 给你两个单词 beginWord 和 endWord 和一个字典 wordList ，返回 从 beginWord 到 endWord 的 最短转换序列 中的 单词数目 。如果不存在这样的转换序列，返回 0 。
//
//
// 示例 1：
//
// 输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
// 输出：5
// 解释：一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog", 返回它的长度 5。
//
// 示例 2：
//
// 输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
// 输出：0
// 解释：endWord "cog" 不在字典中，所以无法进行转换。
//
//
//
// 提示：
//
//     1 <= beginWord.length <= 10
//     endWord.length == beginWord.length
//     1 <= wordList.length <= 5000
//     wordList[i].length == beginWord.length
//     beginWord、endWord 和 wordList[i] 由小写英文字母组成
//     beginWord != endWord
//     wordList 中的所有字符串 互不相同

/**
 * 无权图中，用广搜求最短路最为合适，广搜只要搜到了终点，那么一定是最短的路径
 **/
function ladderLength(
  beginWord: string,
  endWord: string,
  wordList: string[],
): number {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) {
    return 0;
  }
  const visitedMap = new Map();
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  const bfs = () => {
    const queue = [beginWord];
    visitedMap.set(beginWord, 1);

    while (queue.length) {
      const curWord = queue.shift()!;
      const path = visitedMap.get(curWord)!;
      for (let i = 0; i < curWord.length; i++) {
        const left = curWord.slice(0, i);
        const right = curWord.slice(i + 1);
        for (const alpha of alphabet) {
          let newWord = left + alpha + right;
          if (newWord === endWord) {
            visitedMap.set(endWord, path + 1);
            return;
          } else if (!visitedMap.has(newWord) && wordSet.has(newWord)) {
            queue.push(newWord);
            visitedMap.set(newWord, path + 1);
          }
        }
      }
    }
  };

  bfs();

  return visitedMap.get(endWord) ?? 0;
}

import { describe, expect, test } from "vitest";

describe("word ladder", () => {
  test("存在最短转换序列时返回正确长度", () => {
    const beginWord = "hit";
    const endWord = "cog";
    const wordList = ["hot", "dot", "dog", "lot", "log", "cog"];
    expect(ladderLength(beginWord, endWord, wordList)).toBe(5);
  });
  test("endWord 不在字典中时返回 0", () => {
    const beginWord = "hit";
    const endWord = "cog";
    const wordList = ["hot", "dot", "dog", "lot", "log"];
    expect(ladderLength(beginWord, endWord, wordList)).toBe(0);
  });
});
