// 给你一个有 n 个节点的 有向无环图（DAG），请你找出从节点 0 到节点 n-1 的所有路径并输出（不要求按特定顺序）
//
//  graph[i] 是一个从节点 i 可以访问的所有节点的列表（即从节点 i 到节点 graph[i][j]存在一条有向边）。
//
//
//
// 示例 1：
//
// 输入：graph = [[1,2],[3],[3],[]]
// 输出：[[0,1,3],[0,2,3]]
// 解释：有两条路径 0 -> 1 -> 3 和 0 -> 2 -> 3
//
// 示例 2：
//
// 输入：graph = [[4,3,1],[3,2,4],[3],[4],[]]
// 输出：[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]
//
//
//
// 提示：
//
//     n == graph.length
//     2 <= n <= 15
//     0 <= graph[i][j] < n
//     graph[i][j] != i（即不存在自环）
//     graph[i] 中的所有元素 互不相同
//     保证输入为 有向无环图（DAG）

function allPathsSourceTargetInAjancencyList(graph: number[][]): number[][] {
  const paths: number[][] = [];

  const dfs = (current: number, path: number[] = []) => {
    if (current === graph.length - 1) {
      paths.push([...path]);
      return;
    }
    for (let i = 0; i < graph[current].length; i++) {
      path.push(graph[current][i]);
      dfs(graph[current][i], path);
      path.pop();
    }
  };

  dfs(0, [0]);

  return paths;
}
function allPathsSourceTargetInAjancencyMatrix(
  graph: Array<boolean>[],
): number[][] {
  const paths: number[][] = [];

  const dfs = (current: number, path: number[] = []) => {
    if (current === graph.length - 1) {
      paths.push([...path]);
      return;
    }
    for (let i = 0; i < graph[current].length; i++) {
      if (graph[current][i]) {
        path.push(i);
        dfs(i, path);
        path.pop();
      }
    }
  };

  dfs(0, [0]);

  return paths;
}

import { describe, expect, test } from "vitest";

describe("All path from source to target with adjacency matrix", () => {
  test("case 1", () => {
    expect(
      allPathsSourceTargetInAjancencyMatrix([
        [false, true, true, false],
        [false, false, false, true],
        [false, false, false, true],
        [false, false, false, false],
      ]),
    ).toEqual(
      expect.arrayContaining([
        [0, 1, 3],
        [0, 2, 3],
      ]),
    );
  });
  test("case 2", () => {
    expect(
      allPathsSourceTargetInAjancencyMatrix([
        [false, true, false, true, true],
        [false, false, true, true, true],
        [false, false, false, true, false],
        [false, false, false, false, true],
        [false, false, false, false, false],
      ]),
    ).toEqual(
      expect.arrayContaining([
        [0, 4],
        [0, 3, 4],
        [0, 1, 3, 4],
        [0, 1, 2, 3, 4],
        [0, 1, 4],
      ]),
    );
  });
});

describe("All path from source to target in adjacency list", () => {
  test("case 1", () => {
    expect(allPathsSourceTargetInAjancencyList([[1, 2], [3], [3], []])).toEqual(
      expect.arrayContaining([
        [0, 1, 3],
        [0, 2, 3],
      ]),
    );
  });
  test("case 2", () => {
    expect(
      allPathsSourceTargetInAjancencyList([[4, 3, 1], [3, 2, 4], [3], [4], []]),
    ).toEqual(
      expect.arrayContaining([
        [0, 4],
        [0, 3, 4],
        [0, 1, 3, 4],
        [0, 1, 2, 3, 4],
        [0, 1, 4],
      ]),
    );
  });
});
