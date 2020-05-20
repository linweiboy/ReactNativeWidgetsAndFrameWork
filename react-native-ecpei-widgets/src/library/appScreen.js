
/**
 * 屏幕工具类
 * ui设计基准,iphone 6
 * width:750
 * height:1334
 */
import {Dimensions, PixelRatio} from 'react-native'
import theme from "./base-theme";
export let screenW = theme.deviceWidth;
export let screenH = theme.deviceHeight;
const fontScale = PixelRatio.getFontScale();
export let pixelRatio = PixelRatio.get();
//像素密度
export const DEFAULT_DENSITY = 2;
//px转换成dp
//以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的750和1334为对应尺寸即可.
const w2 = 750 / DEFAULT_DENSITY;
//px转换成dp
const h2 = 1334 / DEFAULT_DENSITY;

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px
 * @returns {Number} 返回实际sp
 */
export function setSpText(size: Number) {
    let scaleWidth = screenW / w2;
    let scaleHeight = screenH / h2;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));
    return size / DEFAULT_DENSITY;
}

/**
 * 屏幕适配,缩放size
 * @param size
 * @returns {Number}
 */
export function scaleSize(size: Number) {
    let scaleWidth = screenW / w2;
    let scaleHeight = screenH / h2;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));
    return size / DEFAULT_DENSITY;
}

/**
 * 手机号正则校验
 * @param phoneNumber
 * @returns {BOOL}
 */
export function validatemobile(phoneNumber:string) {
    if (phoneNumber.length == 0) {
        return false;
    }
    if (phoneNumber.length != 11) {
        return false;
    }
    var PATTERN_CHINAMOBILE = /^1(3[4-9]|5[012789]|8[23478]|4[7]|7[8])\d{8}$/; //移动号
    var PATTERN_CHINAUNICOM = /^1(3[0-2]|5[56]|8[56]|4[5]|7[6])\d{8}$/; //联通号
    var PATTERN_CHINATELECOM = /^1(3[3])|(8[019])\d{8}$/; //电信号
    if (PATTERN_CHINAUNICOM.test(phoneNumber)) {
        return true;
    } else if (PATTERN_CHINAMOBILE.test(phoneNumber)) {
        return true;
    } else if (PATTERN_CHINATELECOM.test(phoneNumber)) {
        return true;
    }else {
        return false;
    }
  }
  
  export function validate(phoneNumber:string){
    //只能输入数字
    var reg = new RegExp("^[0-9]*$");
    if(!reg.test(phoneNumber)){
        return false;
    }
    //匹配数字字符
    if(!/^[0-9]+$/.test(phoneNumber)){
        return false;
    }
    return true;
  }

//
export function testEnglishOrNumber(text:string){
    //只能输入由数字和26个英文字母组成的字符串
    const reg = new RegExp('^[A-Za-z0-9]+$')
    if(reg.test(text)){
        return true;
    }
    return false
}

//
export function testChinese(text:string){
    //检测匹配中文
    const reg = new RegExp('^[\u4e00-\u9fa5]*$');
    if(reg.test(text)){
        return true
    }
    return false
}

//
export function testEmoji(text:string){
    let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
    if(regStr.test(text)){
        return true
    }
    return false
}

  
