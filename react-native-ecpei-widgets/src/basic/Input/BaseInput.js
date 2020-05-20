/**
 * Created by tanlinwei
 *
 * Description:手机号输入框，只能输入数字
 */
import React, { Component } from 'react';
import { StyleSheet, TextInput, View, ImageBackground } from 'react-native';
import { Item } from 'native-base';
import PropTypes from 'prop-types';
import HIcon from '../../library/HIcon'
import { scaleSize, validate } from '../../library/appScreen';
const login = require('../../library/images/login.png');

export default class BaseInput extends Component {

    render() {
        let width = this.props.width ? this.props.width : scaleSize(600);
        let height = width * (135 / 596);//(13:40)是背景图的宽高之比
        return (
            <ImageBackground source={login} resizeMode='contain' style={{ width: width, height: height, alignItems: "center" }}>
                <View style={[this.props.style, { width: width - scaleSize(26), borderRadius: (height - scaleSize(40)) / 2, height: height - scaleSize(40), marginTop: scaleSize(18) }]}>
                    {this.props.children}
                </View>
            </ImageBackground>
        )
    }
}

BaseInput.propTypes = {
    style: PropTypes.PropTypes.any,
    width: PropTypes.number,
}