/**
 * Created by tanlinwei
 *
 * Description:密码输入框不能输入中文
 */


import React, { Component } from 'react';
import { StyleSheet, TextInput, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import HIcon from '../../library/HIcon'
import { scaleSize, testChinese, testEmoji } from '../../library/appScreen';
const login = require('../../library/images/login.png');
import BaseInput from './BaseInput';
export default class InputSecretRound extends Component {

    constructor(props) {
        super(props);
        this.state = {
            opacity: 0,
            inputText: '',
            isSecret: true,
            inputing: false
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
        const { size, name, placeholder, style, inputStyle, keyboardType, returnKeyType, maxLength } = this.props;
        let icon = 'login-hide';
        if (!this.state.isSecret) {
            icon = 'login-dispaly';
        }
        return (
            <BaseInput style={[styles.searchStyle, style]} width={this.props.width}>
                <HIcon name={name} style={styles.iconContainerStyle} size={scaleSize(size)} />
                <TextInput ref='input' placeholder={placeholder}
                    style={[styles.inputStyle, inputStyle]}
                    maxLength={maxLength}
                    keyboardType={keyboardType}
                    secureTextEntry={this.state.isSecret}
                    onChangeText={this.onChangeOnPress}
                    onEndEditing={this.onEndEditing}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    value={this.state.inputText}
                    returnKeyType={returnKeyType}
                    selectionColor={"#DB3727"}
                    underlineColorAndroid='transparent'
                />
                {
                    this.state.inputing ? <HIcon name='delete-x' style={[styles.closeStyle, { opacity: this.state.opacity }]} onPress={this.noPressClear} /> : null
                }

                <HIcon name={icon} size={scaleSize(46)} style={{ position: "absolute", right: 10, top: 9,paddingHorizontal:4,paddingHorizontal:4 }} onPress={this.secretClick} />
            </BaseInput>
        )
    }


    noPressClear = () => {
        this.setState({
            inputText: '',
            opacity: 0,
        });
        this.props.onClearAway();
    }

    secretClick = () => {
        this.setState({ isSecret: !this.state.isSecret });
    }
    onBlur = () => {
        this.props.onBlur();
        this.setState({ inputing: false })
    }

    blur() {
        this.refs.input && this.refs.input.blur();
    }
    onFocus = () => {
        this.props.onFocus();
        this.setState({ inputing: true })
    }
}


const styles = StyleSheet.create({
    iconContainerStyle: {
        paddingHorizontal: 4,
        paddingVertical: 4,
        marginLeft: scaleSize(30),

    },
    closeStyle: {
        flex: 0.1,
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    inputStyle: {
        flex: 0.7,
        height: scaleSize(80),
        fontSize: scaleSize(28),
    },
    searchStyle: {
        width: scaleSize(600),
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:'center',
        // paddingHorizontal: 4,
        // paddingVertical: 4,
        // borderRadius: 20,
        height: scaleSize(160),
        // backgroundColor: '#F5FCFF',

        // elevation: 5, //此属性只对Android阴影设置有效，对iOS不影响
        // shadowOffset: { width: 3, height: 2 }, //阴影偏移量
        // shadowOpacity: 0.8, //阴影透明度
        // shadowRadius: 3, //阴影圆角半径
        // shadowColor: '#E5E5E5', //阴影颜色
    },
});


InputSecretRound.defaultProps = {
    placeholder: '请输入密码',
    size: scaleSize(60),
    name: 'login_chiper',
    maxLength: 20,
    keyboardType: 'numbers-and-punctuation',
    returnKeyType: 'default',
    onChangeText: () => { },
    onEndEditingText: () => { },
    onClearAway: () => { },
    onBlur: () => { },
    onFocus: () => { },
};

InputSecretRound.propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
    maxLength: PropTypes.number,
    onChangeText: PropTypes.func,
    onEndEditingText: PropTypes.func,
    onClearAway: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    keyboardType: PropTypes.string,
    returnKeyType: PropTypes.string,
    style: PropTypes.any,
    inputStyle: PropTypes.any,
};