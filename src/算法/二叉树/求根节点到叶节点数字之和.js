/**
 * 129.求根节点到叶节点数字之和
 * https://leetcode.cn/problems/sum-root-to-leaf-numbers/
 * 
 * 给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
 * 每条从根节点到叶节点的路径都代表一个数字：
 *  例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
 *  计算从根节点到叶节点生成的 所有数字之和 。
 * 
 * 叶节点 是指没有子节点的节点。
 * 
 * 示例1：
 *  输入：root = [1,2,3]
 *  输出：25
 *  解释：
 *      从根到叶子节点路径 1->2 代表数字 12
 *      从根到叶子节点路径 1->3 代表数字 13
 *      因此，数字总和 = 12 + 13 = 25
 * 
 * 示例 2：
 *  输入：root = [4,9,0,5,1]
 *  输出：1026
 *  解释：
 *      从根到叶子节点路径 4->9->5 代表数字 495
 *      从根到叶子节点路径 4->9->1 代表数字 491
 *      从根到叶子节点路径 4->0 代表数字 40
 *      因此，数字总和 = 495 + 491 + 40 = 1026
 */

 var sumNumbers = function(root) {
    const listToInt = path => {
        let sum = 0;

        for (let num of path){
            // sum * 10 表示进位
            sum = sum * 10 + num;
        }

        return sum;
    }

    const recur = root =>{
        if (root.left == null && root.right == null) {
            // 当是叶子节点的时候，开始处理
            res += listToInt(path);
            return;
        }

        // 左节点
        if (root.left != null){
            // 注意有回溯
            path.push(root.left.val);
            recur(root.left);
            path.pop();
        }

        // 右节点
        if (root.right != null){
            // 注意有回溯
            path.push(root.right.val);
            recur(root.right);
            path.pop();
        }

        return;
    };

    const path = new Array();
    let res = 0;
    
    // 如果节点为0，那么就返回0
    if (root == null) return 0;
    // 首先将根节点放到集合中
    path.push(root.val);
    
    // 开始递归
    recur(root);
    
    return res;
};