/**
 * 所有可能的路径
 * 
 * https://leetcode.cn/problems/all-paths-from-source-to-target/
 * 
 * 给你一个有 n 个节点的 有向无环图（DAG），请你找出所有从节点 0 到节点 n-1 的路径并输出（不要求按特定顺序）
 * ! graph[i] 是一个从节点 i 可以访问的所有节点的列表（即从节点 i 到节点 graph[i][j]存在一条有向边）。
 * 
 * https://code-thinking-1253855093.file.myqcloud.com/pics/20221203135439.png
 * 
 * 提示：
 *  n == graph.length
 *  2 <= n <= 15
 *  0 <= graph[i][j] < n
 *  graph[i][j] != i（即不存在自环）
 *  graph[i] 中的所有元素 互不相同
 *  保证输入为 有向无环图（DAG）
 */


const allPathsSourceTarget = function(graph) {
    // 用来存放满足条件的路径
    let res=[]
    // 0节点到终点的路径
    let path=[]

    /**
     * dfs
     * @param {*} graph 存当前的图
     * @param {*} start 目前遍历的节点
     */
    function dfs(graph, start) {
        // 要求从节点 0 到节点 n-1 的路径并输出，所以是 graph.length - 1
        // 找到符合条件的一条路径
        if (start === graph.length - 1) {
            res.push([...path])

            return;
        }

        // 找到符合条件的一条路径
        for (let i = 0; i < graph[start].length; i++) {
            // 找到符合条件的一条路径
            path.push(graph[start][i])

            // 进入下一层递归
            dfs(graph, graph[start][i])

            // 进入下一层递归
            path.pop()
        }
    }

    // 无论什么路径已经是从0节点出发
    path.push(0)
    // 开始遍历
    dfs(graph, 0)

    return res
};



// 测试
const graph1 = [[1, 2], [3], [3], []]
const graph2 = [[4, 3, 1], [3, 2, 4], [3], [4], []]

// [ [ 0, 1, 3 ], [ 0, 2, 3 ] ]
// console.log(allPathsSourceTarget(graph1))
/**
[
    [ 0, 4 ],
    [ 0, 3, 4 ],
    [ 0, 1, 3, 4 ],
    [ 0, 1, 2, 3, 4 ],
    [ 0, 1, 4 ]
]
*/
console.log(allPathsSourceTarget(graph2))

