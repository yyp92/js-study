// js 创建树状结构
const BinarySearchTree = function() {
    //初始化根节点
    this.root = null;

    // 节点元素
    function Node(value) {
        /**
         * value: 用来保存值的大小
         * left: 用来表示左子树
         * right: 用来表示右字数
         */
        this.value = value
        this.left = null;
        this.right = null;
    }

    // 插入递归操作
    function insertNode(oldNode, newNode) {
        // 1. 判断是在左节点还是在右节点
        if (newNode.value < oldNode.value) {
            // 2. 判断左节点是否为null
            if (oldNode.left === null) {
                // 为null时，直接添加在后面
                oldNode.left = newNode;
            }
            else {
                // 不为null，则需要重新递归
                insertNode(oldNode.left, newNode)
            }
        }
        else {
            // 同上
            if (oldNode.right === null) {
                oldNode.right = newNode;
            }
            else {
                insertNode(oldNode.right, newNode)
            }
        }
    }

    // 插入操作
    BinarySearchTree.prototype.insert = (key) => {
        // 1. 创建节点元素
        const newNode = new Node(key);
        // 2. 判断是否有root根节点
        if (this.root === null) {
            this.root = newNode
        }
        else {
            insertNode(this.root, newNode)
        }
    }
}

// 因为运行在node环境
module.exports = BinarySearchTree