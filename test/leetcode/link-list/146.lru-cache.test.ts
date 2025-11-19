// 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
// 实现 LRUCache 类：
// LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
// int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
// void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
// 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。
//
//
//
// 示例：
//
// 输入
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// 输出
// [null, null, null, 1, null, -1, null, -1, 3, 4]
//
// 解释
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // 缓存是 {1=1}
// lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
// lRUCache.get(1);    // 返回 1
// lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
// lRUCache.get(2);    // 返回 -1 (未找到)
// lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
// lRUCache.get(1);    // 返回 -1 (未找到)
// lRUCache.get(3);    // 返回 3
// lRUCache.get(4);    // 返回 4

// 自带 map 实现版本
class LRUCacheWithMap {
  private cache = new Map<number, number>();
  private capacity: number;
  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: number): number {
    const result = this.cache.get(key);
    if (result != null) {
      this.cache.delete(key);
      this.cache.set(key, result);
      return result;
    }
    return -1;
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);

    while (this.cache.size > this.capacity) {
      const expiredKey = Array.from(this.cache.keys()).at(0)!;
      this.cache.delete(expiredKey);
    }
  }
}

class LRUCache {
  private cache: Record<number, DoubleListNode> = {};
  private capacity: number;
  private size: number = 0;
  private head: DoubleListNode;
  private tail: DoubleListNode;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.head = new DoubleListNode();
    this.tail = new DoubleListNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: number): number {
    const node = this.cache[key];
    if (node != null) {
      this.moveToHead(node);
      return node.val!;
    }
    return -1;
  }

  put(key: number, value: number): void {
    let node = this.cache[key];
    if (node != null) {
      node.val = value;
      this.moveToHead(node);
    } else {
      node = new DoubleListNode();
      node.key = key;
      node.val = value;
      this.cache[key] = node;
      this.addToHead(node);
      this.size++;
      if (this.size > this.capacity) {
        const toDel = this.tail.prev!;
        toDel.prev!.next = toDel.next;
        toDel.next!.prev = toDel.prev;
        delete this.cache[toDel.key!]
        this.size--;
      }
    }
  }

  private moveToHead(node: DoubleListNode) {
    // 1. 先从原位置移除节点
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
    
    // 2. 将节点插入到头部
    const oldFirst = this.head.next;
    this.head.next = node;
    node.prev = this.head;
    node.next = oldFirst;
    if (oldFirst) {
      oldFirst.prev = node;
    }
  }

  private addToHead(node: DoubleListNode) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next!.prev = node;
    this.head.next = node;
  }
}

import { describe, expect, test } from "vitest";
import { DoubleListNode } from "./link";

describe("LRUCache", () => {
  test("基础功能：应正确实现 LRU 缓存的 put/get 及淘汰逻辑", () => {
    const lRUCache = new LRUCache(2);
    lRUCache.put(1, 1); // 缓存是 {1=1}
    lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
    expect(lRUCache.get(1)).toBe(1); // 返回 1
    lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
    expect(lRUCache.get(2)).toBe(-1); // 返回 -1 (未找到)
    lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
    expect(lRUCache.get(1)).toBe(-1); // 返回 -1 (未找到)
    expect(lRUCache.get(3)).toBe(3); // 返回 3
    expect(lRUCache.get(4)).toBe(4); // 返回 4
  });

  test("值为0及多次淘汰：能正确处理 value=0 及多次淘汰场景", () => {
    // 操作序列: ["LRUCache","put","put","get","put","get","put","get","get","get"]
    // 参数:    [[2],[1,0],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]
    // 期望:    [null,null,null,0,null,-1,null,-1,3,4]
    const lRUCache = new LRUCache(2);
    lRUCache.put(1, 0); // 缓存是 {1=0}
    lRUCache.put(2, 2); // 缓存是 {1=0, 2=2}
    expect(lRUCache.get(1)).toBe(0); // 返回 0
    lRUCache.put(3, 3); // 淘汰 key=2，缓存是 {1=0, 3=3}
    expect(lRUCache.get(2)).toBe(-1); // 返回 -1
    lRUCache.put(4, 4); // 淘汰 key=1，缓存是 {4=4, 3=3}
    expect(lRUCache.get(1)).toBe(-1); // 返回 -1
    expect(lRUCache.get(3)).toBe(3); // 返回 3
    expect(lRUCache.get(4)).toBe(4); // 返回 4
  });

  test("重复 put 导致淘汰：多次 put 同一 key 后淘汰最久未用项", () => {
    // 操作序列: ["LRUCache","put","put","put","put","get","get"]
    // 参数:    [[2],[2,1],[1,1],[2,3],[4,1],[1],[2]]
    // 期望:    [null,null,null,null,null,-1,3]
    const lRUCache = new LRUCache(2);
    lRUCache.put(2, 1); // 缓存是 {2=1}
    lRUCache.put(1, 1); // 缓存是 {2=1, 1=1}
    lRUCache.put(2, 3); // 更新 2，缓存是 {1=1, 2=3}
    lRUCache.put(4, 1); // 淘汰 1，缓存是 {2=3, 4=1}
    expect(lRUCache.get(1)).toBe(-1); // 1 已被淘汰
    expect(lRUCache.get(2)).toBe(3); // 2 还在，值为 3
  });

  test('长序列回归：大规模混合操作下的正确性', () => {
    // 操作序列较长，包含多次 put/get，覆盖多次淘汰、重复 key、边界容量等情况
    // 主要用于回归测试和大规模操作下的正确性验证
    // 操作序列与期望结果见下：
    // ops: ["LRUCache","put","put","put","put","put","get","put","get","get","put","get","put","put","put","get","put","get","get","get","get","put","put","get","get","get","put","put","get","put","get","put","get","get","get","put","put","put","get","put","get","get","put","put","get","put","put","put","put","get","put","put","get","put","put","get","put","put","put","put","put","get","put","put","get","put","get","get","get","put","get","get","put","put","put","put","get","put","put","put","put","get","get","get","put","put","put","get","put","put","put","get","put","put","put","get","get","get","put","put","put","put","get","put","put","put","put","put","put","put"]
    // args: [[10],[10,13],[3,17],[6,11],[10,5],[9,10],[13],[2,19],[2],[3],[5,25],[8],[9,22],[5,5],[1,30],[11],[9,12],[7],[5],[8],[9],[4,30],[9,3],[9],[10],[10],[6,14],[3,1],[3],[10,11],[8],[2,14],[1],[5],[4],[11,4],[12,24],[5,18],[13],[7,23],[8],[12],[3,27],[2,12],[5],[2,9],[13,4],[8,18],[1,7],[6],[9,29],[8,21],[5],[6,30],[1,12],[10],[4,15],[7,22],[11,26],[8,17],[9,29],[5],[3,4],[11,30],[12],[4,29],[3],[9],[6],[3,4],[1],[10],[3,29],[10,28],[1,20],[11,13],[3],[3,12],[3,8],[10,9],[3,26],[8],[7],[5],[13,17],[2,27],[11,15],[12],[9,19],[2,15],[3,16],[1],[12,17],[9,1],[6,19],[4],[5],[5],[8,1],[11,7],[5,2],[9,28],[1],[2,2],[7,4],[4,22],[7,24],[9,26],[13,28],[11,26]]
    // expect: [null,null,null,null,null,null,-1,null,19,17,null,-1,null,null,null,-1,null,-1,5,-1,12,null,null,3,5,5,null,null,1,null,-1,null,30,5,30,null,null,null,-1,null,-1,24,null,null,18,null,null,null,null,-1,null,null,18,null,null,-1,null,null,null,null,null,18,null,null,-1,null,4,29,30,null,12,-1,null,null,null,null,29,null,null,null,null,17,22,18,null,null,null,-1,null,null,null,20,null,null,null,-1,18,18,null,null,null,null,20,null,null,null,null,null,null,null]

      const ops = ["LRUCache","put","put","put","put","put","get","put","get","get","put","get","put","put","put","get","put","get","get","get","get","put","put","get","get","get","put","put","get","put","get","put","get","get","get","put","put","put","get","put","get","get","put","put","get","put","put","put","put","get","put","put","get","put","put","get","put","put","put","put","put","get","put","put","get","put","get","get","get","put","get","get","put","put","put","put","get","put","put","put","put","get","get","get","put","put","put","get","put","put","put","get","put","put","put","get","get","get","put","put","put","put","get","put","put","put","put","put","put","put"];
      const args = [[10],[10,13],[3,17],[6,11],[10,5],[9,10],[13],[2,19],[2],[3],[5,25],[8],[9,22],[5,5],[1,30],[11],[9,12],[7],[5],[8],[9],[4,30],[9,3],[9],[10],[10],[6,14],[3,1],[3],[10,11],[8],[2,14],[1],[5],[4],[11,4],[12,24],[5,18],[13],[7,23],[8],[12],[3,27],[2,12],[5],[2,9],[13,4],[8,18],[1,7],[6],[9,29],[8,21],[5],[6,30],[1,12],[10],[4,15],[7,22],[11,26],[8,17],[9,29],[5],[3,4],[11,30],[12],[4,29],[3],[9],[6],[3,4],[1],[10],[3,29],[10,28],[1,20],[11,13],[3],[3,12],[3,8],[10,9],[3,26],[8],[7],[5],[13,17],[2,27],[11,15],[12],[9,19],[2,15],[3,16],[1],[12,17],[9,1],[6,19],[4],[5],[5],[8,1],[11,7],[5,2],[9,28],[1],[2,2],[7,4],[4,22],[7,24],[9,26],[13,28],[11,26]];
      const expectResult = [null,null,null,null,null,null,-1,null,19,17,null,-1,null,null,null,-1,null,-1,5,-1,12,null,null,3,5,5,null,null,1,null,-1,null,30,5,30,null,null,null,-1,null,-1,24,null,null,18,null,null,null,null,-1,null,null,18,null,null,-1,null,null,null,null,null,18,null,null,-1,null,4,29,30,null,12,-1,null,null,null,null,29,null,null,null,null,17,22,18,null,null,null,-1,null,null,null,20,null,null,null,-1,18,18,null,null,null,null,20,null,null,null,null,null,null,null];

      let lru: LRUCache | null = null;
      for (let i = 0; i < ops.length; i++) {
        const op = ops[i];
        const arg = args[i];
        const expected = expectResult[i];
        if (op === 'LRUCache') {
          lru = new LRUCache(arg[0]);
        } else if (op === 'put') {
          lru!.put(arg[0], arg[1]);
        } else if (op === 'get') {
          expect(lru!.get(arg[0])).toBe(expected);
        }
      }
  })
});
