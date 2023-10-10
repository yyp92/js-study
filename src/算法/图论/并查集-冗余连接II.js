/**
 * 冗余连接II
 * 
 * https://leetcode.cn/problems/redundant-connection-ii/
 * 
 * 在本问题中，有根树指满足以下条件的 有向 图。该树只有一个根节点，所有其他节点都是该根节点的后继。该树除了根节点之外的每一个节点都有且只有一个父节点，而根节点没有父节点。
 * 输入一个有向图，该图由一个有着 n 个节点（节点值不重复，从 1 到 n）的树及一条附加的有向边构成。附加的边包含在 1 到 n 中的两个不同顶点间，这条附加的边不属于树中已存在的边。
 * 结果图是一个以边组成的二维数组 edges 。 每个元素是一对 [ui, vi]，用以表示 有向 图中连接顶点 ui 和顶点 vi 的边，其中 ui 是 vi 的一个父节点。
 * 返回一条能删除的边，使得剩下的图是有 n 个节点的有根树。若有多个答案，返回最后出现在给定二维数组的答案。
 * 
 * https://code-thinking-1253855093.file.myqcloud.com/pics/20210727151057.png
 * https://code-thinking-1253855093.file.myqcloud.com/pics/20210727151118.png
 * 
 * 提示：
 *  n == edges.length
 *  3 <= n <= 1000
 *  edges[i].length == 2
 *  1 <= ui, vi <= n
 */

// 如题：二维数组大小的在3到1000范围内
const N = 1010; 
const father = new Array(N);
// 边的数量
let n; 

// 并查集里寻根的过程
const find = u => {
    return u == father[u] ? u : father[u] = find(father[u]);
};

// 将 v->u 这条边加入并查集
const join = (u, v) => {
    u = find(u);
    v = find(v);

    if (u == v) return;

    father[v] = u;
};

// 判断 u 和 v是否找到同一个根
const same = (u, v) => {
    u = find(u);
    v = find(v);

    return u == v;
};

// 在有向图里找到删除的那条边，使其变成树
const getRemoveEdge = edges => {
    // 初始化并查集
    for (let i = 1; i <= n; i++) {
        father[i] = i;
    }

    // 遍历所有的边
    for (let i = 0; i < n; i++) { 
        // 构成有向环了，就是要删除的边
        if (same(edges[i][0], edges[i][1])) { 
            return edges[i];
        } 

        join(edges[i][0], edges[i][1]);
    }

    return [];
}

// 删一条边之后判断是不是树
const isTreeAfterRemoveEdge = (edges, deleteEdge) => {
    // 初始化并查集
    for (let i = 1; i <= n; i++) {
        father[i] = i;
    }

    for (let i = 0; i < n; i++) {
        if (i == deleteEdge) continue;

        // 构成有向环了，一定不是树
        if (same(edges[i][0], edges[i][1])) { 
            return false;
        }

        join(edges[i][0], edges[i][1]);
    }

    return true;
}

/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantDirectedConnection = function(edges) {
    // 边的数量
    n = edges.length;
    // 记录节点入度
    const inDegree = new Array(n+1).fill(0); 

    for (let i = 0; i < n; i++) {
        // 统计入度
        inDegree[edges[i][1]]++;
    }

    // 记录入度为2的边（如果有的话就两条边）
    let vec = [];
    // 找入度为2的节点所对应的边，注意要倒序，因为优先返回最后出现在二维数组中的答案
    for (let i = n - 1; i >= 0; i--) {
        if (inDegree[edges[i][1]] == 2) {
            vec.push(i);
        }
    }

    // 处理图中情况1 和 情况2
    // 如果有入度为2的节点，那么一定是两条边里删一个，看删哪个可以构成树
    if (vec.length > 0) {
        if (isTreeAfterRemoveEdge(edges, vec[0])) {
            return edges[vec[0]];
        }
        else {
            return edges[vec[1]];
        }
    }

    // 处理图中情况3
    // 明确没有入度为2的情况，那么一定有有向环，找到构成环的边返回就可以了
    return getRemoveEdge(edges);
};



// 测试
// [ 2, 3 ]
console.log(findRedundantDirectedConnection([[1, 2], [1, 3], [2, 3]]))

// [ 4, 1 ]
console.log(findRedundantDirectedConnection([[1, 2], [2, 3], [3, 4], [4, 1], [1, 5]]))
