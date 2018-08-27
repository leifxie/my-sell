// 日期格式化
export function formatDate (date, fmt) {
  if (!fmt || !date) return; // 参数不存在的话不执行函数
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份,由于月份从0开始，所以要加1
    'd+': date.getDate(), // 天
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分钟
    's+': date.getSeconds() // 秒钟
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) { // 注意RegExp.$1匹配的是正则表达式的第一个子串，凡是被括号包裹起来的才是子串。
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
    }
  }
  return fmt;
}

