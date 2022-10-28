/**
 * 1382.将二叉搜索树变平衡
 * https://leetcode.cn/problems/balance-a-binary-search-tree/
 * 
 * 给你一棵二叉搜索树，请你返回一棵 平衡后 的二叉搜索树，新生成的树应该与原来的树有着相同的节点值。
 * 如果一棵二叉搜索树中，每个节点的两棵子树高度差不超过 1 ，我们就称这棵二叉搜索树是 平衡的 。
 * 如果有多种构造方法，请你返回任意一种。
 * 
 * 示例：
 *  https://code-thinking-1253855093.file.myqcloud.com/pics/20210726154512.png
 *  输入：root = [1,null,2,null,3,null,4,null,null]
 *  输出：[2,1,3,null,null,null,4]
 *  解释：这不是唯一的正确答案，[3,1,4,null,2,null,null] 也是一个可行的构造方案。
 * 
 * 提示：
 *  树节点的数目在 1 到 10^4 之间。
 *  树节点的值互不相同，且在 1 到 10^5 之间。
 */

var balanceBST = function(root) {
    const res = [];

    // 中序遍历转成有序数组
    const travesal = cur => {
        if(!cur) return;
        travesal(cur.left);
        res.push(cur.val);
        travesal(cur.right);
    }

    // 有序数组转成平衡二叉树
    const getTree = (nums, left, right) => {
        if (left > right) return null;

        let mid = Math.floor(left + (right - left) / 2);
        // 中心位置作为当前节点的值
        let root = new TreeNode(nums[mid]);
        // 递归地将区间[left,mid−1] 作为当前节点的左子树
        root.left = getTree(nums, left, mid - 1);
        // 递归地将区间[mid+1,right] 作为当前节点的左子树
        root.right = getTree(nums, mid + 1, right);

        return root;
    }

    travesal(root);
    return getTree(res, 0, res.length - 1);
}