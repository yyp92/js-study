/**
 * 平衡二叉树
 * 
 * 
 * 这里强调一波概念：
 *  二叉树节点的深度：指从根节点到该节点的最长简单路径边的条数。
 *  二叉树节点的高度：指从该节点到叶子节点的最长简单路径边的条数。
 * 
 * 因为求深度可以从上到下去查 所以需要前序遍历（中左右），而高度只能从下到上去查，所以只能后序遍历（左右中）
 */

// 递归
const isBalanced = function(root) {
    // 还是用递归三部曲 + 后序遍历 左右中 当前左子树右子树高度相差大于1就返回-1
    // 1. 确定递归函数参数以及返回值
    const getDepth = function(node) {
        // 2. 确定递归函数终止条件
        if (node === null) return 0;

        // 3. 确定单层递归逻辑
        let leftDepth = getDepth(node.left); // 左子树高度
        // 当判定左子树不为平衡二叉树时,即可直接返回-1
        if (leftDepth === -1) return -1;

        let rightDepth = getDepth(node.right); // 右子树高度
        // 当判定右子树不为平衡二叉树时,即可直接返回-1
        if (rightDepth === -1) return -1;

        if (Math.abs(leftDepth - rightDepth) > 1) {
            return -1;
        }
        else {
            return 1 + Math.max(leftDepth, rightDepth);
        }
    }

    return !(getDepth(root) === -1);
};


// 迭代 - 复杂度增加，此处不是很好的选择
// 获取当前节点的高度
const getHeight = function (curNode) {
    let queue = [];
    if (curNode !== null) queue.push(curNode); // 压入当前元素
    let depth = 0, res = 0;
    while (queue.length) {
        let node = queue[queue.length - 1]; // 取出栈顶
        if (node !== null) {
            queue.pop();
            queue.push(node);   // 中
            queue.push(null);
            depth++;
            node.right && queue.push(node.right);   // 右
            node.left && queue.push(node.left);     // 左
        } else {
            queue.pop();
            node = queue[queue.length - 1];
            queue.pop();
            depth--;
        }
        res = res > depth ? res : depth;
    }
    return res;
}
const isBalanced1 = function (root) {
    if (root === null) return true;
    let queue = [root];
    while (queue.length) {
        let node = queue[queue.length - 1]; // 取出栈顶
        queue.pop();    
        if (Math.abs(getHeight(node.left) - getHeight(node.right)) > 1) {
            return false;
        }
        node.right && queue.push(node.right);
        node.left && queue.push(node.left);
    }
    return true;
};