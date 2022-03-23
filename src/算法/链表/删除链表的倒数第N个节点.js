/**
 * 删除链表的倒数第N个节点
 * 
 * n = 2
 * 1 -> 2 -> 3 -> 4 -> 5
 * 1 -> 2 -> 3 -> 5
 * 
 * 思路：
 * 双指针的经典应用，如果要删除倒数第n个节点，让fast移动n步，然后让fast和slow同时移动，直到fast指向链表末尾。删掉slow所指向的节点就可以了。
 * 定义fast指针和slow指针，初始值为虚拟头结点。
 * fast首先走n + 1步 ，为什么是n+1呢，因为只有这样同时移动的时候slow才能指向删除节点的上一个节点（方便做删除操作）。
 * fast和slow同时移动，直到fast指向末尾。
 * 删除slow指向的下一个节点。
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
