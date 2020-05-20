/*
 * @Creator: 朱子豪 
 * @Date: 2018-12-04 19:21:19 
 * @Last Modified by: 朱子豪
 * @Last Modified time: 2019-05-29 14:37:06
 * @Desc: 
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Dimensions, ViewPropTypes, TextStyle
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../utils/Screen";
import { RypTheme } from "../../RypTheme";
import { View, Text } from "native-base";


const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        zIndex: 999999,
        backgroundColor: "rgba(0,0,0,0.4)",
        width: SCREEN_W,
        height: SCREEN_H
    }
})
/**
 *  <Picker ref="picker" items={[]} onPress={(item) => {console.log(121212, item)}}></Picker>
 * 
 *  this.refs.picker.show() this.refs.picker.show([11,22,33])
 */
class ItemsPicker extends Component {
    static contextTypes = {
        theme: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            show: false,//展示选择框
            items: this.props.items, //显示类目
            channel: "", //标识
        }
    }
    /**
     * 关闭
     */
    close(){
        this.setState({
            show:false
        });
    }
    /**
     * 显示类目 
     * @param {*} items  ["aaaa","bbbb"]
     */
    show(items, channel) {
        if (items && items.length >= 1) {
            this.setState({ show: true, items, channel });
        } else {
            this.setState({ show: true, channel });
        }
    }
    /**
     * 隐藏视图
     * @param {*} item 
     */
    _hidden(item) {
        this.setState({
            show: false
        }, () => {
            this.props.onPress && this.props.onPress({ ...item, channel: this.state.channel });
        })
    }
    /**
     * 渲染Items
     */
    _renderItems = () => {
        let views = []
        let len = this.state.items.length
        for (var index = 0; index < len; index++) {
            let item = this.state.items[index]
            let indexs = index;
            views.push(
                <TouchableOpacityThrottle activeOpacity={1} key={index + ""}
                    onPress={() => {
                        this._hidden({ select: true, item, indexs })
                    }}
                >
                    <View style={[this.props.itemContainerStyle]}>
                        <Text style={[this.props.itemTextStyle]}>
                            {
                                item
                            }
                        </Text>
                    </View>
                </TouchableOpacityThrottle>
            )
            views.push(
                <View key={index + 100 + ""} style={{ height: SCALE_SIZE(2), backgroundColor: "#B7B7B7" }}></View>
            )
        }
        views.splice(views.length - 1, 1);
        return views;
    }
    render() {
        return this.state.show ?
            <TouchableOpacityThrottle activeOpacity={1} style={STYLES.container} onPress={() => {
                if (this.props.backgroundTouchHidden) {
                    this._hidden({ select: false, item: null });
                }
            }}>
                <View style={{ flex: 1 }}></View>
                <View {...this.props}>
                    <View pickertop style={{ overflow: "hidden" }} >
                        {
                            this._renderItems()
                        }
                    </View>
                    <TouchableOpacityThrottle activeOpacity={1} onPress={() => {
                        this._hidden({ select: false, item: null });
                    }}>
                        <View pickerbottom style={[this.props.cancelContaienrStyle]}>
                            <Text style={[this.props.cancelTextStyle]}>
                                {
                                    this.props.cancelText
                                }
                            </Text>
                        </View>
                    </TouchableOpacityThrottle>
                </View>
            </TouchableOpacityThrottle>
            : null
    }
}

ItemsPicker.defaultProps = {
    cancelText: "取消",
    backgroundTouchHidden: false,
    items: [],
}
ItemsPicker.propTypes = {
    /**
     * 取消文本
     */
    cancelText: PropTypes.string,
    /***
     * 取消文本样式
     */
    cancelTextStyle: PropTypes.oneOf([
        TextStyle,
        Number
    ]),
    /***
     * 取消按钮容器
     */
    cancelContaienrStyle: PropTypes.oneOf([
        TextStyle,
        Number
    ]),
    /**
     * 显示的数据源
     */
    items: PropTypes.array,
    /***
     * 单元格 样式
     */
    itemContainerStyle: PropTypes.oneOf([
        TextStyle,
        Number
    ]),
    /***
     * 单元格字体样式
     */
    itemTextStyle: PropTypes.oneOf([
        TextStyle,
        Number
    ]),
    /**
     * 点击背景 隐藏
     */
    backgroundTouchHidden: PropTypes.bool,
    /**
     * 点击
     */
    onPress: PropTypes.func

}

const ThemeItemsPicker = RypTheme.registerComponent("NativeBase.RypItemPicker", ItemsPicker);

export {
    ThemeItemsPicker as ItemsPicker
}