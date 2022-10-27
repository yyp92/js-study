/**
 * 450.删除二叉搜索树中的节点
 * https://leetcode.cn/problems/delete-node-in-a-bst/
 * 
 * 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。
 * 一般来说，删除节点可分为两个步骤：
 * 首先找到需要删除的节点； 如果找到了，删除它。 说明： 要求算法时间复杂度为 $O(h)$，h 为树的高度。
 * 
 * 示例:
 *  https://img-blog.csdnimg.cn/20201020171048265.png
 */

// 递归
function getMinNode(root) {
    while (root.left) {
        root = root.left;
    }

    return root;
}

var deleteNode = function(root, key) {
    if (!root) return null;

    if (key > root.val) {
        root.right = deleteNode(root.right, key);
        return root;
    } 
    else if (key < root.val) {
        root.left = deleteNode(root.left, key);
        return root;
    } 
    else {
        // 第一种情况：没找到删除的节点，遍历到空节点直接返回了
        if (root === null) return root; 

        // 第二种情况：左右孩子都为空（叶子节点），直接删除节点， 返回NULL为根节点
        if (!root.left && !root.right) {
            return null
        }
        // 第三种情况：其左孩子为空，右孩子不为空，删除节点，右孩子补位 ，返回右孩子为根节点
        else if (root.left && !root.right) {
            return root.left;
        } 
        // 第四种情况：其右孩子为空，左孩子不为空，删除节点，左孩子补位，返回左孩子为根节点
        else if (root.right && !root.left) {
            return root.right;
        }

        // 第五种情况：左右孩子节点都不为空，则将删除节点的左子树放到删除节点的右子树的最左面节点的左孩子的位置
        // 并返回删除节点右孩子为新的根节点。
        const rightNode = root.right;
        // 获取最小值节点
        const minNode = getMinNode(rightNode);
        // 将待删除节点的值替换为最小值节点值
        root.val = minNode.val;
        // 删除最小值节点
        root.right = deleteNode(root.right, minNode.val);

        return root;
    }
};


// 迭代 --> 以后在研究？？
var deleteNode = function (root, key) {
    const deleteOneNode = target => {
        if (!target) return target

        if (!target.right) return target.left

        let cur = target.right
        while (cur.left) {
            cur = cur.left
        }
        cur.left = target.left
        return target.right
    }

    if (!root) return root
    let cur = root

    // 记录cur的父节点，用来删除cur
    let pre = null

    while (cur) {
        if (cur.val === key) break
        pre = cur
        cur.val > key ? cur = cur.left : cur = cur.right
    }

    if (!pre) {
        return deleteOneNode(cur)
    }

    if (pre.left && pre.left.val === key) {
        pre.left = deleteOneNode(cur)
    }

    if (pre.right && pre.right.val === key) {
        pre.right = deleteOneNode(cur)
    }

    return root
}
