import React, { Component, PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet, TextInput as _TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../utils/Screen";
import { RypTheme } from "../../RypTheme";
import computeProps from "../../utils/computeProps";
import { View, Text } from "native-base";
import { BaseInput, InputProperty } from './BaseInput';
import HIcon from '../../library/HIcon';

const STYLES = StyleSheet.create({
    leftIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    }
})

/**
 * 输入框
 * 包含左侧iocn
 * clear按钮
 * 右侧自定义组件
 */
export class TextInput extends InputProperty {
    _inputing = false;
    constructor(props) {
        super(props);
        this.state = {
            clear: false
        }
    }
    setValue(value) {
        this.input.setValue(value)
        //是否显示clear按钮
        if (value && value.length >= 1) {
            this.setState({ clear: this._inputing });
        }
    }
    getValue = () => { return this.input.getValue() }
    getTextInputInstance() { return this.input.input; }
    render() {
        return (
            <View style={[{ flexDirection: 'row' }, this.props.style]}>
                {
                    this.props.leftIcon ?
                        <View style={[STYLES.leftIconContainer, this.props.leftIconContainerStyle]}>
                            <HIcon name={this.props.leftIcon}></HIcon>
                        </View>
                        :
                        null
                }
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <BaseInput {...this.props}
                        style={this.props.textInputStyle}
                        ref={r => this.input = r}
                        onFocus={(...args) => {
                            this._inputing = true;
                            this.props.onFocus && this.props.onFocus(...args)
                            let result = this.input.getValue();
                            this.setState({ clear: result && result.length >= 1 });
                        }}
                        onBlur={(...args) => {
                            this._inputing = false;
                            this.setState({ clear: false });
                            this.props.onBlur && this.props.onBlur(...args)
                        }}
                        onChangeText={(result) => {
                            this.setState({ clear: result != "" });
                            this.props.onChangeText && this.props.onChangeText(result)
                        }}
                    >
                    </BaseInput>
                </View>
                {
                    (this.state.clear && this.props.clearIcon) ?

                        <TouchableOpacityThrottle onPress={() => {
                            this.input && this.input.input && this.input.input.clear();
                            this.setState({ clear: false }, () => {
                                this.props.onClearAway && this.props.onClearAway()
                            });
                        }}
                            style={[{
                                marginRight: 10,
                                minHeight: SCALE_SIZE(80),
                                paddingHorizontal:5,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }, this.props.clearIconContainerStyle]}
                        >
                            <HIcon name={this.props.clearIcon}></HIcon>
                        </TouchableOpacityThrottle>

                        : null
                }
                {
                    (this.props.rightAssistComponent && typeof this.props.rightAssistComponent == "function")
                        ?
                        this.props.rightAssistComponent(this._inputing, (this.input ? this.getValue() : this.state.value) || "")
                        : null
                }

            </View >
        )
    }
}
TextInput.defaultProps = {
    // clearIcon: "wechat",
    // leftIcon: "wechat"
}

TextInput.propTypes = {
    /**
     * 继承BaseInput
     */
    ...BaseInput.propTypes,
    /***
     * 输入框文本样式
     */
    textInputStyle: PropTypes.any,
    /**
     * 右侧自定义组件
     *  (input,value)=>node
     */
    rightAssistComponent: PropTypes.func,
    /***
     * 左侧图标名称 null  不显示图标
     */
    leftIcon: PropTypes.string,
    /**
     * 当有左侧图标时  包含Icon的容器样式
     */
    leftIconContainerStyle: PropTypes.any,
    /**
     * 清除按钮 null 时  不显示清除按钮
     */
    clearIcon: PropTypes.string,
    /**
     * clear 按钮容器样式
     */
    clearIconContainerStyle: PropTypes.any,
    /**
     * 清除按钮点击
     */
    onClearAway: PropTypes.func
}