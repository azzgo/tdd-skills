export class Stack {
  private items: any[] = [];

  push(item: any) {
    this.items.push(item);
  }

  pop(): any | undefined {
    return this.items.pop();
  }

  peek(): any | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

export class Queue {
  private items: any[] = [];

  enqueue(item: any) {
    this.items.push(item);
  }

  dequeue(): any | undefined {
    return this.items.shift();
  }

  front(): any | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// 小顶堆
export class PriorityQueue {
  private items: { value: any; priority: number }[] = [];

  enqueue(value: any, priority: number) {
    const newItem = { value, priority };
    this.items.push(newItem);
    let index = this.items.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);
    while (parentIndex >= 0 && this.items[parentIndex].priority > priority) {
      [this.items[index], this.items[parentIndex]] = [
        this.items[parentIndex],
        this.items[index],
      ];
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  dequeue(): any | undefined {
    if (this.items.length === 0) return undefined;
    if (this.items.length === 1) return this.items.pop();
    const out = this.items[0];
    this.items[0] = this.items.pop()!;
    let index = 0;
    let left = 1;
    let searchChild =
      this.items[left]?.priority > this.items[left + 1]?.priority ? left + 1 : left;
    while (
      this.items[index].priority > this.items[searchChild]?.priority 
    ) {
      [this.items[index], this.items[searchChild]] = [
        this.items[searchChild],
        this.items[index],
      ];
      index = searchChild;
      left = index * 2 + 1;
      searchChild =
        this.items[left] &&
        this.items[left].priority > this.items[left + 1]?.priority
          ? left + 1
          : left;
    }
    return out;
  }

  peek(): any | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}
