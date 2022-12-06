const BaseBinaryTreeExtendProps = require('./baseBinaryTreeExtendProps')
/**
 * 二叉树的最小深度
 * https://leetcode.cn/problems/minimum-depth-of-binary-tree/
 * 
 * 题意：
 *  给定一个二叉树，找出其最小深度。
 *  最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
 * 
 * 说明: 叶子节点是指没有子节点的节点。
 * 
 * 示例:
 *  给定二叉树 [3,9,20,null,null,15,7],
 *  返回它的最小深度 2
 * 
 */

// 递归法
const minDepth = function(root) {
    if (!root) return 0;

    // 到叶子节点 返回 1
    if (!root.left && !root.right) return 1;

    // 只有右节点时 递归右节点
    if (!root.left) return 1 + minDepth(root.right);

    // 只有左节点时 递归左节点
    if (!root.right) return 1 + minDepth(root.left);

    // 左右节点都存在
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};

// 迭代法
const minDepth1 = function(root) {
    if (!root) return 0;
    const queue = [root];
    let dep = 0;

    while(queue.length) {
        let size = queue.length;
        dep++;

        while(size--) {
            const node = queue.shift();
            // 到第一个叶子节点 返回 当前深度 
            if (!node.left && !node.right) return dep;

            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
    }
};



// 测试
const arr = [3,9,20,null,null,15,7]
const baseBinaryTreeExtendProps = new BaseBinaryTreeExtendProps()
console.log(minDepth(baseBinaryTreeExtendProps.create(arr)))
console.log(minDepth1(baseBinaryTreeExtendProps.create(arr)))