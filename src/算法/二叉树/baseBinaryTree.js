/**
 * 根据数组创建二叉树
 */

const BaseBinaryTree = function() {
    // 初始化根节点
    this.root = null;

    function TreeNode(value, left, right) {
        this.value = (value === undefined ? 0 : value)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }

    // 创建二叉树
    BaseBinaryTree.prototype.create = function(arr) {
        this.root = new TreeNode(arr[0])
        let nodes = [this.root]
        let i = 1

        if (arr.length <= 1) {
            return this.root
        }

        for (let node of nodes) {
            nodes.push(node.left = arr[i] ? new TreeNode(arr[i]) : null)
            i++

            nodes.push(node.right = arr[i] ? new TreeNode(arr[i]) : null)
            i++

            if (i === arr.length) {
                return this.root
            }
        }
    }
}

module.exports = BaseBinaryTree