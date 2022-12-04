const BaseBinaryTree = require('./baseBinaryTree')
const BaseBinaryTreeExtendProps = require('./baseBinaryTreeExtendProps')
const CreateMoreTree = require('./createMoreTree')
/**
 * 二叉树层序遍历
 * 队列先进先出，符合一层一层遍历的逻辑，而使用栈先进后出适合模拟深度优先遍历也就是递归的逻辑。
 * 
 * https://www.bilibili.com/video/BV1GY4y1u7b2
 */
const levelOrder = function(root) {
    // 处理空数组的情况
    if (!root.value) {
        return []
    }

    // 二叉树的层序遍历
    const res = []
    const queue = []
    queue.push(root);

    while(queue.length !== 0 && root !== null) {
        // 记录当前层级节点数
        const length = queue.length;
        // 存放每一层的节点 
        const curLevel = [];

        for (let i = 0; i < length; i++) {
            let node = queue.shift();
            curLevel.push(node.value);

            // 存放当前层下一层的节点
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }

        // 把每一层的结果放到结果数组
        res.push(curLevel);
    }

    return res;
};


/**
 * 二叉树的层次遍历 II
 * 给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
 */
const levelOrderReverse = function(root) {
    // 处理空数组的情况
    if (!root.value) {
        return []
    }

    // 二叉树的层序遍历
    const res = []
    const queue = []
    queue.push(root);

    while(queue.length !== 0 && root !== null) {
        // 记录当前层级节点数
        const length = queue.length;
        // 存放每一层的节点 
        const curLevel = [];

        for (let i = 0; i < length; i++) {
            let node = queue.shift();
            curLevel.push(node.value);

            // 存放当前层下一层的节点
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }

        // 把每一层的结果放到结果数组
        // 从数组前头插入值，避免最后反转数组，减少运算时间
        res.unshift(curLevel);
    }

    return res;
};


/**
 * 二叉树的右视图
 * 
 * 给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
 * 输入：[1, 2, 3, null, 5, null, 4]
 * 输出：[1, 3, 4]
 * 思路：层序遍历的时候，判断是否遍历到单层的最后面的元素，如果是，就放进result数组中，随后返回result就可以了。
 */
const rightSideView = function(root) {
    // 二叉树右视图 只需要把每一层最后一个节点存储到res数组
    let res = []
    let queue = [];
    queue.push(root);

    while(queue.length && root !== null) {
        // 记录当前层级节点个数
        let length = queue.length;

        while(length--) {
            let node = queue.shift();

            // length长度为0的时候表明到了层级最后一个节点
            if (!length) {
                res.push(node.value);
            }

            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
    }

    return res;
};


/**
 * 二叉树的层平均值
 * 
 * 给定一个非空二叉树, 返回一个由每层节点平均值组成的数组。
 * 
 * 输入：[3, 9, 20, null, null, 15, 7]
 * 输出：[3, 14.5, 11]
 * 思路: 本题就是层序遍历的时候把一层求个总和在取一个均值。
 */
const averageOfLevels = function(root) {
    // 层级平均值
    const res = []
    const queue = []
    queue.push(root);

    while(queue.length && root !== null) {
        // 每一层节点个数
        const length = queue.length;
        // sum记录每一层的和
        let sum = 0;

        for (let i = 0; i < length; i++) {
            const node = queue.shift();
            sum += node.value;

            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }

        // 每一层的平均值存入数组res
        res.push(sum / length);
    }

    return res;
};


/**
 * 在每个树行中找最大值
 * 
 * 输入：[1, 3, 2, 5, 3, null, 9]
 * 输出：[1, 3, 9]
 */
const largestValues = function(root) {
    // 使用层序遍历
    const res = []
    const queue = [];
    queue.push(root);

    while(root !== null && queue.length) {
        // 设置max初始值就是队列的第一个元素
        let max = queue[0].value;
        let length = queue.length;

        while(length--) {
            let node = queue.shift();
            max = max > node.value ? max : node.value;

            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }

        // 把每一层的最大值放到res数组
        res.push(max);
    }

    return res;
};


/**
 * N叉树的层序遍历
 * 
 * 给定一个 N 叉树，返回其节点值的层序遍历。 (即从左到右，逐层遍历)。
 *              1
 *           /  |  \
 *          3   2   4
 *        /   \
 *       5     6
 * 
 * 输出： [ [1], [3,2,4], [5,6] ]
 * 思路: 这道题依旧是模板题，只不过一个节点有多个孩子了
 */
const levelOrderMore = function(root) {
    // 每一层可能有2个以上,所以不再使用node.left node.right
    const res = []
    const queue = [];
    queue.push(root);

    while(queue.length && root !== null) {
        // 记录每一层节点个数还是和二叉树一致
        let length = queue.length;
        // 存放每层节点 也和二叉树一致
        let curLevel = [];

        while(length--) {
            let node = queue.shift();
            curLevel.push(node.data);

            // 这里不再是 ndoe.left node.right 而是循坏node.children
            for (let item of node.children) {
                item && queue.push(item);
            }
        }

        res.push(curLevel);
    }

    return res;
};


/**
 * 填充每个节点的下一个右侧节点指针
 * 
 * 题意：
 *  给定一个完美二叉树，其所有叶子节点都在同一层，每个父节点都有两个子节点。
 *  填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
 *  初始状态下，所有 next 指针都被设置为 NULL。
 * 
 * 思路: 本题依然是层序遍历，只不过在单层遍历的时候记录一下本层的头部节点，然后在遍历的时候让前一个节点指向本节点就可以了。
 * 
 * 例子：
 *  输入：root = [1,2,3,4,5,6,7]
 *  输出：[1,#,2,3,#,4,5,6,7,#]
 *  解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。
 * 
 *  输入：root = []
 *  输出：[]
 * 
 * 
 * 填充每个节点的下一个右侧节点指针 II
 * 输入：root = [1,2,3,4,5,null,7]
 * 输出：[1,#,2,3,#,4,5,7,#]
 */
const connect = function(root) {
    if (root === null) return root;
    const res = []
    let queue = [root];

    while (queue.length) {
        let n = queue.length;

        for (let i = 0; i < n; i++) {
            let node = queue.shift();
            res.push(node.value)

            if (i < n-1) {
                node.next = queue[0];
            }

            if (i === n - 1 && node.next === null) {
                res.push('#')
            }

            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
    }

    return res;
};


/**
 * 二叉树的最大深度
 * 
 * 给定一个二叉树，找出其最大深度。
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
 * 说明: 叶子节点是指没有子节点的节点。
 * 示例：给定二叉树 [3,9,20,null,null,15,7]，返回它的最大深度 3 。
 * 思路：使用迭代法的话，使用层序遍历是最为合适的，因为最大的深度就是二叉树的层数，和层序遍历的方式极其吻合。
 */
const maxDepth = function(root) {
    // 最大的深度就是二叉树的层数
    if (root === null) return 0;
    let queue = [root];
    let height = 0;

    while (queue.length) {
        let n = queue.length;
        height++;

        for (let i = 0; i < n; i++) {
            let node = queue.shift();
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
    }

    return height;
};


/**
 * 二叉树的最小深度
 * 
 * 相对于 104.二叉树的最大深度 ，本题还也可以使用层序遍历的方式来解决，思路是一样的。
 * 需要注意的是，只有当左右孩子都为空的时候，才说明遍历的最低点了。如果其中一个孩子为空则不是最低点
 */
const minDepth = function(root) {
    if (root === null) return 0;
    let queue = [root];
    let deepth = 0;

    while (queue.length) {
        let n = queue.length;
        deepth++;

        for (let i = 0; i < n; i++) {
            let node = queue.shift();
            // 如果左右节点都是null，则该节点深度最小
            if (node.left === null && node.right === null) {
                return deepth;
            }

            node.left && queue.push(node.left);;
            node.right && queue.push (node.right);
        }
    }

    return deepth;
};







// 测试
const bstsTree = new BaseBinaryTree();
const createMoreTree = new CreateMoreTree()
const bsts = [3, 9, 20, null, null, 15, 7]
const bsts1 = [1]
const bsts2 = []
const bsts3 = [1, 2, 3, null, 5, null, 4]
const bsts4 = [1, 3, 2, 5, 3, null, 9]
// 多叉树 - 傻瓜式创建，待研究好的创建方法
const root = createMoreTree.create(1)
const node1 = createMoreTree.createTreeNode(3)
const node11 = createMoreTree.createTreeNode(5)
const node12 = createMoreTree.createTreeNode(6)
node1.children.push(node11, node12)
const node2 = createMoreTree.createTreeNode(2)
const node3 = createMoreTree.createTreeNode(4)
root.children.push(node1, node2, node3)
// 增加二叉树的next属性
const root1 = [1, 2, 3, 4, 5, 6, 7]
const baseBinaryTreeExtendProps = new BaseBinaryTreeExtendProps()
baseBinaryTreeExtendProps.create(root1)
// console.log(JSON.stringify(connect(baseBinaryTreeExtendProps.root)))
// 填充每个节点的下一个右侧节点指针 II
const root2 = [1, 2, 3, 4, 5, null, 7]
const baseBinaryTreeExtendProps1 = new BaseBinaryTreeExtendProps()
baseBinaryTreeExtendProps1.create(root2)
// console.log(JSON.stringify(connect(baseBinaryTreeExtendProps1.root)))

// console.log(levelOrder(bstsTree.create(bsts)))
// console.log(levelOrder(bstsTree.create(bsts1)))
// console.log(levelOrder(bstsTree.create(bsts2)))

// console.log(levelOrderReverse(bstsTree.create(bsts)))
// console.log(levelOrderReverse(bstsTree.create(bsts1)))
// console.log(levelOrderReverse(bstsTree.create(bsts2)))

// console.log(rightSideView(bstsTree.create(bsts3)))

// console.log(averageOfLevels(bstsTree.create(bsts)))

// console.log(largestValues(bstsTree.create(bsts4)))

console.log(levelOrderMore(root))

// 二叉树的最大深度
const bigDeepList = [3, 9, 20, null, null, 15, 7]
console.log(maxDepth(bstsTree.create(bigDeepList)))
// 二叉树的最小深度
console.log(minDepth(bstsTree.create(bigDeepList)))
