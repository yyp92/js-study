/**
 * 链表相交
 * https://leetcode.cn/problems/intersection-of-two-linked-lists-lcci/
 */

// 获取链表长度
var getListLen = function(head) {
    let len = 0, cur = head;

    while(cur) {
       len++;
       cur = cur.next;
    }

    return len;
} 

var getIntersectionNode = function(headA, headB) {
    let curA = headA
    let curB = headB
    let lenA = getListLen(headA)
    let lenB = getListLen(headB)

    if (lenA < lenB) {
        // 下面交换变量注意加 “分号” ，两个数组交换变量在同一个作用域下时
        // 如果不加分号，下面两条代码等同于一条代码: [curA, curB] = [lenB, lenA]
        [curA, curB] = [curB, curA];
        [lenA, lenB] = [lenB, lenA];
    }

    let i = lenA - lenB;
    while (i-- > 0) {
        curA = curA.next;
    }
    while (curA && curA !== curB) {
        curA = curA.next;
        curB = curB.next;
    }

    return curA;
};