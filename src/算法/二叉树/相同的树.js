/**
 * 100.相同的树
 * https://leetcode.cn/problems/same-tree/
 * 
 * 给定两个二叉树，编写一个函数来检验它们是否相同。
 * 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
 * https://code-thinking-1253855093.file.myqcloud.com/pics/20210726172932.png
 */

// 递归法
var isSameTree = function (p, q) {
    // tree1，tree2都为空，对称，返回true
    if (p == null && q == null) return true;

    // tree1为空 || tree2为空 || tree1 !== tree2
    if (p == null || q == null || p.val != q.val) return false;

    // 此时就是：左右节点都不为空，且数值相同的情况
    // 此时才做递归，做下一层的判断
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// 迭代法
var isSameTree = (p, q) => {
    const queue = [{ p, q }];
    // 这是用{ } 解决了null的问题！
    while (queue.length) {
        const cur = queue.shift();

        // 若p的节点与q的节点都为空
        if (cur.p == null && cur.q == null) continue;

        // 若p的节点与q的节点有一个为空或p的节点的值与q节点不同
        if (cur.p == null || cur.q == null || cur.p.val != cur.q.val) return false;
        
        queue.push({
            p: cur.p.left,
            q: cur.q.left
        }, {
            p: cur.p.right,
            q: cur.q.right
        });
    }
    
    return true;
}