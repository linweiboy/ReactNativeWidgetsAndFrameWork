import { Dimensions } from 'react-native'

const ScaledSize = Dimensions.get("window")
const ScreenW = ScaledSize.width;
const ScreenH = ScaledSize.height;
/**
 * 当前设计稿的标准
 */
const DEFAULT = {
    /**
     * 像素比例
     */
    DesignScale: 2,
    /**
     * 设计稿宽
     */
    DesignWidth: 750,
    /**
     * 设计稿高
     */
    DesignHeight: 1334
}

/**
 * 宽 px 转为dp
 */
const WScale = DEFAULT.DesignWidth / DEFAULT.DesignScale;


/***
 * 高 px 转为dp
 */

const HScale = DEFAULT.DesignHeight / DEFAULT.DesignScale;


function scaleSize(size) {
    let scaleW = ScreenW / WScale;
    let scaleH = ScreenH / HScale;
    let minScale = Math.min(scaleH, scaleW);
    size = Math.round(size * minScale + 0.5);
    return size / DEFAULT.DesignScale;
}



export {
    scaleSize,
    ScreenW,
    ScreenH
}