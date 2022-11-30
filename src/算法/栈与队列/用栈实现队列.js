/**
 * 用栈实现队列
 * https://leetcode.cn/problems/implement-queue-using-stacks/
 * 
 * 使用栈实现队列的下列操作：
 *  push(x) -- 将一个元素放入队列的尾部。
 *  pop() -- 从队列首部移除元素。
 *  peek() -- 返回队列首部的元素。
 *  empty() -- 返回队列是否为空。
 */

// 使用两个数组的栈方法（push, pop） 实现队列
/**
* Initialize your data structure here.
*/
var MyQueue = function() {
    this.stackIn = [];
    this.stackOut = [];
};
 
 /**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.stackIn.push(x);
};
 
 /**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    const size = this.stackOut.length;

    if (size) {
        return this.stackOut.pop();
    }

    while (this.stackIn.length) {
        this.stackOut.push(this.stackIn.pop());
    }

    return this.stackOut.pop();
};
 
/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    const x = this.pop();
    this.stackOut.push(x);
    return x;
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return !this.stackIn.length && !this.stackOut.length
};
 