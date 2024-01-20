/**
 * 106.从中序与后序遍历序列构造二叉树
 * https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
 * 
 * 根据一棵树的中序遍历与后序遍历构造二叉树。
 * 注意: 你可以假设树中没有重复的元素。
 * 例如，给出
 * 中序遍历 inorder = [9,3,15,20,7] 后序遍历 postorder = [9,15,7,20,3] 返回如下的二叉树：
 * https://img-blog.csdnimg.cn/20210203154316774.png
 * 
 * 来看一下一共分几步：
 *  第一步：如果数组大小为零的话，说明是空节点了。
 *  第二步：如果不为空，那么取后序数组最后一个元素作为节点元素。
 *  第三步：找到后序数组最后一个元素在中序数组的位置，作为切割点
 *  第四步：切割中序数组，切成中序左数组和中序右数组 （顺序别搞反了，一定是先切中序数组）
 *  第五步：切割后序数组，切成后序左数组和后序右数组
 *  第六步：递归处理左区间和右区间
 */

class TreeNode {
    constructor(value) {
        this.val = value
        this.left = null
        this.right = null
    }
}

const buildTree = function(inorder, postorder) {
    if (!inorder.length) return null;

    // 从后序遍历的数组中获取中间节点的值， 即数组最后一个值
    const rootVal = postorder.pop(); 

    // 获取中间节点在中序遍历中的下标
    let rootIndex = inorder.indexOf(rootVal);


    // 创建中间节点
    const root = new TreeNode(rootVal);

    
    /**
     * * 中左序：inorder.slice(0, rootIndex)
     * * 中右序：inorder.slice(rootIndex + 1)
     * 
     * * 后左序：postorder.slice(0, rootIndex)
     * * 后右序：postorder.slice(rootIndex)，因为此时后序的数组已经把元素删除了
     */
    // 创建左节点
    root.left = buildTree(inorder.slice(0, rootIndex), postorder.slice(0, rootIndex));
    // 创建右节点
    root.right = buildTree(inorder.slice(rootIndex + 1), postorder.slice(rootIndex));

    return root;
}



// 测试
// [3,9,20,null,null,15,7]
inorder = [9,3,15,20,7]
postorder = [9,15,7,20,3]

// [-1]
inorder1 = [-1]
postorder1 = [-1]

console.log('buildTree: ', buildTree(inorder, postorder))
console.log('buildTree: ', buildTree(inorder1, postorder1))
