/**
 * 创建多叉树
 */

const CreateMoreTree = function() {
    // 初始化根节点
    this.root = null;

    function TreeNode(data) {
        this.data = data
        this.children = []
    }

    CreateMoreTree.prototype.createTreeNode = function(value) {
        return new TreeNode(value)
    }
    
    CreateMoreTree.prototype.create = function(value) {
        const node = new TreeNode(value)

        if (!this.root) {
            this.root = node
        }

        return this.root
    }
}

module.exports = CreateMoreTree