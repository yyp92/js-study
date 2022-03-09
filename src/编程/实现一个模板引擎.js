/**
 * 实现一个模板引擎
 * https://github.com/mqyqingfeng/Blog/issues/63
 * 
 * 那我们换个思路，依然是用正则，但是我们
 *  将 %> 替换成 p.push('
 *  将 <% 替换成 ');
 *  将 <%=xxx%> 替换成 ');p.push(xxx);p.push('
 */

function tmpl(str, data) {
    var str = document.getElementById(str).innerHTML;

    var fn = new Function("obj",
    "var p = []; with(obj){p.push('" +

    str
    .replace(/[\r\t\n]/g, "")
    .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
    .replace(/<%/g, "');")
    .replace(/%>/g,"p.push('")

    + "');}return p.join('');");

    var template = function(data) {
        return fn.call(this, data)
    }
    return template;
};

// 使用时
var compiled = tmpl("user_tmpl");
results.innerHTML = compiled(data);