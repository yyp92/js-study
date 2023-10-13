/**
 * 寻找图中是否存在路径
 * 
 * https://leetcode.cn/problems/find-if-path-exists-in-graph/
 * 
 * 有一个具有 n个顶点的 双向 图，其中每个顶点标记从 0 到 n - 1（包含 0 和 n - 1）。图中的边用一个二维整数数组 edges 表示，其中 edges[i] = [ui, vi] 表示顶点 ui 和顶点 vi 之间的双向边。 每个顶点对由 最多一条 边连接，并且没有顶点存在与自身相连的边。
 * 请你确定是否存在从顶点 start 开始，到顶点 end 结束的 有效路径 。
 * 给你数组 edges 和整数 n、start和end，如果从 start 到 end 存在 有效路径 ，则返回 true，否则返回 false 。
 * 
 * https://code-thinking-1253855093.file.myqcloud.com/pics/20220705101442.png
 * 
 * 提示:
 *  2 <= n <= 2 * 10^5
 *  0 <= edges.length <= 2 * 10^5
 *  edges[i].length == 2
 *  0 <= ui, vi <= n - 1
 *  ui != vi
 *  0 <= start, end <= n - 1
 *  不存在双向边
 *  不存在指向顶点自身的边
 */

const validPath = (n, edges, start, end) => {
    const father = []

    // 并查集初始化
    const init = () => {
        for (let i = 0; i < n; ++i) {
            father[i] = i;
        }
    }

    // 并查集里寻根的过程
    const find = (u) => {
        return u == father[u] ? u : father[u] = find(father[u]);
    }

    // 判断 u 和 v 是否找到同一个根
    const isSame = (u, v) => {
        u = find(u);
        v = find(v);

        return u == v;
    }

    // 将 v -> u 这条边加入并查集
    const join = (u, v) => {
        // 寻找u的根
        u = find(u); 
        // 寻找v的根
        v = find(v); 

        // 如果发现根相同，则说明在一个集合，不用两个节点相连直接返回
        if (u == v) return; 

        father[v] = u;
    }


    init()
    for (let i = 0; i < edges.length; i++) {
        join(edges[i][0], edges[i][1]);
    }

    return isSame(start, end);
}



// 测试
const n1 = 3
const edges1 = [[0, 1], [1, 2], [2, 0]]
const start1 = 0
const end1 = 2
const n2 = 6
const edges2 = [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]]
const start2 = 0
const end2 = 5

console.log(validPath(n1, edges1, start1, end1))
console.log(validPath(n2, edges2, start2, end2))
