/*
 * @Creator: 朱子豪 
 * @Date: 2018-12-06 15:14:20 
 * @Last Modified by: 朱子豪
 * @Last Modified time: 2018-12-07 10:28:34
 * @Desc: 计算运行设备的环境
 */

const X_WIDTH = 375;
const X_HEIGHT = 812;
import { ScreenH, ScreenW } from "./Screen";

const isIOS = Platform.OS == "ios";
const isAndroid = Platform.OS == "android";
const isIphoneX = isIOS && (ScreenW == X_WIDTH && ScreenH == X_HEIGHT)

let headerHeight = 0;
if (isAndroid) {
    headerHeight = 56;
} else if (isIphoneX) {
    headerHeight = 88;
} else {
    headerHeight = 64;
}
export {
    isIOS,
    isAndroid,
    isIphoneX,
    headerHeight
}