/**
 * 257.二叉树的所有路径
 * https://leetcode.cn/problems/binary-tree-paths/
 * 
 * 给定一个二叉树，返回所有从根节点到叶子节点的路径。
 * 说明: 叶子节点是指没有子节点的节点。
 * 示例:
 *  https://img-blog.csdnimg.cn/2021020415161576.png
 * 
 * 前序遍历以及回溯的过程如图：
 *  https://img-blog.csdnimg.cn/20210204151702443.png
 */

// 递归
const binaryTreePaths = function(root) {
    // 递归遍历+递归三部曲
    let res = [];

    // 1. 确定递归函数 函数参数
    const getPath = function(node, curPath) {
        // 2. 确定终止条件，到叶子节点就终止
        if (node.left === null && node.right === null) {
            curPath += node.val;
            res.push(curPath);
            return;
        }

        // 3. 确定单层递归逻辑
        curPath += node.val + '->';
        node.left && getPath(node.left, curPath);
        node.right && getPath(node.right, curPath);
    }

    getPath(root, '');
    return res;
};

// 迭代法
const binaryTreePaths1 = function(root) {
    if (!root) return [];

    const stack = [root]
    const paths = [''] 
    const res = [];

    while (stack.length) {
        const node = stack.pop();
        let path = paths.pop();

        // 到叶子节点终止, 添加路径到结果中
        if (!node.left && !node.right) {
            res.push(path + node.val);
            continue;
        }
        
        path += node.val + '->';

        // 右节点存在
        if (node.right) {
            stack.push(node.right);
            paths.push(path);
        }

        // 左节点存在
        if (node.left) {
            stack.push(node.left);
            paths.push(path);
        }
    }

    return res;
};  