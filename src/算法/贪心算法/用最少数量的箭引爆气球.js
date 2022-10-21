/**
 * 452. 用最少数量的箭引爆气球
 * 
 * 在二维空间中有许多球形的气球。对于每个气球，提供的输入是水平方向上，气球直径的开始和结束坐标。由于它是水平的，所以纵坐标并不重要，因此只要知道开始和结束的横坐标就足够了。开始坐标总是小于结束坐标。
 * 一支弓箭可以沿着 x 轴从不同点完全垂直地射出。在坐标 x 处射出一支箭，若有一个气球的直径的开始和结束坐标为 xstart，xend， 且满足  xstart ≤ x ≤ xend，则该气球会被引爆。可以射出的弓箭的数量没有限制。 弓箭一旦被射出之后，可以无限地前进。我们想找到使得所有气球全部被引爆，所需的弓箭的最小数量。
 * 给你一个数组 points ，其中 points [i] = [xstart,xend] ，返回引爆所有气球所必须射出的最小弓箭数。
 * 
 * 示例 1：
 *  输入：points = [[10,16],[2,8],[1,6],[7,12]]
 *  输出：2
 *  解释：对于该样例，x = 6 可以射爆 [2,8],[1,6] 两个气球，以及 x = 11 射爆另外两个气球
 * 
 * 示例 2：
 *  输入：points = [[1,2],[3,4],[5,6],[7,8]]
 *  输出：4
 * 
 * 示例 3：
 *  输入：points = [[1,2],[2,3],[3,4],[4,5]]
 *  输出：2
 * 
 * 示例 4：
 *  输入：points = [[1,2]]
 *  输出：1
 * 
 * 示例 5：
 *  输入：points = [[2,3],[2,3]]
 *  输出：1
 * 
 * 提示：
 *  0 <= points.length <= 10^4
 *  points[i].length == 2
 *  -2^31 <= xstart < xend <= 2^31 - 1
 * 
 * https://img-blog.csdnimg.cn/20201123101929791.png
 * 时间复杂度：O(nlog n)，因为有一个快排
 * 空间复杂度：O(1)，有一个快排，最差情况(倒序)时，需要n次递归调用。因此确实需要O(n)的栈空间
 */
const findMinArrowShots = function(points) {
    // 排序
    points.sort((a, b) => {
        return a[0] - b[0]
    })

    // points 不为空至少需要一支箭
    let result = 1
    for (let i = 1; i < points.length; i++) {
        // 气球i和气球i-1不挨着，注意这里不是>=
        if (points[i][0] > points[i - 1][1]) {
            // 需要一支箭
            result++
        }
        // 气球i和气球i-1挨着
        else {
            // 更新重叠气球最小右边界
            points[i][1] = Math.min(points[i - 1][1], points[i][1])
        }
    }

    return result
}


// 测试
const points1 = [[10,16],[2,8],[1,6],[7,12]]
const points2 = [[1,2],[3,4],[5,6],[7,8]]
const points3 = [[1,2],[2,3],[3,4],[4,5]]
const points4 = [[1,2]]
const points5 = [[2,3],[2,3]]
console.log(findMinArrowShots(points1))
console.log(findMinArrowShots(points2))
console.log(findMinArrowShots(points3))
console.log(findMinArrowShots(points4))
console.log(findMinArrowShots(points5))