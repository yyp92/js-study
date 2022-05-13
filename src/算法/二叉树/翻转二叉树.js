const BaseBinaryTree = require('./baseBinaryTree')
/**
 * 翻转二叉树
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
 * 思路：
 *  注意只要把每一个节点的左右孩子翻转一下，就可以达到整体翻转的效果。
 *  这道题目使用前序遍历和后序遍历都可以，唯独中序遍历不方便，因为中序遍历会把某些节点的左右孩子翻转了两次！建议拿纸画一画，就理解了。
 *  那么层序遍历可以不可以呢？依然可以的！只要把每一个节点的左右孩子翻转一下的遍历方式都是可以的。
 * 
 * 方法：
 *  递归法： 
 *      1. 确定递归函数的参数和返回值： 参数就是要传入节点的指针，不需要其他参数了，通常此时定下来主要参数，如果在写递归的逻辑中发现还需要其他参数的时候，随时补充。
 *      2. 确定终止条件：当前节点为空的时候，就返回
 *      3. 确定单层递归的逻辑：因为是先前序遍历，所以先进行交换左右孩子节点，然后反转左子树，反转右子树。
 *  迭代法：
 *      深度优先遍历 
 *      广度优先遍历（层级遍历）
 * 
 * 总结：
 *  针对翻转二叉树，三种迭代（两种模拟深度优先遍历，一种层序遍历）的写法。
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