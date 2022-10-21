/**
 * 513.找树左下角的值
 * 
 * 给定一个二叉树，在树的最后一行找到最左边的值。
 * 示例 1:
 *  https://img-blog.csdnimg.cn/20210204152956836.png
 * 
 * 示例 2:
 *  https://img-blog.csdnimg.cn/20210204153017586.png
 */

// 递归
const findBottomLeftValue = function(root) {
    // 首先考虑递归遍历 前序遍历 找到最大深度的叶子节点即可
    let maxPath = 0, resNode = null;

    // 1. 确定递归函数的函数参数
    const dfsTree = function(node, curPath){
    // 2. 确定递归函数终止条件
        if (node.left === null && node.right === null) {
            if (curPath > maxPath) {
                maxPath = curPath;
                resNode = node.val;
            }
        }

        node.left && dfsTree(node.left, curPath + 1);
        node.right && dfsTree(node.right, curPath + 1);
    }

    dfsTree(root, 1);
    return resNode;
}

// 层序
const findBottomLeftValue1 = function(root) {
    // 考虑层序遍历 记录最后一行的第一个节点
    let queue = [];

    if (root === null) {
        return null;
    }

    queue.push(root);
    let resNode;
    
    while(queue.length) {
        let length =  queue.length;

        for (let i = 0; i < length; i++) {
            let node = queue.shift();

            // 记录最后一行第一个元素
            if (i === 0) {
                resNode = node.val;
            }

            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
    }

    return resNode;
};