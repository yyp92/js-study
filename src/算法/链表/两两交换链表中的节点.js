/**
 * 两两交换链表中的节点
 * 建议使用虚拟头结点，这样会方便很多，要不然每次针对头结点（没有前一个指针指向头结点），还要单独处理。
 * 
 * 示例：
 * 输入: head = [1, 2, 3, 4]
 * 输出: [2, 1, 4, 3]
 * 
 * 输入: head = []
 * 输出: []
 * 
 * 输入: head = [1]
 * 输出: [1]
 * 
 */

// 创建链表
class LinkNode {
    constructor(val, next) {
        this.val = val;
        this.next = next;
    }
}

/**
 * Initialize your data structure here.
 * 单链表 储存头尾节点 和 节点数量
 */
var MyLinkedList = function() {
    this._size = 0;
    this._tail = null;
    this._head = null;
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
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

// 实现逻辑
const ListNode = (head = []) => {
    const link = new MyLinkedList()

    head.forEach(item => {
        link.addAtTail(item)
    })

    return link._head
}

// 实现交换逻辑
var swapPairs = function (head) {
    const vHead = ListNode(head)
    let ret = new LinkNode(0, vHead)
    let temp = ret;

    while (temp.next && temp.next.next) {
        let cur = temp.next.next, pre = temp.next;

        pre.next = cur.next;
        cur.next = pre;
        temp.next = cur;
        temp = pre;
    }

    return ret.next;
};


// 测试
const head = [1, 2, 3, 4]
console.log(JSON.stringify(swapPairs(head)))
const head1 = []
console.log(JSON.stringify(swapPairs(head1)))
const head2 = [1]
console.log(JSON.stringify(swapPairs(head2)))