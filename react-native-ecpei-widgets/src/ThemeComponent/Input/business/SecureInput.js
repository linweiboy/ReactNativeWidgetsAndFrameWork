
import React, { Component, PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet, TextInput as _TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle } from "../../Button/TouchableThrottle";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../../utils/Screen";
import { RypTheme } from "../../../RypTheme";
import computeProps from "../../../utils/computeProps";
import { View, Text } from "native-base";
import { InputProperty } from '../BaseInput';
import { TextInput } from "../TextInput";
import HIcon from '../../../library/HIcon';

export class SecureInput extends InputProperty {
    constructor(props) {
        super(props);
        this.state = {
            Secure: this.props.Secure
        }
    }
    getValue() { return this.input.getValue() }
    getTextInputInstance() { return this.input.getTextInputInstance() }
    setValue(value) { this.input.setValue(value) }

    // componentWillReceiveProps(nextP) {
    //     if (nextP.Secure != this.state.Secure) {
    //         this.setState({
    //             Secure: nextP.Secure
    //         });
    //     }
    // }
    render() {
        return (
            <TextInput {...this.props} ref={r => this.input = r}
                secureTextEntry={this.state.Secure}
                rightAssistComponent={(ing, value) => {
                    let icon;
                    if (typeof (this.state.Secure ? this.props.SecureSelectIcon : this.props.SecureNormalIcon) == "string")
                        icon = {
                            name: this.state.Secure ? this.props.SecureSelectIcon : this.props.SecureNormalIcon,
                            size: 17
                        }
                    else
                        icon = this.state.Secure ? this.props.SecureSelectIcon : this.props.SecureNormalIcon
                    return (
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacityThrottle activeOpacity={1} style={[{
                                padding: 12,
                            }, this.props.SecureContainerStyle]} onPress={() => {
                                this.setState({ Secure: !this.state.Secure }, () => {
                                    this.getTextInputInstance().blur()
                                });
                            }}>
                                <HIcon {...icon}></HIcon>
                            </TouchableOpacityThrottle>
                        </View>
                    )
                }}
            >
            </TextInput>
        )
    }

}

SecureInput.defaultProps = {
    ...TextInput.defaultProps,
    Secure: true,
    SecureNormalIcon: "wechat",
    SecureSelectIcon: "wechat",
    clearIcon: "wechat"
}

SecureInput.propTypes = {
    /**
     * 继承TextInput
     */
    ...TextInput.propTypes,
    Secure: PropTypes.bool,
    SecureContainerStyle: PropTypes.any,
    SecureNormalIcon: PropTypes.any,
    SecureSelectIcon: PropTypes.any,
}