/**
 * 968.监控二叉树
 * https://leetcode.cn/problems/binary-tree-cameras/
 * 困难级别
 * 
 * 给定一个二叉树，我们在树的节点上安装摄像头。
 * 节点上的每个摄影头都可以监视其父对象、自身及其直接子对象。
 * 计算监控树的所有节点所需的最小摄像头数量。
 * 
 * 示例 1：
 *  https://img-blog.csdnimg.cn/20201229175736596.png
 *  输入：[0,0,null,0,0]
 *  输出：1
 *  解释：如图所示，一台摄像头足以监控所有节点。
 * 
 * 示例 2：
 *  https://img-blog.csdnimg.cn/2020122917584449.png
 *  输入：[0,0,null,0,null,0,null,null,0]
 *  输出：2
 *  解释：需要至少两个摄像头来监视树的所有节点。 上图显示了摄像头放置的有效位置之一。
 * 
 * 提示：
 *  给定树的节点数的范围是 [1, 1000]。
 *  每个节点的值都是 0。
 */

// 分别有三个数字来表示：
/**
 * * 0：该节点无覆盖
 * * 1：本节点有摄像头
 * * 2：本节点有覆盖
 */
const minCameraCover = function(root) {
    let result = 0

    function traversal(cur) {
        // 空节点，该节点有覆盖
        if (cur === null) {
            return 2
        }

        // 左
        let left = traversal(cur.left)
        // 右
        let right = traversal(cur.right)

        // 中
        // * 情况1
        // 左右节点都有覆盖
        if (left === 2 && right === 2) {
            return 0
        }

        /**
         * * 情况2
         * * 左右节点至少有一个为无覆盖
         * 
         * left == 0 && right == 0 左右节点无覆盖
         * left == 1 && right == 0 左节点有摄像头，右节点无覆盖
         * left == 0 && right == 1 左节点有无覆盖，右节点摄像头
         * left == 0 && right == 2 左节点无覆盖，右节点覆盖
         * left == 2 && right == 0 左节点覆盖，右节点无覆盖
         */
        if (left === 0 || right === 0) {
            result++
            return 1
        }

        /**
         * * 情况3
         * * 左右节点至少有一个有摄像头
         * 
         * left == 1 && right == 2 左节点有摄像头，右节点有覆盖
         * left == 2 && right == 1 左节点有覆盖，右节点有摄像头
         * left == 1 && right == 1 左右节点都有摄像头
         */
        if (left === 1 || right === 1) {
            return 2
        }

        // 以上代码我没有使用else，主要是为了把各个分支条件展现出来，这样代码有助于读者理解
        // 这个 return -1 逻辑不会走到这里。
        return -1
    }

    // * 情况4
    // root 无覆盖
    if (traversal(root) === 0) {
        result++
    }

    return result             
}