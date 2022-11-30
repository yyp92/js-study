/**
 * 142.环形链表II
 * https://leetcode.cn/problems/linked-list-cycle-ii/
 * 
 * 题意： 
 *  给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
 *  为了表示给定链表中的环，使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。
 *  说明：不允许修改给定的链表。
 * 
 */

// 两种循环实现方式
// 先判断是否是环形链表
var detectCycle = function(head) {
    if (!head || !head.next) return null;
    let slow = head.next
    let fast = head.next.next;

    // 判断是否有环
    while (fast && fast.next && fast !== slow) {
        slow = slow.next;
        fast = fast.next.next; 
    }
    // 无环
    if (!fast || !fast.next ) return null;
    slow = head;

    // 判断交叉点
    while (fast !== slow) {
        slow = slow.next;
        fast = fast.next;
    }

    return slow;
};

var detectCycle = function(head) {
    if(!head || !head.next) return null;
    let slow =head.next, fast = head.next.next;
    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if(fast == slow) {
            slow = head;
            while (fast !== slow) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;
        }
    }
    return null;
};