// 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。如果可以利用字典中出现的一个或多个单词拼接出 s 则返回 true。
//
// 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
//
//
//
// 示例 1：
//
// 输入: s = "leetcode", wordDict = ["leet", "code"]
// 输出: true
// 解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
//
// 示例 2：
//
// 输入: s = "applepenapple", wordDict = ["apple", "pen"]
// 输出: true
// 解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
//      注意，你可以重复使用字典中的单词。
//
// 示例 3：
//
// 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
// 输出: false
//
//
//
// 提示：
//
//     1 <= s.length <= 300
//     1 <= wordDict.length <= 1000
//     1 <= wordDict[i].length <= 20
//     s 和 wordDict[i] 仅由小写英文字母组成
//     wordDict 中的所有字符串 互不相同

function wordBreak(s: string, wordDict: string[]): boolean {
  const n = s.length;
  const dp: boolean[] = new Array(n + 1).fill(false);

  dp[0] = true;

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (wordDict.includes(s.slice(j, i)) && dp[j] === true) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[n];
}
import { describe, expect, test } from "vitest";

describe("wordBreak 单词拆分", () => {
  test("可以用字典中的单词拼接出字符串（leetcode）", () => {
    expect(wordBreak("leetcode", ["leet", "code"])).toBe(true);
  });

  test("字典单词可重复使用（applepenapple）", () => {
    expect(wordBreak("applepenapple", ["apple", "pen"])).toBe(true);
  });

  test("无法拼接时返回 false（catsandog）", () => {
    expect(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])).toBe(
      false,
    );
  });

  test("单字符字典和目标", () => {
    expect(wordBreak("a", ["a"])).toBe(true);
    expect(wordBreak("b", ["a"])).toBe(false);
  });

  test("字典包含目标字符串本身", () => {
    expect(wordBreak("apple", ["apple"])).toBe(true);
  });
});
