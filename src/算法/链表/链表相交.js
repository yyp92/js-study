/**
 * 链表相交
 * 
 * 思路：
 * 简单来说，就是求两个链表交点节点的指针。 这里同学们要注意，交点不是数值相等，而是指针相等。
 * 我们求出两个链表的长度，并求出两个链表长度的差值，然后让curA移动到，和curB 末尾对齐的位置。
 * 此时我们就可以比较curA和curB是否相同，如果不相同，同时向后移动curA和curB，如果遇到curA == curB，则找到交点。
 * 否则循环退出返回空指针。
 * 
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