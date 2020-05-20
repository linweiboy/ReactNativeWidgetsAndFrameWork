import React, { Component, PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet, Animated, UIManager, findNodeHandle, View as _View, DeviceEventEmitter, Platform,StatusBar
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../utils/Screen";
import { RypTheme } from "../../RypTheme";
import computeProps from "../../utils/computeProps";
import { View, Text } from "native-base";
import HIcon from '../../library/HIcon';

const STYLES = StyleSheet.create({
    container: {

        backgroundColor: "#D3D5DB",
        position: "absolute",
        left: 0,
        right: 0,
    },
    line: {
        flex: 1,
        // borderWidth: 1,
        // borderColor: "red",
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: SCALE_SIZE(46),
        color: "#000000"
    }
})
/**
 * 显示App键盘
 * { animated = 750, callback, valueOnChange }
 */
// export const NotifacationKeyShow = "NotifacationKeyShow";
/**
 * 隐藏App键盘
 * { animated = 750, callback }
 */
// export const NotifacationKeyHidden = "NotifacationKeyHidden";



export class KeyBoard extends Component {
    value = ""
    valueOnChange = null
    constructor(props) {
        super(props);
        this.state = {
            top: new Animated.Value(SCREEN_H)
        }
    }
    /**
     * 
     * @param {*} animated 
     * @param {*} callback 
     * @param {*} valueOnChange 
     */
    show(animated = 750, callback, valueOnChange) {
        this.value = "";
        this.valueOnChange = valueOnChange;
        Animated.timing(this.state.top,
            {
                toValue: SCREEN_H - (this.KeyAllHeight || SCALE_SIZE(this.props.contentHeight)) - (this.props.hasStatusBar ? (Platform.OS == 'ios' ? 20 : StatusBar.currentHeight) : 0),
                duration: animated,
            }
        ).start(callback);
    }
    /**
     * 隐藏键盘
     * @param {*} animated 
     * @param {*} callback 
     */
    hidden(animated = 750, callback) {
        this.keyOnPress = null;
        Animated.timing(this.state.top,
            {
                toValue: SCREEN_H,
                duration: animated,
            }
        ).start(callback);
    }
    /**
     * 
     * @param {*} key 
     */
    _keyOnPress = (key) => {
        this.value = this.value + key
        if (this.valueOnChange)
            this.valueOnChange && this.valueOnChange({ key, value: this.value, type: 1 })
        else
            this.props.valueOnChange && this.props.valueOnChange({ key, value: this.value, type: 1 })

    }
    _delete = () => {
        let key = this.value[this.value.length - 1]
        this.value = this.value.substr(0, this.value.length - 1)
        if (this.valueOnChange)
            this.valueOnChange && this.valueOnChange({ key, value: this.value, type: -1 })
        else
            this.props.valueOnChange && this.props.valueOnChange({ key, value: this.value, type: -1 })
    }
    _renderItem = (key, index) => {
        return (
            <TouchableOpacityThrottle key={key + ""}
                style={{
                    height: SCALE_SIZE(81.5),
                    width: SCALE_SIZE(66),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: "white",
                    borderRadius: SCALE_SIZE(8),
                    marginLeft: index == 0 ? 0 : SCALE_SIZE(8),

                }}
                onPress={() => this._keyOnPress(key)}
            >
                <Text style={[STYLES.textStyle, this.props.textStyle]}>{key}</Text>
            </TouchableOpacityThrottle>
        )
    }
    _renderLine = (keys) => {
        return keys.map((key, index) => {
            return this._renderItem(key, index)
        })
    }
    componentWillUnmount() {
        // this.NotifacationKeyShow && this.NotifacationKeyShow.remove()
        // this.NotifacationKeyHidden && this.NotifacationKeyHidden.remove()
    }
    componentDidMount() {
        setTimeout(() => {
            if (this.refs.bottomContainer)
                UIManager.measure(findNodeHandle(this.refs.bottomContainer), (x, y, w, h) => {
                    this.KeyAllHeight = h;
                })
        }, 500)
    }
    render() {
        return (
            <Animated.View style={[STYLES.container, { top: this.state.top }]}>
                <TouchableOpacityThrottle ref="bottomContainer" activeOpacity={1}>
                    {
                        (this.props.accessOptions && this.props.accessOptions.toolComponent) ? this.props.accessOptions.toolComponent : null
                    }
                    <View style={[{
                        height: SCALE_SIZE(this.props.contentHeight),
                    }]}>
                        {
                            (this.props.keyValues || []).map((key, index) => {
                                let _props = { key }
                                _props["line" + index] = true;
                                return (
                                    <View {..._props} style={[STYLES.line]}>
                                        {
                                            this._renderLine(key.split(""))
                                        }
                                    </View>
                                )
                            })
                        }
                        {
                            this.props.hiddenDelete ? null :
                                <TouchableOpacityThrottle style={{
                                    position: "absolute",
                                    width: SCALE_SIZE(84),
                                    height: SCALE_SIZE(81.5),
                                    bottom: SCALE_SIZE((this.props.contentHeight / 4 - 81) / 2),
                                    right: SCALE_SIZE(8),
                                    borderRadius: SCALE_SIZE(8),
                                    backgroundColor: "#B7B7B7",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                    onPress={this._delete}
                                >
                                    <HIcon name={"keyboard-delete"} color="#FFFFFF" ></HIcon>
                                </TouchableOpacityThrottle>
                        }
                    </View>
                    {
                        (this.props.accessOptions && this.props.accessOptions.bottomComponent) ?
                            this.props.accessOptions.bottomComponent
                            : null
                    }
                </TouchableOpacityThrottle>
            </Animated.View>

        )
    }
}


KeyBoard.defaultProps = {
    contentHeight: 422,
    hiddenDelete: false,
    keyValues: ["1234567890", "QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"],
    accessOptions: {
        // toolComponent: (<View><Text>AAA</Text></View>),
        // bottomComponent: (<View><Text>BB</Text></View>)
    },
    hasStatusBar:true
}

KeyBoard.propTypes = {
    /***
     * 输入更改回调
     */
    valueOnChange: PropTypes.func,
    /**
     * 键盘主体高度 不包括 辅助视图的高度
     */
    contentHeight: PropTypes.number,

    /**
     * 隐藏删除按钮
     */
    hiddenDelete: PropTypes.bool,
    /**
     * 键盘显示的值
     */
    keyValues: PropTypes.array,
    /**
     * 键盘字体样式
     */
    textStyle: PropTypes.any,
    /**
     * 辅助视图
     */
    accessOptions: PropTypes.any,

    hasStatusBar:PropTypes.bool

}