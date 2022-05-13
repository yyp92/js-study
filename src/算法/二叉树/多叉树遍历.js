const CreateMoreTree = require('./createMoreTree')
/**
 * 多叉树遍历
 */

/**
 * N 叉树的后序遍历
 * 
 * 输入：root = [1,null,3,2,4,null,5,6]
 * 输出：[5,6,3,2,4,1]
 * 
 * 输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
 * 输出：[2,6,14,11,7,3,12,8,4,13,9,10,5,1]
 */
// 迭代法
const postorder = function(root) {
    if (!root) return [];

    const res = []
    const stack = [root];

    while (stack.length) {
        const node = stack.pop();
        res.push(node.data);

        for (const c of node.children) {
            stack.push(c);
        }
    }

    return res.reverse();
};

// 递归法
const postorder1 = (root) => {
    if (!root) return [];
    const res = [];

    const inPostorder = (root) => {
        if (!root) return;

        for (let i = 0; i < root.children.length; i++) {
            inPostorder(root.children[i]);
        }

        res.push(root.data);
    }
    inPostorder(root);

    return res;
};


/**
 * N 叉树的前序遍历
 * 
 * 输入：root = [1,null,3,2,4,null,5,6]
 * 输出：[1,3,5,6,2,4]
 * 
 * 输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
 * 输出：[1,2,3,6,7,11,14,4,8,12,5,9,13,10]
 */
// 迭代法
const preorder = function(root) {
    if (!root) return [];

    const res = []
    const stack = [root];

    while (stack.length) {
        const node = stack.pop();
        res.push(node.data);
        let len = node.children.length;

        while (len) {
            stack.push(node.children[len - 1]);
            len--;
        }
    }

    return res;
};

// 递归
const preorder1 = root => {
    const res = [];

    const dfs = root => {
        if (!root) return;
        
        res.push(root.data);
        root.children.forEach(item => {
            dfs(item);
        });
    };
    dfs(root);

    return res;
};



// 测试
const root = {
    data: 1,
    children: [
        {
            data: 3,
            children: [
                {
                    data: 5,
                    children: []
                },
                {
                    data: 6,
                    children: []
                }
            ]
        },
        {
            data: 2,
            children: []
        },
        {
            data: 4,
            children: []
        }
    ]
}
const root1 = {
    data: 1,
    children: [
        {
            data: 2,
            children: []
        },
        {
            data: 3,
            children: [
                {
                    data: 6,
                    children: []
                },
                {
                    data: 7,
                    children: [
                        {
                            data: 11,
                            children: [
                                {
                                    data: 14,
                                    children: []
                                }
                            ]
                        }
                    ]
                },
            ]
        },
        {
            data: 4,
            children: [
                {
                    data: 8,
                    children: [
                        {
                            data: 12,
                            children: []
                        }
                    ]
                },
            ]
        },
        {
            data: 5,
            children: [
                {
                    data: 9,
                    children: [
                        {
                            data: 13,
                            children: []
                        }
                    ]
                },
                {
                    data: 10,
                    children: []
                },
            ]
        }
    ]
}

// console.log(postorder(root))
// console.log(postorder(root1))
// console.log(postorder1(root))
// console.log(postorder1(root1))

console.log('preorder', preorder(root))
console.log('preorder', preorder(root1))
console.log('preorder', preorder1(root))
console.log('preorder', preorder1(root1))
