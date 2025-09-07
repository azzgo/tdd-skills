// 有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。
//
// 例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。
// 给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，这些地址可以通过在 s 中插入 '.' 来形成。你 不能 重新排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。
//
// 示例 1：
//
// 输入：s = "25525511135"
// 输出：["255.255.11.135","255.255.111.35"]
// 示例 2：
//
// 输入：s = "0000"
// 输出：["0.0.0.0"]
// 示例 3：
//
// 输入：s = "101023"
// 输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
//
//
// 提示：
//
// 1 <= s.length <= 20
// s 仅由数字组成

const validIpPart = (s: string) => {
  if (s.startsWith("0") && s.length > 1) {
    return false;
  }
  const num = Number(s);
  return num >= 0 && num <= 255;
};

function restoreIpAddresses(s: string): string[] {
  const result: string[][] = [];
  const backtracke = (start: number = 0, path: string[] = []) => {
    if (start >= s.length && path.length === 4) {
      result.push([...path]);
      return;
    } else if (path.length > 4) {
      return;
    }
    for (let i = start; i < s.length; i++) {
      const ipPart = s.slice(start, i + 1);
      if (validIpPart(ipPart)) {
        path.push(ipPart);
        backtracke(i + 1, path);
        path.pop();
      }
    }
  };
  backtracke();
  return result.map((parts) => parts.join("."));
}
import { describe, expect, test } from "vitest";

describe("restoreIpAddresses", () => {
  test("case 1", () => {
    // 示例1
    expect(restoreIpAddresses("25525511135").sort()).toEqual(
      ["255.255.11.135", "255.255.111.35"].sort(),
    );
  });

  test("case2", () => {
    // 示例2
    expect(restoreIpAddresses("0000").sort()).toEqual(["0.0.0.0"].sort());
  });

  test("case3", () => {
    // 示例3
    expect(restoreIpAddresses("101023").sort()).toEqual(
      ["1.0.10.23", "1.0.102.3", "10.1.0.23", "10.10.2.3", "101.0.2.3"].sort(),
    );
  });

  test("case4", () => {
    // 边界情况：长度不足
    expect(restoreIpAddresses("1")).toEqual([]);
    expect(restoreIpAddresses("12")).toEqual([]);
    expect(restoreIpAddresses("123")).toEqual([]);
    // 边界情况：有前导0
    expect(restoreIpAddresses("010010").sort()).toEqual(
      ["0.10.0.10", "0.100.1.0"].sort(),
    );
    // 非法数字（大于255）
    expect(restoreIpAddresses("256256256256")).toEqual([]);
    // 长度超过12
    expect(restoreIpAddresses("1111111111111")).toEqual([]);
  });
});
