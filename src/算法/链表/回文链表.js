/**
 * 234.回文链表
 * https://leetcode.cn/problems/palindrome-linked-list/
 * 
 * 请判断一个链表是否为回文链表。
 * 
 * 示例 1:
 *  输入: 1->2
 *  输出: false
 * 
 * 示例 2:
 *  输入: 1->2->2->1
 *  输出: true
 */
 var isPalindrome = function(head) {
    // 反转链表
    const reverseList = cur => {
        let temp = null;
        let pre = null;

        while(cur != null) {
            // 保存一下 cur的下一个节点，因为接下来要改变cur->next
            temp = cur.next;
            // 翻转操作
            cur.next = pre;
            // 更新pre 和 cur指针
            pre = cur;
            cur = temp;
        }

        return pre;
    }
    
    // 如果为空或者仅有一个节点，返回true
    if (!head && !head.next) return true;

    // 慢指针，找到链表中间分位置，作为分割
    let slow = head;
    let fast = head;
    // 记录慢指针的前一个节点，用来分割链表
    let pre = head;

    while(fast != null && fast.next != null) {
        pre = slow; // 记录slow的前一个结点
        slow = slow.next;
        fast = fast.next.next;
    }

    // 分割两个链表
    pre.next = null; 
    // 前半部分
    let cur1 = head;
    // 后半部分。这里使用了反转链表
    let cur2 = reverseList(slow);

    while(cur1 != null) {
        if(cur1.val != cur2.val) return false;
        // 注意要移动两个结点
        cur1 = cur1.next;
        cur2 = cur2.next;
    }

    return true;
};