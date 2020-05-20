import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacityThrottle } from "../../Button/TouchableThrottle";
import HIcon from '../../../library/HIcon';
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../../utils/Screen";
import Theme from "../../../library/base-theme";
import { isIphoneX } from "react-native-iphone-x-helper";
const STYLES = StyleSheet.create({
    centerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerView: {
        flex: 1,
        marginTop: isIphoneX() ? (44): Theme.statusBarHeight
    },
    titleView: {
        fontSize: SCALE_SIZE(32),
        color: '#1D1D1D',
        fontFamily: "PingFangSC-Regular"
    },

    HIConContainer: {
        paddingHorizontal: SCALE_SIZE(10),
        minWidth: 41,
    }
})

function barViewPress(tag) {
    this.onNavBarPress && this.onNavBarPress(tag)
}
export function TextView(title, style) {
    return function (ui, tag) {
        return (
            <View style={[STYLES.containerView, STYLES.centerStyle]}>
                <TouchableOpacityThrottle style={[STYLES.centerStyle, STYLES.HIConContainer]} activeOpacity={0.5} onPress={barViewPress.bind(ui, tag)} >
                    <Text style={[STYLES.titleView, style]}>{title}</Text>
                </TouchableOpacityThrottle>
            </View>
        )
    }
}

export function IconView(leftIconProps) {
    return function (ui, tag) {
        return (
            <View style={[STYLES.containerView, STYLES.centerStyle]}>
                <TouchableOpacityThrottle style={[STYLES.centerStyle, STYLES.HIConContainer]} activeOpacity={0.5} onPress={barViewPress.bind(ui, tag)}>
                    <View>
                        <HIcon name={leftIconProps.name} color={leftIconProps.color} size={leftIconProps.size} />
                    </View>
                </TouchableOpacityThrottle>
            </View>
        )
    }
}