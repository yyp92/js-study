/**
 * 移除链表元素
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
 * 输出：[]
 */

// js数组转为链表
const transformListNode = (arr, start = 0) => {
    if (!arr.length) {
        return []
    }

    if (start === arr.length) {
        return null
    }

    var node = {
        value: arr[start],
        next: null
    }

    var rest = transformListNode(arr, start + 1)
    node.next = rest

    return node
}

 var removeElements = function(head, val) {
    const ret = transformListNode(head);
    let cur = ret

    while(cur.next) {
        if (cur.next.val === val) {
            cur.next =  cur.next.next;
            continue;
        }

        cur = cur.next;
    }

    console.log('==', cur)

    return ret.next ? JSON.stringify(ret.next) : [];
};

// 测试
const head = [1,2,6,3,4,5,6], val = 6
const head1 = [], val1 = 1
const head2 = [7,7,7,7], val2 = 7
console.log(removeElements(head, val))
// console.log(removeElements(head1, val1))
// console.log(removeElements(head2, val2))

   