/**
 * Created by tanlinwei
 *
 * Description:
 */

import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import HIcon from '../../library/HIcon'
import { scaleSize, testChinese, testEmoji } from '../../library/appScreen';
import {  CountownView } from "../Timer";
import BaseInput from './BaseInput';
export default class VerifyCodeInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            opacity: 0,
            inputText: '',
        };
    }

    onChangeOnPress = (text) => {
        const val = testChinese(text);
        const bol = testEmoji(text);
        if (!val && !bol) {
            this.setState({ inputText: text });
            this.props.onChangeText(text)
        }
        if (text.length != 0) {
            this.setState({ opacity: 1 })
        } else {
            this.setState({ opacity: 0, inputText: '', });
            this.props.onChangeText(text);
        }
    };

    onEndEditing = (event) => {
        const text = event.nativeEvent.text;
        this.setState({ inputText: text });
        if (text.length != 0) {
            this.setState({ opacity: 1 })
        } else { this.setState({ opacity: 0 }) }
        this.props.onEndEditingText(text);
    };


    render() {
        const { size, name, placeholder, inputStyle, keyboardType, returnKeyType, maxLength,
            timeCount, callback, style, normalBackColor, countingBackColor, startOnPress, normalTitle,
            countingTitle, titleStyle, titleColor, countingTitleColor, timerStyle } = this.props;
        return (
            <BaseInput style={[styles.searchStyle, style]} >
                <HIcon name={name} style={styles.iconContainerStyle} size={scaleSize(size)} />
                <TextInput ref='input' placeholder={placeholder}
                    style={[styles.inputStyle, inputStyle]}
                    onChangeText={this.onChangeOnPress}
                    onEndEditing={this.onEndEditing}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    value={this.state.inputText}
                    keyboardType={keyboardType}
                    returnKeyType={returnKeyType}
                    maxLength={maxLength}
                    selectionColor={"#DB3727"}
                    underlineColorAndroid='transparent'
                />
                <HIcon name='delete-x' style={[styles.closeStyle, { opacity: this.state.opacity }]} onPress={this.noPressClear} />
                <CountownView style={[{ marginRight:5,marginBottom:2 }, timerStyle]}
                    titleStyle={[styles.timeTextSty, titleStyle]}
                    ref='timer'
                    callback={callback} countingBackColor={countingBackColor}
                    countingTitle={countingTitle} countingTitleColor={countingTitleColor} isVerifyCode={false}
                    normalBackColor={normalBackColor} normalTitle={normalTitle}
                    startOnPress={startOnPress} timeCount={timeCount} titleColor={titleColor} />
            </BaseInput>
        )
    }


    noPressClear = () => {
        this.setState({
            inputText: '',
            opacity: 0,
        });
        this.props.onClearAway();
    };


    blur() {
        this.refs.input.blur();
    }

    onBlur = () => {
        this.props.onBlur();
    };
    onFocus = () => {
        this.props.onFocus();
    }
    timerCode() {
        this.refs.timer.onCountDown(true);
    }
}


const styles = StyleSheet.create({
    iconContainerStyle: {
        paddingHorizontal: 4,
        paddingVertical: 4,
        marginLeft: scaleSize(34),
    },
    closeStyle: {
        // flex: 0.2,
        paddingHorizontal: 4,
        paddingVertical: 4,

    },
    inputStyle: {
        // flex: 0.75,
        height: scaleSize(80),
        width: scaleSize(250),
        fontSize: scaleSize(28),
        marginLeft:scaleSize(-10)
    },
    searchStyle: {
        width: scaleSize(600),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        // paddingHorizontal: 4,
        // paddingVertical: 4,
        // borderRadius: 20,
        height: scaleSize(160),
        // backgroundColor: '#F5FCFF',

        //     elevation: 5, //此属性只对Android阴影设置有效，对iOS不影响
        //     shadowOffset: { width: 3, height: 2 }, //阴影偏移量
        //     shadowOpacity: 0.8, //阴影透明度
        //     shadowRadius: 3, //阴影圆角半径
        //     shadowColor: '#E5E5E5', //阴影颜色
    },

});


VerifyCodeInput.defaultProps = {
    placeholder: '请输入验证码',
    size: scaleSize(50),
    maxLength: 200,
    name: 'login_information',
    keyboardType: 'default',
    returnKeyType: 'default',
    onChangeText: () => { },
    onEndEditingText: () => { },
    onClearAway: () => { },
    onBlur: () => { },
    onFocus: () => { },
};

VerifyCodeInput.propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
    maxLength: PropTypes.number,
    onChangeText: PropTypes.func,
    onEndEditingText: PropTypes.func,
    onClearAway: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    style: PropTypes.any,
    inputStyle: PropTypes.any,
    keyboardType: PropTypes.string,//键盘类型默认defaul
    returnKeyType: PropTypes.string,
    //计时器属性
    timeCount: PropTypes.number,
    callback: PropTypes.func, //回调函数
    normalBackColor: PropTypes.string,
    countingBackColor: PropTypes.string,
    startOnPress: PropTypes.func, //开始计时
    normalTitle: PropTypes.string,
    countingTitle: PropTypes.string,
    titleStyle: PropTypes.object,//字体样式
    titleColor: PropTypes.string,
    countingTitleColor: PropTypes.string,
    timerStyle: PropTypes.any,
};