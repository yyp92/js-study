/**
 * 538.把二叉搜索树转换为累加树
 * https://leetcode.cn/problems/convert-bst-to-greater-tree/
 * 
 * 给出二叉 搜索 树的根节点，该树的节点值各不相同，请你将其转换为累加树（Greater Sum Tree），使每个节点 node 的新值等于原树中大于或等于 node.val 的值之和。
 * 提醒一下，二叉搜索树满足下列约束条件：
 *  节点的左子树仅包含键 小于 节点键的节点。 
 *  节点的右子树仅包含键 大于 节点键的节点。 左右子树也必须是二叉搜索树。
 * 
 * 示例 1：
 *  https://img-blog.csdnimg.cn/20201023160751832.png
 *  输入：[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
 *  输出：[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
 * 
 * 示例 2：
 *  输入：root = [0,null,1]
 *  输出：[1,null,1]
 * 
 * 示例 3：
 *  输入：root = [1,0,2]
 *  输出：[3,3,2]
 * 
 * 示例 4：
 *  输入：root = [3,2,4,1]
 *  输出：[7,9,4,10]
 * 
 * 提示：
 *  树中的节点数介于 0 和 104 之间。
 *  每个节点的值介于 -104 和 104 之间。
 *  树中的所有值 互不相同 。
 *  给定的树为二叉搜索树。
 */

// 递归
var convertBST = function(root) {
    // 记录前一个节点的数值
    let pre = 0;

    // 右中左遍历
    const ReverseInOrder = (cur) => {
        if (cur) {
            // 右
            ReverseInOrder(cur.right);

            // 中
            cur.val += pre;
            pre = cur.val;

            // 左
            ReverseInOrder(cur.left);
        }
    }

    ReverseInOrder(root);
    return root;
}


// 迭代
var convertBST = function (root) {
    // 记录前一个节点的数值
    let pre = 0;
    let cur = root;
    let stack = [];
    while (cur !== null || stack.length !== 0) {
        while (cur !== null) {
            stack.push(cur);

            // 右
            cur = cur.right;
        }

        // 中
        cur = stack.pop();
        cur.val += pre;
        pre = cur.val;
        
        // 左
        cur = cur.left;
    }

    return root;
}