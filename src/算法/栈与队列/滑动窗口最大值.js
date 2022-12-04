/**
 * 滑动窗口最大值
 * https://leetcode.cn/problems/sliding-window-maximum/
 * 
 * 题意：
 *  给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
 *  返回滑动窗口中的最大值。
 * 
 * 进阶：
 *  你能在线性时间复杂度内解决此题吗？
 * 
 * 示例：
 *  输入：
 *      nums = [1, 3, -1, -3, 5, 3, 6, 7]
 *      k = 3
 *  输出：
 *      [3, 3, 5, 5, 6, 7]
 * 
 * 提示：
 *  1 <= nums.length <= 10^5
 *  -10^4 <= nums[i] <= 10^4
 *  1 <= k <= nums.length
 * 
 * 
 * 复杂度：
 *  时间复杂度 $O(n)$
 *  空间复杂度 $O(k)$
 */

const maxSlidingWindow = function (nums, k) {
    class MonoQueue {
        queue;
        constructor() {
            this.queue = [];
        }

        // 插入队列
        enqueue(value) {
            let back = this.queue[this.queue.length - 1];
            while (back !== undefined && back < value) {
                this.queue.pop();
                back = this.queue[this.queue.length - 1];
            }
            this.queue.push(value);
        }

        // 删除
        dequeue(value) {
            let front = this.front();

            if (front === value) {
                this.queue.shift();
            }
        }

        // 查看
        front() {
            return this.queue[0];
        }
    }

    let helperQueue = new MonoQueue();
    let i = 0, j = 0;
    let resArr = [];

    // 第一次的窗口
    while (j < k) {
        helperQueue.enqueue(nums[j++]);
    }
    resArr.push(helperQueue.front());

    // 剩下移动的窗口
    while (j < nums.length) {
        helperQueue.enqueue(nums[j]);
        helperQueue.dequeue(nums[i]);
        resArr.push(helperQueue.front());
        i++, j++;
    }

    return resArr;
};


// 测试
// [3, 3, 5, 5, 6, 7]
const nums = [1, 3, -1, -3, 5, 3, 6, 7]
const k = 3