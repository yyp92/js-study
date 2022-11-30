/**
 * 移除链表元素
 * https://leetcode.cn/problems/remove-linked-list-elements/
 * 
 * 题意：删除链表中等于给定值 val 的所有节点。
 * 示例 1：
 * 输入：head = [1,2,6,3,4,5,6], val = 6
 * 输出：[1,2,3,4,5]
 * 
 * 示例 2：
 * 输入：head = [], val = 1
 * 输出：[]
 * 
 * 示例 3：
 * 输入：head = [7,7,7,7], val = 7
 * 输出：[]z
 */

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

// 删除链表元素
var removeElements = function(head, val) {
    const ret = ListNode(head);
    const temp = []
    if (!ret) {
        return []
    }

    let cur = ret

    while(cur.next) {
        if(cur.next.val === val) {
            cur.next = cur.next.next;
            continue;
        }

        temp.push(cur.val)
        cur = cur.next;
    }

    // 解决所有链表都是一样的值
    if (ret.val === val && !ret.next) {
        return []
    }

    // 保证插入链表最后一项的值
    temp.push(cur.val)

    return temp;
};


// 测试
// 输入：head = [1,2,6,3,4,5,6], val = 6
// 输出：[1,2,3,4,5]
const head = [1,2,6,3,4,5,6]
const val = 6
console.log('====-----',JSON.stringify(removeElements(head, val)))

const head1 = []
const val1 = 1
console.log('====-----',JSON.stringify(removeElements(head1, val1)))

const head2 = [7,7,7,7]
const val2 = 7
console.log('====-----',JSON.stringify(removeElements(head2, val2)))
   