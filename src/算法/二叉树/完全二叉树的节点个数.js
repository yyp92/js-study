const BaseBinaryTreeExtendProps = require('./baseBinaryTreeExtendProps')

/**
 * 完全二叉树的节点个数
 * https://leetcode.cn/problems/count-complete-tree-nodes/
 * 
 * 给出一个完全二叉树，求出该树的节点个数。
 * 
 * 示例 1：
 *  输入：root = [1,2,3,4,5,6]
 *  输出：6
 * 
 * 示例 2：
 *  输入：root = []
 *  输出：0
 * 
 * 示例 3：
 *  输入：root = [1]
 *  输出：1
 * 
 * 提示：
 *  树中节点的数目范围是[0, 5 * 10^4]
 *  0 <= Node.val <= 5 * 10^4
 *  题目数据保证输入的树是 完全二叉树
 */

// 递归法
// 时间复杂度：O(n)
// 空间复杂度：O(log n)
const countNodes = function(root) {
    // 递归法计算二叉树节点数
    // 1. 确定递归函数参数
    const getNodeSum = function(node){
        // 2. 确定终止条件
        if (node === null) {
            return 0;
        }

        // 3. 确定单层递归逻辑
        let leftNum = getNodeSum(node?.left);
        let rightNum = getNodeSum(node?.right);

        return leftNum + rightNum + 1;
    }

    return getNodeSum(root);
};


// 迭代法
// 时间复杂度：O(n)
// 空间复杂度：O(n)
const countNodes1 = function(root) {
    // 层序遍历
    let queue = [];
    if (root === null) {
        return 0;
    }

    queue.push(root);
    let nodeNums = 0;

    while(queue.length) {
        let length = queue.length;

        while(length--) {
            let node = queue.shift();
            nodeNums++;
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
    }

    return nodeNums;
};


// 完全二叉树
// 时间复杂度：O(log n × log n)
// 空间复杂度：O(log n)
const countNodes2 = function(root) {
    // 利用完全二叉树的特点
    if (root === null) {
        return 0;
    }

    let left = root.left;
    let right = root.right;
    let leftHeight = 0, rightHeight = 0;

    while(left) {
        left = left.left;
        leftHeight++;
    }

    while(right) {
        right = right.right;
        rightHeight++;
    }

    if (leftHeight == rightHeight) {
        return Math.pow(2, leftHeight + 1) - 1;
    }

    return countNodes2(root.left) + countNodes2(root.right) + 1;
};



// 测试
const bstsTree = new BaseBinaryTreeExtendProps();
const root1 = [1,2,3,4,5,6, null] // 6
const root2 = [] // 0
const root3 = [1] // 1

console.log(countNodes(bstsTree.create(root1)))
// console.log(countNodes(bstsTree.create(root2)))
// console.log(countNodes(bstsTree.create(root3)))