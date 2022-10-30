/**
 * 143.重排链表
 * https://leetcode.cn/problems/reorder-list/submissions/
 * 
 * https://code-thinking-1253855093.file.myqcloud.com/pics/20210726160122.png
 */
// 方法一 使用数组存储节点
var reorderList = function(head, s = [], tmp) {
    let cur = head;
    // list是数组，可以使用下标随机访问
    const list = [];
    while(cur != null) {
        list.push(cur);
        cur = cur.next;
    }

    cur = head; // 重新回到头部
    let l = 1, r = list.length - 1; // 注意左边是从1开始
    let count = 0;

    while(l <= r) {
        if (count % 2 == 0) {
            // even
            cur.next = list[r];
            r--;
        }
        else {
            // odd
            cur.next = list[l];
            l++;
        }

        // 每一次指针都需要移动
        cur = cur.next;
        count++;
    }

    // 注意结尾要结束一波
    cur.next = null;
}

// 方法二 使用双端队列的方法来解决 js中运行很慢
var reorderList = function(head, s = [], tmp) {
    // js数组作为双端队列
    const deque = [];
    // 这里是取head的下一个节点，head不需要再入队了，避免造成重复
    let cur = head.next;
    while(cur != null) {
        deque.push(cur);
        cur = cur.next;
    }

    cur = head;  // 回到头部
    let count = 0;

    while(deque.length !== 0){
        if (count % 2 == 0) {
            // even，取出队列右边尾部的值
            cur.next = deque.pop();
        } 
        else {
            // odd, 取出队列左边头部的值
            cur.next = deque.shift();
        }

        cur = cur.next;
        count++;
    }

    cur.next = null;
}

// 方法三 将链表分割成两个链表，然后把第二个链表反转，之后在通过两个链表拼接成新的链表
var reorderList = function(head, s = [], tmp) {
    // 翻转链表
    const reverseList = head => {
        let headNode = new ListNode(0);
        let cur = head;
        let next = null;

        while(cur != null) {
            next = cur.next;
            cur.next = headNode.next;
            headNode.next = cur;
            cur = next;
        }

        return headNode.next;
    }

    let fast = head, slow = head;
    // 求出中点
    while(fast.next != null && fast.next.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // right就是右半部分 12345 就是45  1234 就是34
    let right = slow.next;
    // 断开左部分和右部分
    slow.next = null;
    // 反转右部分 right就是反转后右部分的起点
    right = reverseList(right);
    // 左部分的起点
    let left = head;

    // 进行左右部分来回连接 
    // 这里左部分的节点个数一定大于等于右部分的节点个数 因此只判断right即可
    while (right != null) {
        let curLeft = left.next;
        left.next = right;
        left = curLeft;

        let curRight = right.next;
        right.next = left;
        right = curRight;
    }
}