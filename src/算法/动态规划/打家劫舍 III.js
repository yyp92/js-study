/**
 * 337.打家劫舍 III
 * https://leetcode.cn/problems/house-robber-iii/
 * 
 * 在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为“根”。 除了“根”之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。
 * 计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。
 * https://img-blog.csdnimg.cn/20210223173849619.png
 * 
 * 时间复杂度：O(n)，每个节点只遍历了一次
 * 空间复杂度：O(log n)，算上递推系统栈的空间
 */

 const rob = root => {
    /**
     * * dp数组（dp table）以及下标的含义：下标为0记录不偷该节点所得到的的最大金钱，下标为1记录偷该节点所得到的的最大金钱。
     * * 所以本题dp数组就是一个长度为2的数组！
     */

    // 后序遍历函数
    const postOrder = node => {
        // 递归出口
        if (!node) return [0, 0];

        // 遍历左子树
        const left = postOrder(node.left);
        // 遍历右子树
        const right = postOrder(node.right);

        // 不偷当前节点，左右子节点都可以偷或不偷，取最大值
        const DoNot = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
        // 偷当前节点，左右子节点只能不偷
        const Do = node.val + left[0] + right[0];

        // [不偷，偷]
        return [DoNot, Do];
    };
    
    const res = postOrder(root);
    
    // 返回最大值
    return Math.max(...res);
}