/**
 * 701.二叉搜索树中的插入操作
 * https://leetcode.cn/problems/insert-into-a-binary-search-tree/
 * 
 * 给定二叉搜索树（BST）的根节点和要插入树中的值，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。 输入数据保证，新值和原始二叉搜索树中的任意节点值都不同。
 * 注意，可能存在多种有效的插入方式，只要树在插入后仍保持为二叉搜索树即可。 你可以返回任意有效的结果。
 * https://img-blog.csdnimg.cn/20201019173259554.png
 * 
 * 提示：
 *  给定的树上的节点数介于 0 和 10^4 之间
 *  每个节点都有一个唯一整数值，取值范围从 0 到 10^8
 *  -10^8 <= val <= 10^8
 *  新值和原始二叉搜索树中的任意节点值都不同
 */

// 有返回值的递归写法
var insertIntoBST = function (root, val) {
    const setInOrder = (root, val) => {
        // 创建新的节点
        if (root === null) {
            let node = new TreeNode(val);
            return node;
        }

        if (root.val > val) {
            root.left = setInOrder(root.left, val);
        }  
        else if (root.val < val) {
            root.right = setInOrder(root.right, val);
        }
        else {
            return root;
        }
    }

    return setInOrder(root, val);
};

// 无返回值的递归
// 没有返回值，需要记录上一个节点（parent），遇到空节点了，就让parent左孩子或者右孩子指向新插入的节点。然后结束递归。
var insertIntoBST = function (root, val) {
    let parent = new TreeNode(0);

    if (root === null) {
        root = new TreeNode(val);
    }

    const preOrder = (cur, val) => {
        if (cur === null) {
            let node = new TreeNode(val);
            if (parent.val > val) {
                parent.left = node;
            } else {
                parent.right = node;
            }
                
            return;
        }

        parent = cur;
        if (cur.val > val) {
            preOrder(cur.left, val);
        } else if (cur.val < val) {
            preOrder(cur.right, val);
        }
    }

    preOrder(root, val);
    return root;
};


// 迭代
var insertIntoBST = function (root, val) {
    if (root === null) {
        root = new TreeNode(val);
    }
    else {
        // 这个很重要，需要记录上一个节点，否则无法赋值新节点
        let parent = new TreeNode(0);
        let cur = root;

        // 找到目标节点
        while (cur) {
            parent = cur;
            if (cur.val > val) {
                cur = cur.left;
            }
            else {
                cur = cur.right;
            }
        }

        let node = new TreeNode(val);
        if (parent.val > val) {
            parent.left = node;
        }  
        else {
            parent.right = node;
        }
    }
    
    return root;
};