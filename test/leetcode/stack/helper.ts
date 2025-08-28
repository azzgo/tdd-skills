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
