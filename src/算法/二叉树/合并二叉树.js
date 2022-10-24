/**
 * 617.合并二叉树
 * 
 * 给定两个二叉树，想象当你将它们中的一个覆盖到另一个上时，两个二叉树的一些节点便会重叠。
 * 你需要将他们合并为一个新的二叉树。合并的规则是如果两个节点重叠，那么将他们的值相加作为节点合并后的新值，否则不为 NULL 的节点将直接作为新二叉树的节点。
 * 
 * 示例 1:
 *  https://img-blog.csdnimg.cn/20210204153634809.png
 * 
 * 注意: 合并必须从两个树的根节点开始。
 */

// 递归法
const mergeTrees = function (root1, root2) {
    const preOrder = (root1, root2) => {
        // 如果root1为空，合并之后就应该是root2
        if (!root1) return root2
        // 如果root2为空，合并之后就应该是root1
        if (!root2) return root1;

        // 前序
        // 修改了root1的数值和结构
        root1.val += root2.val;
        root1.left = preOrder(root1.left, root2.left);
        root1.right = preOrder(root1.right, root2.right);

        // 中序
        // root1.left = preOrder(root1.left, root2.left);
        // root1.val += root2.val;
        // root1.right = preOrder(root1.right, root2.right);

        // 后序
        // root1.left = preOrder(root1.left, root2.left);
        // root1.right = preOrder(root1.right, root2.right);
        // root1.val += root2.val;

        return root1;
    }

    return preOrder(root1, root2);
}


// 迭代法
const mergeTrees1 = function(root1, root2) {
    if (root1 === null) return root2;
    if (root2 === null) return root1;

    let queue = [];
    queue.push(root1);
    queue.push(root2);

    while (queue.length) {
        let node1 = queue.shift();
        let node2 = queue.shift();

        // 此时两个节点一定不为空，val相加
        node1.val += node2.val;

        // 如果两棵树左节点都不为空，加入队列
        if (node1.left !== null && node2.left !== null) {
            queue.push(node1.left);
            queue.push(node2.left);
        }

        // 如果两棵树右节点都不为空，加入队列
        if (node1.right !== null && node2.right !== null) {
            queue.push(node1.right);
            queue.push(node2.right);
        }

        // 当node1的左节点为空 node2左节点不为空，就赋值过去
        if (node1.left === null && node2.left !== null) {
            node1.left = node2.left;
        }

        // 当node1的右节点为空 node2右节点不为空，就赋值过去
        if (node1.right === null && node2.right !== null) {
            node1.right = node2.right;
        } 
    }

    return root1;
}