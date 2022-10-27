/**
 * 669.修剪二叉搜索树
 * https://leetcode.cn/problems/trim-a-binary-search-tree/
 * 
 * 给定一个二叉搜索树，同时给定最小边界L 和最大边界 R。通过修剪二叉搜索树，使得所有节点的值在[L, R]中 (R>=L) 。你可能需要改变树的根节点，所以结果应当返回修剪好的二叉搜索树的新的根节点。
 * https://img-blog.csdnimg.cn/20201014173115788.png
 * https://img-blog.csdnimg.cn/20201014173219142.png
 */

// 递归
var trimBST = function (root, low, high) { 
    if (root === null) {
        return null;
    }

    // 寻找符合区间[low, high]的节点
    if (root.val < low) {
        let right = trimBST(root.right, low, high);
        return right;
    }

    // 寻找符合区间[low, high]的节点
    if (root.val > high) {
        let left = trimBST(root.left, low, high);
        return left;
    }

    // root->left接入符合条件的左孩子
    root.left = trimBST(root.left, low, high);
    // root->right接入符合条件的右孩子
    root.right = trimBST(root.right, low, high);

    return root;
}


// 迭代
var trimBST = function(root, low, high) {
    if (root === null) {
        return null;
    }

    // 处理头结点，让root移动到[L, R] 范围内，注意是左闭右闭
    while(root !== null && (root.val < low || root.val > high)) {
        // 小于L往右走
        if (root.val < low) {
            root = root.right;
        }
        // 大于R往左走
        else {
            root = root.left;
        }
    }

    let cur = root;
    // 此时root已经在[L, R] 范围内，处理左孩子元素小于L的情况
    while(cur !== null) {
        while(cur.left && cur.left.val < low) {
            cur.left = cur.left.right;
        }
        cur = cur.left;
    }
    
    cur = root;
    // 此时root已经在[L, R] 范围内，处理右孩子大于R的情况
    while(cur !== null) {
        while(cur.right && cur.right.val > high) {
            cur.right = cur.right.left;
        }
        cur = cur.right;
    }
    
    return root;
}