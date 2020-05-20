import React, { Component, PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../utils/Screen";
import { RypTheme } from "../../RypTheme";
import computeProps from "../../utils/computeProps";
import { View, Text } from "native-base";

export class InputProperty extends Component {
    getValue() { }
    getTextInputInstance() { }
    setValue(value) { }
}

/**
 * 最基础的输入框组件
 */
export class BaseInput extends InputProperty {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }
    getValue = () => { return this.state.value }
    setValue(value) { this.setState({ value }); }
    getTextInputInstance() { return this.input }

    render() {
        return (
            <View style={[{ width: "100%" }]}>
                <TextInput  {...this.props} style={[this.props.textInputStyle, { width: "100%" }]}
                    ref={r => this.input = r}
                    value={this.state.value}
                    onChangeText={(value) => {
                        var result = value;
                        if (Array.isArray(this.props.verification)) {
                            this.props.verification.forEach(element => {
                                if (typeof element == "function") {
                                    result = element(result);
                                }
                            });
                        }
                        this.setState({ value: result || "" }, () => {
                            this.props.onChangeText && this.props.onChangeText(result)
                        });
                    }} onBlur={(...args) => {
                        if (Array.isArray(this.props.blurVerification)) {
                            var result = this.state.value;
                            for (let index = 0; index < this.props.blurVerification.length; index++) {
                                const element = this.props.blurVerification[index];
                                if (typeof element == "function") {
                                    if (element(result) == false) {
                                        this.props.onBlur && this.props.onBlur(...args.concat(false))
                                        break
                                    }
                                }
                            }
                            return
                        }
                        this.props.onBlur && this.props.onBlur(...args)
                    }}>
                </TextInput>
            </View>
        )
    }
}

BaseInput.defaultProps = {
    numberOfLines: 1,
    placeholder: "请输入。。。",
    underlineColorAndroid: "transparent",
    verification: []
}

BaseInput.propTypes = {
    ...TextInput.propTypes,
    /***
     * TextInput 样式
     */
    textInputStyle: PropTypes.any,
    /**
     * 输入过程中的验证函数
     * [
     *      (value:string)=>string
     * ]
     */
    verification: PropTypes.array,
    /**
     * 当失去焦点的验证
     * [
     *      (value:string)=>bool
     * ]
     */
    blurVerification: PropTypes.array
}