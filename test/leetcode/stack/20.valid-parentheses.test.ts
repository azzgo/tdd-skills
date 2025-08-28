// 20. 有效的括号
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
//
// 有效字符串需满足：
//
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 每个右括号都有一个对应的相同类型的左括号。
// 示例 1：
// 输入：s = "()"
// 输出：true
//
// 示例 2：
// 输入：s = "()[]{}"
// 输出：true
//
// 示例 3：
// 输入：s = "(]"
// 输出：false
//
// 示例 4：
// 输入：s = "([])"
// 输出：true
//
// 示例 5：
// 输入：s = "([)]"
// 输出：false
//
// 提示：
//
// 1 <= s.length <= 104
// s 仅由括号 '()[]{}' 组成
import { Stack } from "./helper";

function isValid(s: string): boolean {
  const stack = new Stack();
  const map: Record<string, string> = {
    "(": ")",
    "{": "}",
    "[": "]",
  };
  const isParentheses = (char: string) => {
    return ['(', ')', '{', '}', '[', ']'].includes(char);
  };
  for (let char of s) {
    if (map[char]) {
      stack.push(char);
    } else {
      const top = stack.pop();
      if (isParentheses(char) && map[top!] !== char) {
        return false;
      }
    }
  }
  return stack.isEmpty();
}

import { beforeEach, describe, expect, test, vi } from "vitest";

describe("Valid parentheses", () => {
  test("case 1", () => {
    expect(isValid("()")).toBe(true);
  });

  test("case 2", () => {
    expect(isValid('"()[]{}"')).toBe(true);
  });

  test("case 3", () => {
    expect(isValid("(]")).toBe(false);
  });

  test("case 4", () => {
    expect(isValid("([])")).toBe(true);
  });

  test("case 5", () => {
    expect(isValid("([)]")).toBe(false);
  });

  test("case 6", () => {
    expect(isValid("")).toBe(true);
  });
});
