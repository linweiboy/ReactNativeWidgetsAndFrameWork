

import React, { Component } from 'react';
import {
    StyleSheet, Dimensions, Modal, TextStyle, FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../utils/Screen";
import { RypTheme } from "../../RypTheme";
import HIcon from "../../library/HIcon";
import { View, Text } from "native-base";

const STYLES = StyleSheet.create({
    Type1_container: {
        width: SCALE_SIZE(96)
    },
    Type1_content: {
        borderRadius: SCALE_SIZE(8),
        backgroundColor: "rgba(0,0,0,0.70)"
    },
    Type1_item: { height: SCALE_SIZE(77), justifyContent: 'center', alignItems: 'center', },
    Type1_line: { height: 0.5, marginHorizontal: SCALE_SIZE(15), backgroundColor: "white", },
    Type1_item_text: { fontFamily: 'PingFang-SC-Regular', fontSize: SCALE_SIZE(26), color: "white" },

    Type1_tip_bottom_Container: { height: SCALE_SIZE(12), overflow: 'hidden', backgroundColor: "rgba(0,0,0,0)", alignItems: 'center', },
    Type1_tip_bottom: { width: 6, height: 6, transform: [{ rotateZ: '45deg' }], backgroundColor: "rgba(0,0,0,1)", marginTop: SCALE_SIZE(-8), },
    Type1_tip_top: { width: 6, height: 6, transform: [{ rotateZ: '45deg' }], backgroundColor: "rgba(0,0,0,1)", marginLeft: SCALE_SIZE(60), marginTop: SCALE_SIZE(8), },


    Type2_container: { width: SCALE_SIZE(432) },
    Type2_tip_container: {
        height: SCALE_SIZE(20),
        overflow: 'hidden',
        backgroundColor: "rgba(0,0,0,0)",
    },
    Type2_tip_top: {
        width: 16,
        height: 16,
        transform: [{ rotateZ: '45deg' }],
        backgroundColor: "rgba(0,0,0,1)",
        marginTop: 4,
        backgroundColor: "#4281FF"
    },
    Type2_tip_bottom: {
        width: 16,
        height: 16,
        transform: [{ rotateZ: '-45deg' }],
        backgroundColor: "rgba(0,0,0,1)",
        marginTop: -10,
        backgroundColor: "#4281FF"
    },
    Type2_content: {
        backgroundColor: "red",
        flexDirection: 'row',
        paddingVertical: SCALE_SIZE(10),
        paddingHorizontal: SCALE_SIZE(20),
        borderRadius: SCALE_SIZE(8),
        backgroundColor: "#4281FF"
    },
    Type2_text: { fontFamily: "PingFang-SC-Regular", fontSize: SCALE_SIZE(24), lineHeight: SCALE_SIZE(36), color: "white" }
})

function ShowMenu(props) {
    switch (props.showType) {
        case MenuType.TYPE1.showType:
            //判断是否在顶部显示
            return function (target) {
                let isBottom = props.isBottom;
                return (
                    <View style={STYLES.Type1_container}>
                        {
                            isBottom ?
                                <View style={{ height: SCALE_SIZE(12), overflow: 'hidden', backgroundColor: "rgba(1,1,1,0)" }}>
                                    <View style={STYLES.Type1_tip_top}>

                                    </View>
                                </View> : null
                        }
                        <View style={STYLES.Type1_content}>
                            {
                                props.data.map((item, index) => {
                                    return (
                                        [
                                            <TouchableOpacityThrottle onPress={() => target._onPress(item)} key={item.title} style={STYLES.Type1_item}>
                                                <Text style={[STYLES.Type1_item_text, item.style]}>
                                                    {item.title}
                                                </Text>
                                            </TouchableOpacityThrottle>,
                                            (index != (props.data.length - 1)) ? (
                                                <View style={STYLES.Type1_line} key={item.title + 1}></View>
                                            ) : null
                                        ]
                                    )
                                })
                            }
                        </View>
                        {
                            !isBottom ?
                                <View style={STYLES.Type1_tip_bottom_Container}>
                                    <View style={STYLES.Type1_tip_bottom}>

                                    </View>
                                </View> : null
                        }
                    </View>
                )
            }
            break
        case MenuType.TYPE2.showType:
            return function (target) {
                let isBottom = props.isBottom
                return (
                    <View style={STYLES.Type2_container}>
                        {
                            isBottom ?
                                <View style={STYLES.Type2_tip_container}>
                                    <View style={[STYLES.Type2_tip_top, { marginLeft: props.tipLeft - 8 }]}></View>
                                </View>
                                : null
                        }
                        <View style={STYLES.Type2_content}>
                            <View style={{ flex: 1 }}>
                                <Text style={[STYLES.Type2_text, props.data.style]}>
                                    {props.data.title}
                                </Text>
                            </View>
                            <TouchableOpacityThrottle onPress={() => target._onPress(props.data)} style={{ width: SCALE_SIZE(40), alignItems: 'center', paddingTop: SCALE_SIZE(5) }} activeOpacity={1}>
                                <HIcon name={"close"} size={14} color={"white"}></HIcon>
                            </TouchableOpacityThrottle>
                        </View>
                        {
                            !isBottom ?
                                <View style={STYLES.Type2_tip_container}>
                                    <View style={[STYLES.Type2_tip_bottom, { marginLeft: props.tipLeft - 8 }]}></View>
                                </View>
                                : null
                        }
                    </View>
                )
            }
            break

    }
}

export class MenuPopup extends Component {
    constructor(props) {
        super(props);
    }
    _onPress = (item) => {
        this.props.onPress && this.props.onPress(item)
    }
    render() {
        let left = 0
        let top = 0;
        let views = null;
        if (this.props.customView) {
            left = this.props.location.left;
            top = this.props.location.top;
            views = this.props.customView(this.props)(this);
        } else {
            const { x, y, w, h } = this.props.location;
            let Props = {
                ...this.props,
                location: {
                    ...this.props,
                    left: x + w / 2,
                    top: y + h / 2
                }
            }
            top = Props.location.top;
            let isBottom = true;
            let isLeft = true;
            let tipLeft = 0;
            if (this.props.showType == MenuType.TYPE1.showType) {
                left = x + w / 2 - SCALE_SIZE(96 / 2)
                isBottom = y + h + SCALE_SIZE(77 * this.props.data.length) + 20 < SCREEN_H;
                if (!isBottom) {
                    top = y - SCALE_SIZE(77 * this.props.data.length) - 5
                } else {
                    top = y + h - 5;
                }
            } else if (this.props.showType == MenuType.TYPE2.showType) {
                isLeft = x + w / 2 < (SCREEN_W / 2)
                isBottom = (y + h + SCALE_SIZE(96) + 20) < SCREEN_H;
                if (isLeft) {
                    left = SCALE_SIZE(40)
                } else {
                    left = SCREEN_W - SCALE_SIZE(40 + 432)
                }
                if (isBottom) {
                    top = y + h;
                } else {
                    top = y - SCALE_SIZE(96) - 8;
                }
                tipLeft = x + w / 2 - left;
            }

            if (left < 20) left = 20;
            views = ShowMenu({ ...Props, tipLeft, isBottom })(this);
        }
        return (
            <View style={{ position: "absolute", left: left, top: top }}>
                {
                    views
                }
            </View>
        )
    }

}


export const MenuType = {
    TYPE1: {
        _type: "MenuPopup",
        showType: 999,
        location: { x: 0, y: 0, w: 0, h: 0 },
        customView: null,
        data: [
            {
                title: "编辑"
            },
            {
                title: "删除",
            }
        ]
    },
    TYPE2: {
        _type: "MenuPopup",
        showType: 1000,
        location: { x: 0, y: 0, w: 0, h: 0 },
        customView: null,
        data: {
            title: "你需要设置展示的文本质保期设定仅对当前报价商品有效！",
            style: null
        }
    }
}
MenuPopup.defaultProps = {
    showType: 1000,
    location: { x: 0, y: 0, w: 0, h: 0 },
    customView: null,
    data: {
        title: "你需要设置展示的文本质保期设定仅对当前报价商品有效！",
        style: null
    }
}
/***
 * 不接受props变化 只能创建时 指定
 */
MenuPopup.propTypes = {
    /***1000 */
    showType: PropTypes.number,
    location: PropTypes.any,
    customView: PropTypes.any,
    data:PropTypes.any,
    /***
     * 关闭按钮触发
     */
    onPress:PropTypes.func,
}
