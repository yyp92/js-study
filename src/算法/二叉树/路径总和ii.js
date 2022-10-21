/**
 * 113. 路径总和ii
 * 
 * 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。
 * 说明: 叶子节点是指没有子节点的节点。
 * 示例: 给定如下二叉树，以及目标和 sum = 22，
 * https://img-blog.csdnimg.cn/20210203160854654.png
 */

// 递归
let pathsum = function (root, targetsum) {
    // 要遍历整个树找到所有路径，所以递归函数不需要返回值, 与112不同
    const res = [];
    const travelsal = (node, cnt, path) => {
      // 遇到了叶子节点且找到了和为sum的路径
      if (cnt === 0 && !node.left && !node.right) {
        res.push([...path]); // 不能写res.push(path), 要深拷贝
        return;
      }

      // 遇到叶子节点而没有找到合适的边，直接返回
      if (!node.left && !node.right) return;

      // 左 （空节点不遍历）
      if (node.left) {
        path.push(node.left.val);
        travelsal(node.left, cnt - node.left.val, path); // 递归
        cnt += node.left.val
        path.pop(); // 回溯
      }

      // 右 （空节点不遍历）
      if (node.right) {
        path.push(node.right.val);
        travelsal(node.right, cnt - node.right.val, path); // 递归
        cnt += node.right.val
        path.pop(); // 回溯
      }

      return;
    };

    if (!root) return res;
    // 把根节点放进路径
    travelsal(root, targetsum - root.val, [root.val]);
    return res;
}


// 递归 精简版
const pathsum1 = function(root, targetSum) {
    let respath = []
    let curpath = []

    // 1. 确定递归函数参数
    const traveltree = function(node, count){
        curpath.push(node.val);
        count -= node.val;

        if (node.left === null && node.right === null && count === 0) {
            respath.push([...curpath]);
        }

        node.left && traveltree(node.left, count);
        node.right && traveltree(node.right, count);
        // 回溯
        let cur = curpath.pop();
        count += cur;
    }

    if (root === null) {
        return respath;
    }

    travelTree(root, targetSum);
    return resPath;
}


// 迭代
const pathSum2 = function(root, targetSum) {
    if(root === null) return [];
    let nodeArr = [root];
    let resArr = []; // 记录符合目标和的返回路径
    let tempArr = [[]]; // 对应路径
    let countArr = [0]; //对应和

    while(nodeArr.length) {
        let curNode = nodeArr.shift();
        let curVal = countArr.shift();
        let curNodeArr = tempArr.shift();
        curVal += curNode.val;
        curNodeArr.push(curNode.val);

        // 为叶子结点，且和等于目标数，将此次结果数组push进返回数组中
        if (curNode.left === null && curNode.right === null && curVal === targetSum) {
            resArr.push(curNodeArr);
        }

        // 左节点，将当前的和及对应路径也对应记录下来
        if (curNode.left) {
            nodeArr.push(curNode.left);
            countArr.push(curVal);
            tempArr.push([...curNodeArr]);
        }

        // 右节点，将当前的和及对应路径也对应记录下来
        if (curNode.right) {
            nodeArr.push(curNode.right);
            countArr.push(curVal);
            tempArr.push([...curNodeArr]);
        }
    }

    return resArr;
}