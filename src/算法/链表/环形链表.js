/**
 * 环形链表II
 * 
 * 题意： 
 *  给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
 *  为了表示给定链表中的环，使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。
 *  说明：不允许修改给定的链表。
 * 
 * 思路：
 *  主要考察两知识点：
 *      判断链表是否环
 *      如果有环，如何找到这个环的入口
 * 
 * 判断链表是否有环
 *  可以使用快慢指针法，分别定义 fast 和 slow 指针，从头结点出发，fast指针每次移动两个节点，slow指针每次移动一个节点，如果 fast 和 slow指针在途中相遇 ，说明这个链表有环。
 *  为什么fast 走两个节点，slow走一个节点，有环的话，一定会在环内相遇呢，而不是永远的错开呢
 *  首先第一点：fast指针一定先进入环中，如果fast指针和slow指针相遇的话，一定是在环中相遇，这是毋庸置疑的。
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