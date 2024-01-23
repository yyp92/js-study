/**
 * 501.二叉搜索树中的众数
 * https://leetcode.cn/problems/find-mode-in-binary-search-tree/
 * 
 * 给定一个有相同值的二叉搜索树（BST），找出 BST 中的所有众数（出现频率最高的元素）。
 * 假定 BST 有如下定义：
 *  结点左子树中所含结点的值小于等于当前结点的值
 *  结点右子树中所含结点的值大于等于当前结点的值
 *  左子树和右子树都是二叉搜索树
 * 
 * 例如：
 *  给定 BST [1,null,2,2],
 *  https://img-blog.csdnimg.cn/20201014221532206.png
 *  返回[2].
 * 
 * 提示：如果众数超过1个，不需考虑输出顺序
 * 进阶：你可以不使用额外的空间吗？（假设由递归产生的隐式调用栈的开销不被计算在内）
 */

// 使用额外空间map的方法
const findMode = function(root) {
    // 使用递归中序遍历
    let map = new Map();

    // 1. 确定递归函数以及函数参数
    const traverTree = function(root) {
        // 2. 确定递归终止条件
        if (root === null) {
            return ;
        }

        traverTree(root.left);
        // 3. 单层递归逻辑
        map.set(root.val, map.has(root.val) ? map.get(root.val) + 1 : 1);
        traverTree(root.right);
    }
    traverTree(root);

    // 上面把数据都存储到map
    // 下面开始寻找map里面的
    // 定义一个最大出现次数的初始值为root.val的出现次数
    let maxCount = map.get(root.val);
    // 定义一个存放结果的数组res
    let res = [];

    for (let [key, value] of map) {
        // 如果当前值等于最大出现次数就直接在res增加该值
        if(value === maxCount) {
            res.push(key);
        }

        // 如果value的值大于原本的maxCount就清空res的所有值，因为找到了更大的
        if (value > maxCount) {
            res = [];
            maxCount = value;
            res.push(key);
        }
    }

    return res;
};

// 不使用额外空间，利用二叉树性质，中序遍历(有序)：
const findMode1 = function(root) {
    // 不使用额外空间，使用中序遍历,设置出现最大次数初始值为1
    let count = 0, maxCount = 1;
    let pre = root, res = [];

    // 1.确定递归函数及函数参数
    const travelTree = function(cur) {
        // 2. 确定递归终止条件
        if (cur === null) {
            return ;
        }
        travelTree(cur.left);

        // 3. 单层递归逻辑
        // 与前一个节点数值相同
        if (pre.val === cur.val) {
            count++;
        }
        // 与前一个节点数值不同
        else {
            count = 1;
        }

        // 如果和最大值相同，放进result中
        if (count === maxCount) {
            res.push(cur.val);
        }

        // 如果计数大于最大值频率
        if (count > maxCount) {
            // 很关键的一步，不要忘记清空result，之前result里的元素都失效了
            res = [];
            // 更新最大频率
            maxCount = count;
            res.push(cur.val);
        }

        pre = cur;

        travelTree(cur.right);
    }

    travelTree(root);
    return res;
}