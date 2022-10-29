/**
 * 116.填充每个节点的下一个右侧节点指针
 * https://leetcode.cn/problems/populating-next-right-pointers-in-each-node/
 * 
 * 给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：
 * struct Node {
 *  int val;
 *  Node *left;
 *  Node *right;
 *  Node *next;
 * }
 * 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
 * 初始状态下，所有 next 指针都被设置为 NULL。
 * 
 * 进阶：
 *  你只能使用常量级额外空间。
 *  使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。
 *  https://code-thinking-1253855093.file.myqcloud.com/pics/20210727143202.png
 */
 const connect = root => {
    if (!root) return root;

    // 根节点入队
    const Q = [root];

    while (Q.length) {
        const len = Q.length;

        // 遍历这一层的所有节点
        for (let i = 0; i < len; i++) {
            // 队头出队
            const node = Q.shift();

            // 连接
            if (i < len - 1) {
                // 新的队头是node的右边元素
                node.next = Q[0];
            }
            
            // 队头左节点有值，放入队列
            node.left && Q.push(node.left);
            // 队头右节点有值，放入队列
            node.right && Q.push(node.right);
        }
    }

    return root;
};