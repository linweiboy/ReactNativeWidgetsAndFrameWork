
/**
 * 判断系统时间是否被修改
 * @param {*} lastTime 
 * 时间被修改也要可点击
 */

export default function (lastTime) {
    if (lastTime == 0) return true;
    let newTime = (new Date()).getTime();
    if (newTime < lastTime) return true;
    return false;
}