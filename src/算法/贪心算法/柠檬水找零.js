/**
 * 860.柠檬水找零
 * 
 * 在柠檬水摊上，每一杯柠檬水的售价为 5 美元。
 * 顾客排队购买你的产品，（按账单 bills 支付的顺序）一次购买一杯。
 * 每位顾客只买一杯柠檬水，然后向你付 5 美元、10 美元或 20 美元。你必须给每个顾客正确找零，也就是说净交易是每位顾客向你支付 5 美元。
 * 注意，一开始你手头没有任何零钱。
 * 如果你能给每位顾客正确找零，返回 true ，否则返回 false 。
 * 
 * 示例 1：
 *  输入：[5,5,5,10,20]
 *  输出：true
 *  解释：
 *      前 3 位顾客那里，我们按顺序收取 3 张 5 美元的钞票。
 *      第 4 位顾客那里，我们收取一张 10 美元的钞票，并返还 5 美元。
 *      第 5 位顾客那里，我们找还一张 10 美元的钞票和一张 5 美元的钞票。
 *      由于所有客户都得到了正确的找零，所以我们输出 true。
 * 
 * 示例 2：
 *  输入：[5,5,10]
 *  输出：true
 * 
 * 示例 3：
 *  输入：[10,10]
 *  输出：false
 * 
 * 示例 4：
 *  输入：[5,5,10,10,20]
 *  输出：false
 *  解释：
 *      前 2 位顾客那里，我们按顺序收取 2 张 5 美元的钞票。
 *      对于接下来的 2 位顾客，我们收取一张 10 美元的钞票，然后返还 5 美元。
 *      对于最后一位顾客，我们无法退回 15 美元，因为我们现在只有两张 10 美元的钞票。
 *      由于不是每位顾客都得到了正确的找零，所以答案是 false。
 * 
 * 提示：
 *  0 <= bills.length <= 10000
 *  bills[i] 不是 5 就是 10 或是 20
 */

/**
 * 有如下三种情况：
 *  情况一：账单是5，直接收下。
 *  情况二：账单是10，消耗一个5，增加一个10
 *  情况三：账单是20，优先消耗一个10和一个5，如果不够，再消耗三个5} bills 
 */
const lemonadeChange = function(bills) {
    let fiveCount = 0
    let tenCount = 0

    for (let i = 0; i < bills.length; i++) {
        let bill = bills[i]

        // 情况一: 账单是5，直接收下
        if (bill === 5) {
            fiveCount += 1
        } 
        // 情况二：账单是10，消耗一个5，增加一个10
        else if (bill === 10) {
            if (fiveCount > 0) {
                fiveCount -=1
                tenCount += 1
            }
            else {
                return false
            }
        } 
        // 情况三：账单是20，优先消耗一个10和一个5，如果不够，再消耗三个5} bills 
        else {
            // 优先消耗10美元，因为5美元的找零用处更大，能多留着就多留着
            if (tenCount > 0 && fiveCount > 0) {
                tenCount -= 1
                fiveCount -= 1 
            }
            else if (fiveCount >= 3) {
                fiveCount -= 3
            }
            else {
                return false
            }
        } 
    }

    return true
};



// 测试
const bills1 = [5, 5, 5, 10, 20]
const bills2 = [5, 5, 10]
const bills3 = [10, 10]
const bills4 = [5, 5, 10, 10, 20]
console.log(lemonadeChange(bills1))
console.log(lemonadeChange(bills2))
console.log(lemonadeChange(bills3))
console.log(lemonadeChange(bills4))
