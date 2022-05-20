/**
 * n叉树的最大深度 (559)
 * 
 * 给定一个 n 叉树，找到其最大深度。
 * 最大深度是指从根节点到最远叶子节点的最长路径上的节点总数。
 * 
 */

// 递归
const maxDepth = function(root) {
    if (!root) return 0
    let depth = 0

    for (let node of root.children) {
        depth = Math.max(depth, maxDepth(node))
    }

    return depth + 1
}

// 迭代
const maxDepth1 = function(root) {
    if (!root) return 0
    let count = 0
    let queue = [root]

    while (queue.length) {
        let size = queue.length
        count++

        while(size--) {
            let node = queue.shift()

            for (let item of node.children) {
                item && queue.push(item);
            }
        }
    }

    return count
};



// 测试
const tree = {
    value: 1,
    children: [
        {
            value: 3,
            children: [
                {
                    value: 5,
                    children: []
                },
                {
                    value: 6,
                    children: []
                },
            ]
        },
        {
            value: 2,
            children: []
        },
        {
            value: 4,
            children: []
        }
    ]
}
console.log(maxDepth(tree))
console.log(maxDepth1(tree))
