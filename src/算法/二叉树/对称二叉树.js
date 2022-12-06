const BaseBinaryTreeExtendProps = require('./baseBinaryTreeExtendProps')
/**
 * 对称二叉树
 * https://leetcode.cn/problems/symmetric-tree/
 * 
 * 🌰
 *  [1, 2, 2, 3, 4, 4, 3] 是对称
 *  [1, 2, 2, null, 3, null, 3] 不是镜像对称的
 * 
 * 相关题目：
 *  100.相同的树
 *  572.另一个树的子树
 */

/**
 * 递归法
 *  1.确定递归函数的参数和返回值
 *      因为我们要比较的是根节点的两个子树是否是相互翻转的，进而判断这个树是不是对称树，所以要比较的是两个树，参数自然也是左子树节点和右子树节点。
 *      返回值自然是bool类型。
 * 
 *  2.确定终止条件
 *      要比较两个节点数值相不相同，首先要把两个节点为空的情况弄清楚！否则后面比较数值的时候就会操作空指针了。
 *      2.1 节点为空的情况有：（注意我们比较的其实不是左孩子和右孩子，所以如下我称之为左节点右节点）
 *          左节点为空，右节点不为空，不对称，return false
 *          左不为空，右为空，不对称 return false
 *          左右都为空，对称，返回true
 * 
 *      2.2 此时已经排除掉了节点为空的情况，那么剩下的就是左右节点不为空：
 *          左右都不为空，比较节点数值，不相同就return false
 * 
 *      此时左右节点不为空，且数值也不相同的情况我们也处理了。
 *      注意上面最后一种情况，没有使用else，而是elseif， 因为我们把以上情况都排除之后，剩下的就是 左右节点都不为空，且数值相同的情况。
 * 
 *  3.确定单层递归的逻辑
 *      此时才进入单层递归的逻辑，单层递归的逻辑就是处理 左右节点都不为空，且数值相同的情况。
 *          比较二叉树外侧是否对称：传入的是左节点的左孩子，右节点的右孩子。
 *          比较内测是否对称，传入左节点的右孩子，右节点的左孩子。
 *          如果左右都对称就返回true ，有一侧不对称就返回false 。
 *      使用的遍历方式，左子树左右中，右子树右左中，所以我把这个遍历顺序也称之为“后序遍历”（尽管不是严格的后序遍历）。
 */


/**
 * 迭代法
 *  这道题目我们也可以使用迭代法，但要注意，这里的迭代法可不是前中后序的迭代写法，因为本题的本质是判断两个树是否是相互翻转的，其实已经不是所谓二叉树遍历的前中后序的关系了。
 *  这里我们可以使用队列来比较两个树（根节点的左右子树）是否相互翻转，（注意这不是层序遍历）
 * 
 *  使用队列
 *      通过队列来判断根节点的左子树和右子树的内侧和外侧是否相等
 *      条件判断和递归的逻辑是一样的。
 * 
 *  使用栈
 *      细心的话，其实可以发现，这个迭代法，其实是把左右两个子树要比较的元素顺序放进一个容器，然后成对成对的取出来进行比较，那么其实使用栈也是可以的。
 *      只要把队列原封不动的改成栈就可以了。
 */


// 递归法
const isSymmetric = function(root) {
    // 使用递归遍历左右子树 递归三部曲
    // 1. 确定递归的参数 root.left root.right和返回值true false 
    const compareNode = function(left, right){
        // 2. 确定终止条件 空的情况
        // 首先排除空节点的情况
        if (left === null && right !== null || left !== null && right === null) {
            return false;
        }
        else if(left === null && right === null) {
            return true;
        }
        // 排除了空节点，再排除数值不相同的情况
        else if(left.value !== right.value) {
            return false;
        }

        // 3. 确定单层递归逻辑
        // 此时就是：左右节点都不为空，且数值相同的情况
        let outSide = compareNode(left.left, right.right);
        let inSide = compareNode(left.right, right.left);
        return outSide && inSide;
    }
    
    if (root === null) {
        return true;
    }

    return compareNode(root.left, root.right);
};

// 迭代法-队列
const isSymmetric1 = function(root) {
    // 迭代方法判断是否是对称二叉树
    // 首先判断root是否为空
    if (root === null) {
        return true;
    }

    const queue = [];
    queue.push(root.left);
    queue.push(root.right);

    while (queue.length) {
        let leftNode = queue.shift(); // 左节点
        let rightNode = queue.shift(); // 右节点

        // 左右都为空
        if (leftNode === null && rightNode === null) {
            continue;
        }

        // 左右其中一个为空 || 左右值不相等
        if (leftNode === null || rightNode === null || leftNode.value !== rightNode.value) {
            return false;
        }

        queue.push(leftNode.left); // 左节点左孩子入队
        queue.push(rightNode.right); // 右节点右孩子入队
        queue.push(leftNode.right); // 左节点右孩子入队
        queue.push(rightNode.left); // 右节点左孩子入队
    }

    return true;
};

// 迭代法-栈
const isSymmetric2 = function(root) {
    // 迭代方法判断是否是对称二叉树
    // 首先判断root是否为空
    if (root === null) {
        return true;
    }

    const stack = [];
    stack.push(root.left);
    stack.push(root.right);

    while (stack.length) {
        let rightNode = stack.pop(); // 左节点
        let leftNode = stack.pop(); //右节点

        // 左右都为空
        if (leftNode === null && rightNode === null) {
            continue;
        }

        // 左右其中一个为空 || 左右值不相等
        if (leftNode === null || rightNode === null || leftNode.value !== rightNode.value){
            return false;
        }

        stack.push(leftNode.left); // 左节点左孩子入队
        stack.push(rightNode.right); // 右节点右孩子入队
        stack.push(leftNode.right); // 左节点右孩子入队
        stack.push(rightNode.left); // 右节点左孩子入队
    }

    return true;
};
  


// 测试
const arr = [1, 2, 2, 3, 4, 4, 3]
const arr1 = [1, 2, 2, null, 3, null, 3]
const baseBinaryTreeExtendProps = new BaseBinaryTreeExtendProps()
// console.log(isSymmetric(baseBinaryTreeExtendProps.create(arr)))
// console.log(isSymmetric(baseBinaryTreeExtendProps.create(arr1)))

// console.log(isSymmetric1(baseBinaryTreeExtendProps.create(arr)))
// console.log(isSymmetric1(baseBinaryTreeExtendProps.create(arr1)))

console.log(isSymmetric2(baseBinaryTreeExtendProps.create(arr)))
console.log(isSymmetric2(baseBinaryTreeExtendProps.create(arr1)))
