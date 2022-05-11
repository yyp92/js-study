const BaseBinaryTree = require('./BaseBinaryTree')
/**
 * 二叉树层序遍历
 */
const levelOrder = function(root) {
    // 处理空数组的情况
    if (!root.value) {
        return []
    }

    // 二叉树的层序遍历
    const res = []
    const queue = []
    queue.push(root);

    while(queue.length !== 0 && root !== null) {
        // 记录当前层级节点数
        const length = queue.length;
        // 存放每一层的节点 
        const curLevel = [];

        for (let i = 0; i < length; i++) {
            let node = queue.shift();
            curLevel.push(node.value);
            // 存放当前层下一层的节点
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }

        // 把每一层的结果放到结果数组
        res.push(curLevel);
    }

    return res;
};


/**
 * 二叉树的层次遍历 II
 * 给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
 */
const levelOrderReverse = function(root) {
    // 处理空数组的情况
    if (!root.value) {
        return []
    }

    // 二叉树的层序遍历
    const res = []
    const queue = []
    queue.push(root);

    while(queue.length !== 0 && root !== null) {
        // 记录当前层级节点数
        const length = queue.length;
        // 存放每一层的节点 
        const curLevel = [];

        for (let i = 0; i < length; i++) {
            let node = queue.shift();
            curLevel.push(node.value);
            // 存放当前层下一层的节点
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }

        // 把每一层的结果放到结果数组
        // 从数组前头插入值，避免最后反转数组，减少运算时间
        res.unshift(curLevel);
    }

    return res;
};


/**
 * 二叉树的右视图
 * 
 * 给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
 * 输入：[1, 2, 3, null, 5, null, 4]
 * 输出：[1, 3, 4]
 * 思路：层序遍历的时候，判断是否遍历到单层的最后面的元素，如果是，就放进result数组中，随后返回result就可以了。
 */




// 测试
const bstsTree = new BaseBinaryTree();
const bsts = [3, 9, 20, null, null, 15, 7]
const bsts1 = [1]
const bsts2 = []

console.log(levelOrder(bstsTree.create(bsts)))
// console.log(levelOrder(bstsTree.create(bsts1)))
// console.log(levelOrder(bstsTree.create(bsts2)))

console.log(levelOrderReverse(bstsTree.create(bsts)))
// console.log(levelOrderReverse(bstsTree.create(bsts1)))
// console.log(levelOrderReverse(bstsTree.create(bsts2)))