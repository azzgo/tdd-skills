// 给你一份航线列表 tickets ，其中 tickets[i] = [fromi, toi] 表示飞机出发和降落的机场地点。请你对该行程进行重新规划排序。
//
// 所有这些机票都属于一个从 JFK（肯尼迪国际机场）出发的先生，所以该行程必须从 JFK 开始。如果存在多种有效的行程，请你按字典排序返回最小的行程组合。
//
//     例如，行程 ["JFK", "LGA"] 与 ["JFK", "LGB"] 相比就更小，排序更靠前。
//
// 假定所有机票至少存在一种合理的行程。且所有的机票 必须都用一次 且 只能用一次。
//
//
// 示例 1：
//
// 输入：tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
// 输出：["JFK","MUC","LHR","SFO","SJC"]
//
// 示例 2：
//
// 输入：tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
// 输出：["JFK","ATL","JFK","SFO","ATL","SFO"]
// 解释：另一种有效的行程是 ["JFK","SFO","ATL","JFK","ATL","SFO"] ，但是它字典排序更大更靠后。
//
//
//
// 提示：
//
//     1 <= tickets.length <= 300
//     tickets[i].length == 2
//     fromi.length == 3
//     toi.length == 3
//     fromi 和 toi 由大写英文字母组成
//     fromi != toi

const implType: "backstrace" | "deep-recuseive" = "deep-recuseive";

type StartPos = string;
type EndPos = string;

function findItineraryBackstrace(tickets: string[][]): string[] {
  const result: string[] = ["JFK"];
  const targets: Map<StartPos, Map<EndPos, number>> = new Map();
  // 对行程排序，确保下面 map 的加入顺序，字母靠前的排前面，确保 iter 顺序和字母顺序一致
  tickets.sort();
  for (const ticket of tickets) {
    let target: Map<EndPos, number>;
    if (targets.has(ticket[0])) {
      target = targets.get(ticket[0])!;
    } else {
      target = new Map<EndPos, number>();
      targets.set(ticket[0], target);
    }
    target.set(ticket[1], (target.get(ticket[1]) || 0) + 1);
  }

  const backstrace = (path: string[] = []): boolean => {
    // 地点树是行程断 + 1
    if (path.length === tickets.length + 1) {
      return true;
    }

    const target = targets.get(path[path.length - 1]);
    if (!target) return false;
    // 按加入顺序迭代，确保先迭代到的是字母排序靠前的机场
    for (const targetKey of target.keys()) {
      if (target.get(targetKey)! > 0) {
        path.push(targetKey);
        target.set(targetKey, target.get(targetKey)! - 1);
        if (backstrace(path)) return true;
        target.set(targetKey, target.get(targetKey)! + 1);
        path.pop();
      }
    }
    return false;
  };

  backstrace(result);
  return result;
}

function findItineraryDFS(tickets: string[][]): string[] {
  // TODO: AI 实现，理解图论之后再来看看实现原理
  const targets: Map<string, string[]> = new Map();
  for (const [from, to] of tickets) {
    if (!targets.has(from)) targets.set(from, []);
    targets.get(from)!.push(to);
  }
  // 按字典序排序
  for (const arr of targets.values()) arr.sort();

  const result: string[] = [];
  function dfs(airport: string) {
    const dests = targets.get(airport);
    while (dests && dests.length) {
      dfs(dests.shift()!);
    }
    result.push(airport);
  }
  dfs("JFK");
  return result.reverse();
}
function findItinerary(tickets: string[][]): string[] {
  switch (implType) {
    case "backstrace":
      // 回溯算法下，测试用例3无法在常数时间内返回结果，非最优解
      return findItineraryBackstrace(tickets);
    case "deep-recuseive":
      return findItineraryDFS(tickets);
  }
}

import { describe, expect, test } from "vitest";

describe("reconstruct itinerary", () => {
  test("示例1：基础行程", () => {
    const tickets = [
      ["MUC", "LHR"],
      ["JFK", "MUC"],
      ["SFO", "SJC"],
      ["LHR", "SFO"],
    ];
    const expected = ["JFK", "MUC", "LHR", "SFO", "SJC"];
    expect(findItinerary(tickets)).toEqual(expected);
  });

  test("示例2：有多种行程，需字典序最小", () => {
    const tickets = [
      ["JFK", "SFO"],
      ["JFK", "ATL"],
      ["SFO", "ATL"],
      ["ATL", "JFK"],
      ["ATL", "SFO"],
    ];
    const expected = ["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"];
    expect(findItinerary(tickets)).toEqual(expected);
  });

  test("实例3: 回溯算法无法在现实时间内返回结果", () => {
    const tickets = [
      ["JFK", "SFO"],
      ["JFK", "ATL"],
      ["SFO", "JFK"],
      ["ATL", "AAA"],
      ["AAA", "ATL"],
      ["ATL", "BBB"],
      ["BBB", "ATL"],
      ["ATL", "CCC"],
      ["CCC", "ATL"],
      ["ATL", "DDD"],
      ["DDD", "ATL"],
      ["ATL", "EEE"],
      ["EEE", "ATL"],
      ["ATL", "FFF"],
      ["FFF", "ATL"],
      ["ATL", "GGG"],
      ["GGG", "ATL"],
      ["ATL", "HHH"],
      ["HHH", "ATL"],
      ["ATL", "III"],
      ["III", "ATL"],
      ["ATL", "JJJ"],
      ["JJJ", "ATL"],
      ["ATL", "KKK"],
      ["KKK", "ATL"],
      ["ATL", "LLL"],
      ["LLL", "ATL"],
      ["ATL", "MMM"],
      ["MMM", "ATL"],
      ["ATL", "NNN"],
      ["NNN", "ATL"],
    ];
    // 超时没跑出结果，跑出来来后再修改
    const expected = [
      "JFK",
      "SFO",
      "JFK",
      "ATL",
      "AAA",
      "ATL",
      "BBB",
      "ATL",
      "CCC",
      "ATL",
      "DDD",
      "ATL",
      "EEE",
      "ATL",
      "FFF",
      "ATL",
      "GGG",
      "ATL",
      "HHH",
      "ATL",
      "III",
      "ATL",
      "JJJ",
      "ATL",
      "KKK",
      "ATL",
      "LLL",
      "ATL",
      "MMM",
      "ATL",
      "NNN",
      "ATL",
    ];
    expect(findItinerary(tickets)).toEqual(expected);
  });
});
