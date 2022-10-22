/**
 * 105.从前序与中序遍历序列构造二叉树
 * 
 * 根据一棵树的前序遍历与中序遍历构造二叉树。
 * 注意: 你可以假设树中没有重复的元素。
 * 例如，给出
 * 前序遍历 preorder = [3,9,20,15,7] 中序遍历 inorder = [9,3,15,20,7] 返回如下的二叉树：
 * https://img-blog.csdnimg.cn/20210203154626672.png
 */

const buildTree = function(preorder, inorder) {
    if (!preorder.length) return null;

    // 从前序遍历的数组中获取中间节点的值， 即数组第一个值
    const rootVal = preorder.shift(); 

    // 获取中间节点在中序遍历中的下标
    const index = inorder.indexOf(rootVal); 

    // 创建中间节点
    const root = new TreeNode(rootVal); 

    // 创建左节点
    root.left = buildTree(preorder.slice(0, index), inorder.slice(0, index));
    // 创建右节点
    root.right = buildTree(preorder.slice(index), inorder.slice(index + 1));

    return root;
}