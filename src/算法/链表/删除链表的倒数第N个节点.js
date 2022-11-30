/**
 * 删除链表的倒数第N个节点
 * https://leetcode.cn/problems/remove-nth-node-from-end-of-list/
 * 
 * n = 2
 * 1 -> 2 -> 3 -> 4 -> 5
 * 1 -> 2 -> 3 -> 5
 */

 var removeNthFromEnd = function(head, n) {
    let ret = new ListNode(0, head)
    let slow = fast = ret;

    // fast先移动n步
    while(n--) fast = fast.next;

    // 找到要删除节点的上一个节点
    while (fast.next !== null) {
        fast = fast.next; 
        slow = slow.next
    };

    slow.next = slow.next.next;
    return ret.next;
};
