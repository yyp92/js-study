/**
 * 1365.有多少小于当前数字的数字
 * 
 * 给你一个数组 nums，对于其中每个元素 nums[i]，请你统计数组中比它小的所有数字的数目。
 * 换而言之，对于每个 nums[i] 你必须计算出有效的 j 的数量，其中 j 满足 j != i 且 nums[j] < nums[i] 。
 * 以数组形式返回答案。
 * 
 * 示例 1：
 *  输入：nums = [8,1,2,2,3]
 *  输出：[4,0,1,1,3]
 *  解释：
 *      对于 nums[0]=8 存在四个比它小的数字：（1，2，2 和 3）。
 *      对于 nums[1]=1 不存在比它小的数字。
 *      对于 nums[2]=2 存在一个比它小的数字：（1）。
 *      对于 nums[3]=2 存在一个比它小的数字：（1）。
 *      对于 nums[4]=3 存在三个比它小的数字：（1，2 和 2）。
 * 
 * 示例 2：
 *  输入：nums = [6,5,4,8]
 *  输出：[2,1,0,3]
 * 
 * 示例 3：
 *  输入：nums = [7,7,7,7]
 *  输出：[0,0,0,0]
 * 
 * 提示：
 *  2 <= nums.length <= 500
 *  0 <= nums[i] <= 100
 * 
 * 可以排序之后加哈希，时间复杂度为$O(n\log n)
 * https://code-thinking.cdn.bcebos.com/pics/1365.%E6%9C%89%E5%A4%9A%E5%B0%91%E5%B0%8F%E4%BA%8E%E5%BD%93%E5%89%8D%E6%95%B0%E5%AD%97%E7%9A%84%E6%95%B0%E5%AD%97.png
 */
// 方法一：使用哈希表记录位置
const smallerNumbersThanCurrent = function(nums) {
    // 记录数字 nums[i] 有多少个比它小的数字
    const map = new Map();
    // 深拷贝nums
    const res = nums.slice(0);
    res.sort((a, b) => a - b);

    // 构建哈希表
    for (let i = 0; i < res.length; i++) {
        // 遇到了相同的数字，那么不需要更新该 number 的情况
        if (!map.has(res[i])) {
            map.set(res[i], i);
        }
    }

    // 此时map里保存的每一个元素数值 对应的 小于这个数值的个数
    for (let i = 0; i < nums.length; i++) {
        res[i] = map.get(nums[i]);
    }

    return res;
};


// 方法二：不使用哈希表，只使用一个额外数组
const smallerNumbersThanCurrent1 = function(nums) {
    // 深拷贝
    let array = [...nums];
    // 升序排列，此时数组元素下标即是比他小的元素的个数
    array = array.sort((a, b) => a-b);
    let res = [];

    nums.forEach( x => {
        // 即使元素重复也不怕，indexOf 只返回找到的第一个元素的下标
        res.push(array.indexOf(x));
    })

    return res;
};


// 测试
const nums1 = [8,1,2,2,3]
const nums2 = [6,5,4,8]
const nums3 = [7,7,7,7]
console.log(smallerNumbersThanCurrent(nums1))
console.log(smallerNumbersThanCurrent1(nums1))
console.log(smallerNumbersThanCurrent(nums2))
console.log(smallerNumbersThanCurrent1(nums2))
console.log(smallerNumbersThanCurrent(nums3))
console.log(smallerNumbersThanCurrent1(nums3))