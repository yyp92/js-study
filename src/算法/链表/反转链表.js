/**
 * 反转链表
 * https://leetcode.cn/problems/reverse-linked-list/
 * 
 * 结果：
 *  1 -> 2 -> 3 -> 4 -> 5 -> null
 *  5 -> 4 -> 3 -> 2 -> 1 -> null
 */


// 双指针：
var reverseList = function(head) {
    if(!head || !head.next) return head;

    let temp = null, pre = null, cur = head;

    while(cur) {
        temp = cur.next;
        cur.next = pre;
        pre = cur;
        cur = temp;
    }

    return pre;
};



// 测试
class LinkNode {
    constructor(val, next) {
        this.val = val;
        this.next = next;
    }
}
var MyLinkedList = function() {
    this._size = 0;
    this._tail = null;
    this._head = null;
};
MyLinkedList.prototype.addAtTail = function(val) {
    const node = new LinkNode(val, null);
    this._size++;

    if (this._tail) {
        this._tail.next = node;
        this._tail = node;
        return;
    }

    this._tail = node;
    this._head = node;
};
const obj = new MyLinkedList()
obj.addAtTail(1)
obj.addAtTail(2)
obj.addAtTail(3)
obj.addAtTail(4)
obj.addAtTail(5)
console.log(JSON.stringify(obj._head))
console.log(JSON.stringify(reverseList(obj._head)))
// {"val":1,"next":{"val":2,"next":{"val":3,"next":{"val":4,"next":{"val":5,"next":null}}}}}
// {"val":5,"next":{"val":4,"next":{"val":3,"next":{"val":2,"next":{"val":1,"next":null}}}}}