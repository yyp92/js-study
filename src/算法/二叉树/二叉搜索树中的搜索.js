/**
 * 700.二叉搜索树中的搜索
 * https://leetcode.cn/problems/search-in-a-binary-search-tree/
 * 
 * 给定二叉搜索树（BST）的根节点和一个值。 你需要在BST中找到节点值等于给定值的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 NULL。
 * 例如:
 *  https://img-blog.csdnimg.cn/20210204155522476.png
 * 
 * 在上述示例中，如果要找的值是 5，但因为没有节点值为 5，我们应该返回 NULL。
 */

// 递归法
const searchBST = function (root, val) {
    // 如果root为空，或者找到这个数值了，就返回root节点。
    if (!root || root.val === val) {
        return root;
    }

    // 如果root->val > val，搜索左子树
    if (root.val > val) {
        return searchBST(root.left, val);
    }
    
    // 如果root->val < val，就搜索右子树
    if (root.val < val) {
        return searchBST(root.right, val);
    }
}


// 迭代法
const searchBST1 = function (root, val) {
    while(root !== null) {
        // 左子树
        if (root.val > val) {
            root = root.left;
        }
        // 右子树
        else if (root.val < val) {
            root = root.right;
        }
        else {
            return root;
        }
    }

    return null;
}