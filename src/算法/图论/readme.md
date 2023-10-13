# 图论


## 并查集

### 并查集常用来解决连通性问题。

大白话就是当我们需要判断两个元素是否在同一个集合里的时候，我们就要想到用并查集。

并查集主要有两个功能：

将两个元素添加到一个集合中。
判断两个元素在不在同一个集合


### 并查集主要有三个功能。
- 寻找根节点，函数：find(int u)，也就是判断这个节点的祖先节点是哪个
- 将两个节点接入到同一个集合，函数：join(int u, int v)，将两个节点连在同一个根节点上
- 判断两个节点是否在同一个集合，函数：isSame(int u, int v)，就是判断两个节点是不是同一个根节点


### 路径优化模板
```C++
int n = 1005; // n根据题目中节点数量而定，一般比节点数量大一点就好
vector<int> father = vector<int> (n, 0); // C++里的一种数组结构

// 并查集初始化
void init() {
    for (int i = 0; i < n; ++i) {
        father[i] = i;
    }
}
// 并查集里寻根的过程
int find(int u) {
    return u == father[u] ? u : father[u] = find(father[u]); // 路径压缩
}

// 判断 u 和 v是否找到同一个根
bool isSame(int u, int v) {
    u = find(u);
    v = find(v);
    return u == v;
}

// 将v->u 这条边加入并查集
void join(int u, int v) {
    u = find(u); // 寻找u的根
    v = find(v); // 寻找v的根
    if (u == v) return ; // 如果发现根相同，则说明在一个集合，不用两个节点相连直接返回
    father[v] = u;
}
```





## 深搜(DFS)三部曲
深搜（dfs）是一条路跑到黑然后在回溯

- 确认递归函数，参数
- 确认终止条件
- 处理目前搜索节点出发的路径



## 广搜(BFS)

广搜（bfs）是一圈一圈的搜索过程
