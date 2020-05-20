/**
 * Created by tanlinwei
 *  2018/8/9
 * Description:
 */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import  HIcon  from "../../library/HIcon";
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";
export default class IconButton extends Component {

   
    render() {
        const { style, onPress, name, color, size, activeOpacity } = this.props;
        return (
            <TouchableOpacityThrottle onPress={onPress} activeOpacity={activeOpacity}>
                <View style={[styles.buttonStyle, style]} >
                    <HIcon size={size} name={name} color={color}></HIcon>
                </View>
            </TouchableOpacityThrottle>
        );
    }
};

const styles = StyleSheet.create({
    buttonStyle: {
        width: 60,
        height: 44,
        backgroundColor: '#FFFFFF',
        justifyContent: "center",
        alignItems:"flex-start",
    },
});


IconButton.defaultProps = {
    
    color: "#2D2D2D",
    size: 20,
    name: 'back1',
    onPress: () => { },
    activeOpacity:1,
     
};

IconButton.propTypes = {
    style: PropTypes.any, //button样式，默认有宽高的,默认flex-start flex-end stretch center
    onPress: PropTypes.func, //点击事件
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    activeOpacity:PropTypes.number,
};