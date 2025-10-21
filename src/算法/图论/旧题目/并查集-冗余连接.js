/**
 * 冗余连接
 * 
 * https://leetcode.cn/problems/redundant-connection/
 * 
 * 
 * 树可以看成是一个连通且 无环 的 无向 图。
 * 给定往一棵 n 个节点 (节点值 1～n) 的树中添加一条边后的图。添加的边的两个顶点包含在 1 到 n 中间，且这条附加的边不属于树中已存在的边。图的信息记录于长度为 n 的二维数组 edges ，edges[i] = [ai, bi] 表示图中在 ai 和 bi 之间存在一条边。
 * 请找出一条可以删去的边，删除后可使得剩余部分是一个有着 n 个节点的树。如果有多个答案，则返回数组 edges 中最后出现的边。
 * 
 * https://code-thinking-1253855093.file.myqcloud.com/pics/20210727150215.png
 * 
 * 提示:
 *  n == edges.length
 *  3 <= n <= 1000
 *  edges[i].length == 2
 *  1 <= ai < bi <= edges.length
 *  ai != bi
 *  edges 中无重复元素
 *  给定的图是连通的
 */


const n = 1005;
const father = new Array(n);

// 并查集里寻根的过程
const find = u => {
    return u == father[u] 
        ? u
        : father[u] = find(father[u]);
};

// 将 v->u 这条边加入并查集
const join = (u, v) => {
    // 寻找u的根
    u = find(u);
    // 寻找v的根
    v = find(v);

    // 如果发现根相同，则说明在一个集合，不用两个节点相连直接返回
    if (u == v) return;

    father[v] = u;
};

// 判断 u 和 v是否找到同一个根，本题用不上
const same = (u, v) => {
    u = find(u);
    v = find(v);

    return u == v;
};

/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function(edges) {
    // 并查集初始化
    for (let i = 0; i < n; i++) {
        father[i] = i;
    }

    for (let i = 0; i < edges.length; i++) {
        if (same(edges[i][0], edges[i][1])) {
            return edges[i]
        }

        join(edges[i][0], edges[i][1])
    }

    return null;
};


// 测试
// [ 2, 3 ]
console.log(findRedundantConnection([[1, 2], [1, 3], [2, 3]]))
// [ 1, 4 ]
console.log(findRedundantConnection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]))
