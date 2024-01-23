/**
 * 98.验证二叉搜索树
 * https://leetcode.cn/problems/validate-binary-search-tree/
 * 
 * 给定一个二叉树，判断其是否是一个有效的二叉搜索树。
 * 假设一个二叉搜索树具有如下特征：
 *  节点的左子树只包含小于当前节点的数。
 *  节点的右子树只包含大于当前节点的数。
 *  所有左子树和右子树自身必须也是二叉搜索树。
 * https://img-blog.csdnimg.cn/20210203144334501.png
 * 
 * 此题用的是中序遍历
 */

// 辅助数组解决
const isValidBST = function (root) {
    let arr = [];

    const buildArr = (root) => {
        if (root) {
            buildArr(root.left);

            // 将二叉搜索树转换为有序数组
            arr.push(root.val);

            buildArr(root.right);
        }
    }
    buildArr(root);

    for (let i = 1; i < arr.length; i++) {
        // 注意要小于等于，搜索树里不能有相同元素
        if (arr[i] <= arr[i - 1]) return false;
    }

    return true;
}

// 递归中解决
const isValidBST1 = function (root) {
    // 用来记录前一个节点
    let pre = null;

    const inOrder = (root) => {
        if (root === null) {
            return true;
        }
            
        // 左
        let left = inOrder(root.left);

        if (pre !== null && pre.val >= root.val) {
            return false;
        }
           
        // 记录前一个节点
        pre = root;

        // 右
        let right = inOrder(root.right);

        return left && right;
    }

    return inOrder(root);
}



/**
 * 迭代法
 */
const isValidBST2 = function (root) {
	const queue = [];
	let cur = root;
	let pre = null;

	while(cur !== null || queue.length !== 0) {
		if (cur !== null) {
			queue.push(cur);
			cur = cur.left;
		}
        else {
			cur = queue.pop();

			if (pre !== null && cur.val <= pre.val) {
				return false;
			}

			pre = cur;
			cur = cur.right;
		}
	}

	return true;
};