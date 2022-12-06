const BaseBinaryTreeExtendProps = require('./baseBinaryTreeExtendProps')
/**
 * 二叉树的最大深度
 * https://leetcode.cn/problems/maximum-depth-of-binary-tree/
 * 
 * 相关题目
 *  559.n叉树的最大深度
 * 
 * 
 * 给定一个二叉树，找出其最大深度。
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
 * 说明: 叶子节点是指没有子节点的节点。
 * 示例： 给定二叉树 [3,9,20,null,null,15,7]，
 * 返回它的最大深度 3 。
 */

/**
 * 递归法
 * 
 * 本题可以使用前序（中左右），也可以使用后序遍历（左右中），使用前序求的就是深度，使用后序求的是高度。
 * 而根节点的高度就是二叉树的最大深度，所以本题中我们通过后序求的根节点高度来求的二叉树最大深度。
 * 
 * 后序遍历（左右中）来计算树的高度：
 *  1.确定递归函数的参数和返回值
 *      参数就是传入树的根节点，返回就返回这棵树的深度，所以返回值为int类型。
 *  2.确定终止条件
 *      如果为空节点的话，就返回0，表示高度为0。
 *  3.确定单层递归的逻辑
 *      先求它的左子树的深度，再求的右子树的深度，最后取左右深度最大的数值 再+1 （加1是因为算上当前中间节点）就是目前节点为根节点的树的深度。
 * 
 * 
 * 本题当然也可以使用前序，代码如下：(充分表现出求深度回溯的过程)
 * 可以看出使用了前序（中左右）的遍历顺序，这才是真正求深度的逻辑！
 */
 const maxdepth = function(root) {
    // 使用递归的方法 递归三部曲
    // 1. 确定递归函数的参数和返回值
    const getdepth = function(node) {
        // 2. 确定终止条件
        if (node === null) {
            return 0;
        }

        // 3. 确定单层逻辑
        let leftdepth = getdepth(node.left);
        let rightdepth = getdepth(node.right);
        let depth = 1 + Math.max(leftdepth, rightdepth);

        return depth;
    }

    return getdepth(root);
};

/**
 * 迭代法
 * 
 * 使用迭代法的话，使用层序遍历是最为合适的，因为最大的深度就是二叉树的层数，和层序遍历的方式极其吻合。
 * 在二叉树中，一层一层的来遍历二叉树，记录一下遍历的层数就是二叉树的深度。
 */
const maxDepth = function(root) {
    if (!root) return 0
    let count = 0
    const queue = [root]

    while(queue.length) {
        let size = queue.length
        /* 层数+1 */
        count++

        while(size--) {
            let node = queue.shift();
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
    }

    return count
};




// 测试
const arr = [3,9,20,null,null,15,7]
const baseBinaryTreeExtendProps = new BaseBinaryTreeExtendProps()
console.log(maxdepth(baseBinaryTreeExtendProps.create(arr)))
console.log(maxDepth(baseBinaryTreeExtendProps.create(arr)))