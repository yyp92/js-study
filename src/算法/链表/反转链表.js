/**
 * 反转链表
 * 
 * 步骤：
 *  首先定义一个cur指针，指向头结点，再定义一个pre指针，初始化为null。
 *  然后就要开始反转了，首先要把 cur->next 节点用tmp指针保存一下，也就是保存一下这个节点。
 *  为什么要保存一下这个节点呢，因为接下来要改变 cur->next 的指向了，将cur->next 指向pre ，此时已经反转了第一个节点了。
 *  接下来，就是循环走如下代码逻辑了，继续移动pre和cur指针。
 *  最后，cur 指针已经指向了null，循环结束，链表也反转完毕了。 此时我们return pre指针就可以了，pre指针就指向了新的头结点。
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