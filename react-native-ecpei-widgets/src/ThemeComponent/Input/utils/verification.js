
function _commond(value, reg) {
    let _result = value.match(reg)
    if (_result == null) return ""
    return _result[0]
}

/**
 * 检查是否是数字 输入过程中的验证
 * @param {*} value 
 */
export function isNumber(value) {
    return _commond(value, /^\d+(\.\d+)?/);
}

/**
 * 判断是否为英文字母 输入过程中的验证
 * @param {*} value 
 */
export function isEnglish(value) {
    return _commond(value, /^[A-Za-z]+/);
}

/**
 * 判断全部为中文 输入过程中的验证
 * @param {*} value 
 */
export function isChinese(value) {
    return _commond(value, /^[\u0391-\uFFE5]+/);
}

export function isMaxLength(length) {
    return function (value) {
        if (value.length <= length) return value;
        return value.substring(0, length)
    }
}
// /**
//  * 简单判断是否为电话号码
//  * @param {*} value 
//  */
// export function isPhoneNumber(value) {
//     if (value == null) return false;
//     var reg = /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/;
//     if (reg.test(value)) {
//         return true;
//     }
//     return false;
// }
