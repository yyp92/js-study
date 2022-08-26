/**
 * 两个数组的交集
 */
const intersection = function(nums1, nums2) {
    // 根据数组大小交换操作的数组
    if (nums1.length < nums2.length) {
        const _ = nums1;
        nums1 = nums2;
        nums2 = _;
    }

    const nums1Set = new Set(nums1);
    const resSet = new Set();
    // for(const n of nums2) {
    //     nums1Set.has(n) && resSet.add(n);
    // }
    // 循环 比 迭代器快
    for (let i = nums2.length - 1; i >= 0; i--) {
        nums1Set.has(nums2[i]) && resSet.add(nums2[i]);
    }

    return Array.from(resSet);
};


// 测试
const nums1 = [1, 2, 2, 1]
const nums2 = [2, 2]
const nums3 = [4, 9, 5]
const nums4 = [9, 4, 9, 8, 4]
console.log(intersection(nums1, nums2))
console.log(intersection(nums3, nums4))
