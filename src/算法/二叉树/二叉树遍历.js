
const BinarySearchTree = require('./binarySearchTree')
/**
 * 递归法
 */

// 前序遍历
const preorderTraversal = (root) => {
    let res = [];

    const dfs = function(root) {
        if (root === null) return;

        // 先序遍历所以从父节点开始
        res.push(root.value);

        // 递归左子树
        dfs(root.left);

        // 递归右子树
        dfs(root.right);
    }

    // 只使用一个参数 使用闭包进行存储结果
    dfs(root);

    return res;
};

// 中序遍历
const inorderTraversal = (root) => {
    let res = [];

    const dfs = function(root) {
        if (root === null) return;

        // 递归左子树
        dfs(root.left);

        // 先序遍历所以从父节点开始
        res.push(root.value);

        // 递归右子树
        dfs(root.right);
    }

    // 只使用一个参数 使用闭包进行存储结果
    dfs(root);

    return res;
};

// 后序遍历
const postorderTraversal = (root) => {
    let res = [];

    const dfs = function(root) {
        if (root === null) return;

        // 递归左子树
        dfs(root.left);

        // 递归右子树
        dfs(root.right);

        // 先序遍历所以从父节点开始
        res.push(root.value);
    }

    // 只使用一个参数 使用闭包进行存储结果
    dfs(root);

    return res;
};



/**
 * 迭代法
 */
// 前序遍历
// 入栈 右 -> 左
// 出栈 中 -> 左 -> 右
const preorderTraversal1 = function(root, res = []) {
    // if (!root) return res;
    const stack = [root];
    let cur = null;

    while(stack.length) {
        cur = stack.pop();
        res.push(cur.value);
        cur.right && stack.push(cur.right);
        cur.left && stack.push(cur.left);
    }

    return res;
};

// 中序遍历
// 需要借用指针的遍历来帮助访问节点，栈则用来处理节点上的元素。
// 入栈 左 -> 右
// 出栈 左 -> 中 -> 右
const inorderTraversal1 = function(root, res = []) {
    const stack = [];
    let cur = root;

    while (stack.length || cur) {
        if (cur) {
            stack.push(cur);
            // 左
            cur = cur.left;
        }
        else {
            // --> 弹出 中
            cur = stack.pop();
            res.push(cur.value); 
            // 右
            cur = cur.right;
        }
    }

    return res;
};

// 后序遍历
// 入栈 左 -> 右
// 出栈 中 -> 右 -> 左 结果翻转
const postorderTraversal1 = function(root, res = []) {
    // if (!root) return res;
    
    const stack = [root];
    let cur = null;

    do {
        cur = stack.pop();
        res.push(cur.value);
        cur.left && stack.push(cur.left);
        cur.right && stack.push(cur.right);
    } 
    while(stack.length);

    return res.reverse();
};


/**
 * 统一迭代法
 */
// 前序遍历：中左右
// 压栈顺序：右左中
const preorderTraversal2 = function(root, res = []) {
    const stack = [];
    if (root) stack.push(root);

    while(stack.length) {
        const node = stack.pop();

        if (!node) {
            res.push(stack.pop().value);
            continue;
        }

        if (node.right) stack.push(node.right); // 右
        if (node.left) stack.push(node.left); // 左
        stack.push(node); // 中
        stack.push(null);
    };

    return res;
};

// 前序遍历：左中右
// 压栈顺序：右中左
const inorderTraversal2 = function(root, res = []) {
    const stack = [];
    if (root) stack.push(root);

    while(stack.length) {
        const node = stack.pop();

        if (!node) {
            res.push(stack.pop().value);
            continue;
        }

        if (node.right) stack.push(node.right); // 右
        stack.push(node); // 中
        stack.push(null);
        if (node.left) stack.push(node.left); // 左
    };

    return res;
};

// 前序遍历：左右中
// 压栈顺序：中右左
const postorderTraversal2 = function(root, res = []) {
    const stack = [];
    if (root) stack.push(root);

    while(stack.length) {
        const node = stack.pop();

        if (!node) {
            res.push(stack.pop().value);
            continue;
        }

        stack.push(node); // 中
        stack.push(null);
        if (node.right) stack.push(node.right); // 右
        if (node.left) stack.push(node.left); // 左
    };

    return res;
};




// 测试
const bsts = new BinarySearchTree();
bsts.insert(11)
bsts.insert(7)
bsts.insert(15)
// bsts.insert(5)
// bsts.insert(9)
// bsts.insert(13)
// bsts.insert(20)
// bsts.insert(3)
// bsts.insert(8)
// bsts.insert(10)
// bsts.insert(12)
// bsts.insert(14)
// bsts.insert(18)
// bsts.insert(25)
// bsts.insert(19)
// console.log('bsts: ', JSON.stringify(bsts))
// console.log('前：', preorderTraversal(bsts.root))
// console.log('中：', inorderTraversal(bsts.root))
// console.log('后：', postorderTraversal(bsts.root))
// console.log('迭代法 前：', preorderTraversal1(bsts.root))
// console.log('迭代法 中：', inorderTraversal1(bsts.root))
// console.log('迭代法 后：', postorderTraversal1(bsts.root))
// console.log('统一迭代法 前：', preorderTraversal2(bsts.root))
// console.log('统一迭代法 中', inorderTraversal2(bsts.root))
// console.log('统一迭代法 后', postorderTraversal2(bsts.root))
