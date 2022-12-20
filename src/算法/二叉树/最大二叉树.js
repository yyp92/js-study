/**
 * 654.最大二叉树
 * https://leetcode.cn/problems/maximum-binary-tree/
 * 
 * 给定一个不含重复元素的整数数组。一个以此数组构建的最大二叉树定义如下：
 *  二叉树的根是数组中的最大元素。
 *  左子树是通过数组中最大值左边部分构造出的最大二叉树。
 *  右子树是通过数组中最大值右边部分构造出的最大二叉树。
 *  通过给定的数组构建最大二叉树，并且输出这个树的根节点。
 * 
 * 示例 ：
 *  https://img-blog.csdnimg.cn/20210204154534796.png
 * 
 * 提示：
 *  给定的数组的大小在 [1, 1000] 之间。
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

var constructMaximumBinaryTree = function (nums) {
    // 在左闭右开区间[left, right)，构造二叉树
    const BuildTree = (arr, left, right) => {
        if (left > right) return null;

        // 分割点下标：maxIndex
        let maxValue = -1;
        let maxIndex = -1;
        for (let i = left; i < right; i++) {
            if (arr[i] > maxValue) {
                maxValue = arr[i];
                maxIndex = i;
            }
        }

        let root = new TreeNode(maxValue);

        // 左闭右开：[left, maxIndex)
        root.left = BuildTree(arr, left, maxIndex);
        // 左闭右开：[maxIndex + 1, right)
        root.right = BuildTree(arr, maxIndex + 1, right);

        return root;
    }

    let root = BuildTree(nums, 0, nums.length);
    return root;
}