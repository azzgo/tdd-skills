export class SingleListNode {
  public val: number;
  public next: SingleListNode | null = null;

  static fromArray(arr: number[]): SingleListNode | null {
    if (arr.length === 0) return null;
    const head = new SingleListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
      current.next = new SingleListNode(arr[i]);
      current = current.next;
    }
    return head;
  }

  constructor(value: number) {
    this.val = value;
    this.next = null;
  }

  toJSON() {
    return {
      val: this.val,
      next: this.next ? this.next.toJSON() : null,
    };
  }
}

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }

  static fromArray(arr: number[]): SingleListNode | null {
    if (arr.length === 0) return null;
    const head = new SingleListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
      current.next = new SingleListNode(arr[i]);
      current = current.next;
    }
    return head;
  }

  toJSON() {
    return {
      val: this.val,
      next: this.next ? this.next.toJSON() : null,
    };
  }
}

export class DoubleListNode {
  public key: number | null = null;
  public val: number | null = null;
  public next: DoubleListNode | null = null;
  public prev: DoubleListNode | null = null;

  constructor() {}

  toJSON() {
    const result = [];
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let cur: DoubleListNode | null = this;
    let leftCount = 10;
    while (cur != null && leftCount > 0) {
      result.push({ key: cur.key, val: cur.val });
      cur = cur.next;
      leftCount--;
    }
    return result;
  }
}
