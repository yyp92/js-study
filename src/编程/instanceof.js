/**
 * 模拟instanceof
 */
// l: 目标元素 r: 构造函数
function instanceof1(l, r) {
    l = l.__proto__
    r = r.prototype

    while(true) {
        if (l === null) {
            return false
        }

        if (l === r) {
            return true
        }
        
        l = l.__proto__
    }
}