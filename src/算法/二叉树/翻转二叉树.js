const BaseBinaryTree = require('./baseBinaryTree')
/**
 * 翻转二叉树
 * https://leetcode.cn/problems/invert-binary-tree/
 * 
 * 翻转一棵二叉树
 * 
 * 输入：
 *          4
 *        /   \
 *       2     7
 *      / \   / \
 *     1   3 6   9
 * 
 * 输出：
 *          4
 *        /   \
 *       7     2
 *      / \   / \
 *     9   6 3   1
 * 
 */

// 使用递归版本的前序遍历
const invertTree = function(root) {
    // 首先使用递归版本的前序遍历实现二叉树翻转
    // 交换节点函数
    const inverNode = function(left, right) {
        let temp = left;
        left = right;
        right = temp;

        // 需要重新给root赋值一下
        root.left = left;
        root.right = right;
    }

    // 确定递归函数的参数和返回值inverTree=function(root)
    // 确定终止条件
    if (root === null) {
        return root;
    }

    // 确定节点处理逻辑 交换
    inverNode(root.left, root.right);
    invertTree(root.left);
    invertTree(root.right);

    return root;
};

// 使用迭代版本(统一模板))的前序遍历
const invertTree1 = function(root) {
    // 我们先定义节点交换函数
    const invertNode = function(root, left, right){
        const temp = left;
        left = right;
        right = temp;
        root.left = left;
        root.right = right;
    }

    // 使用迭代方法的前序遍历 
    const stack = [];

    if (root === null) {
        return root;
    }

    stack.push(root);

    while (stack.length) {
        let node = stack.pop();
        
        if (node !== null) {
            // 前序遍历顺序中左右  入栈顺序是前序遍历的倒序右左中
            node.right && stack.push(node.right);
            node.left && stack.push(node.left);
            stack.push(node);
            stack.push(null);
        }
        else {
            node = stack.pop();
            // 节点处理逻辑
            invertNode(node, node.left, node.right);
        }
    }

    return root;
};

// 使用层序遍历
const invertTree2 = function(root) {
    // 我们先定义节点交换函数
    const invertNode = function(root, left, right){
        let temp = left;
        left = right;
        right = temp;
        root.left = left;
        root.right = right;
    }

    // 使用层序遍历
    const queue = [];
    
    if (root === null) {
        return root;
    } 

    queue.push(root);
    while (queue.length) {
        let length = queue.length;
        while (length--) {
            const node = queue.shift();
            
            // 节点处理逻辑
            invertNode(node, node.left, node.right);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
    }

    return root;
};



// 测试
const list = [4, 2, 7, 1, 3, 6, 9]
const baseBinaryTree = new BaseBinaryTree()
const newTree = baseBinaryTree.create(list)
// console.log('75', newTree)
// console.log(JSON.stringify(invertTree(newTree)))
// console.log(JSON.stringify(invertTree1(newTree)))
console.log(JSON.stringify(invertTree2(newTree)))