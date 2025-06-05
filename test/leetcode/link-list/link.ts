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
