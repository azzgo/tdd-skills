export class SingleListNode {
  public val: number;
  public next: ListNode|null = null;

  constructor(value: number) {
    this.val = value;
    this.next = null;
  }
}
