/**
 * 530.二叉搜索树的最小绝对差
 * https://leetcode.cn/problems/minimum-absolute-difference-in-bst/
 * 
 * 给你一棵所有节点为非负值的二叉搜索树，请你计算树中任意两节点的差的绝对值的最小值。
 * 示例：
 *  https://img-blog.csdnimg.cn/20201014223400123.png
 * 
 * 提示：树中至少有 2 个节点。
 */

// 递归 先转换为有序数组
const getMinimumDifference = function (root) {
    let arr = [];
    const buildArr = (root) => {
        if (root) {
            buildArr(root.left);
            arr.push(root.val);
            buildArr(root.right);
        }
    }
    buildArr(root);

    let diff = arr[arr.length - 1];
    for (let i = 1; i < arr.length; i++) {
        if (diff > arr[i] - arr[i - 1]) {
            diff = arr[i] - arr[i - 1];
        }
    }

    return diff;
}

// 递归 在递归的过程中更新最小值
const getMinimumDifference1 = function(root) {
    let res = Infinity
    let preNode = null

    // 中序遍历
    const inorder = (node) => {
        if (!node) return

        inorder(node.left)

        // 更新res
        if (preNode) res = Math.min(res, node.val - preNode.val)
        // 记录前一个节点         
        preNode = node

        inorder(node.right)
    }

    inorder(root)
    return res
}

// 迭代 中序遍历
const getMinimumDifference2 = function(root) {
    let stack = []
    let cur = root
    let res = Infinity
    let pre = null

    while(cur || stack.length) {
        // 指针来访问节点，访问到最底层
        if (cur) {
            // 将访问的节点放进栈
            stack.push(cur)

            // 左
            cur = cur.left
        }
        else {
            cur = stack.pop()

            // 中
            if (pre) res = Math.min(res, cur.val - pre.val)
            pre = cur

            // 右
            cur = cur.right
        }
    }

    return res
}