import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { HeaderBase } from "./HeaderBase";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../utils/Screen";
import { TextView, IconView } from "./util/BarView";
import { withNavigation } from "react-navigation";
import PropTypes from 'prop-types';
import { RypTheme } from "../../RypTheme";
import { ifIphoneX } from "react-native-iphone-x-helper";
const STYLES = StyleSheet.create({
    centerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerStyle: {
        flex: 1,
    },
    titleStyle: {
        fontSize: SCALE_SIZE(34),
        color: '#000',
        textAlign: 'center',
        fontFamily: "PingFang-SC-Medium",
        fontWeight: 'bold',
        maxWidth: "50%"
    }
})
const NavigationBarLeft = "ZZH_NavigationBar_Left";

const NavigationBarRight = "ZZH_NavigationBar_Right";

class _NavigationBar extends React.Component {
    static contextTypes = {
        theme: PropTypes.object
    };
    constructor(props) {
        super(props)

    }
    _leftView = () => {
        if (this.props.leftTextProps) {
            let leftTextProps = typeof this.props.leftTextProps == "string" ? {
                title: this.props.leftTextProps
            } : this.props.leftTextProps

            return TextView(leftTextProps.title,leftTextProps.style)(this, NavigationBarLeft + leftTextProps.title)
        }
        let leftIconProps = this.props.leftIconProps;
        if (this.props.leftIconProps == null) {
            let variables = ((this.context.theme && this.context.theme["@@shoutem.theme/themeStyle"] && this.context.theme["@@shoutem.theme/themeStyle"].variables) || {}).rypVariables
            leftIconProps = variables.NavigationBar_Left_default_Icon
        }
        if (leftIconProps) {
            let _leftIconProps = typeof leftIconProps == "string" ? {
                color: "#333333",
                name: leftIconProps,
                size: SCALE_SIZE(35)
            } : leftIconProps;
            return IconView(_leftIconProps)(this, NavigationBarLeft)
        }
    }
    _centerView = () => {
        let centerProps = typeof this.props.centerProps == "string" ? {
            title: this.props.centerProps,
            style: STYLES.titleStyle
        } : this.props.centerProps

        return (
            <View style={[STYLES.containerStyle, STYLES.centerStyle]}>
                <Text numberOfLines={1} style={[STYLES.titleStyle, centerProps.style]}>
                    {centerProps.title}
                </Text>
            </View>
        )
    }
    _rightView = () => {
        if (this.props.rightTextProps) {
            let rightTextProps = typeof this.props.rightTextProps == "string" ? {
                title: this.props.rightTextProps
            } : this.props.rightTextProps
            return TextView(rightTextProps.title, rightTextProps.style)(this, NavigationBarRight + rightTextProps.title)
        }
        if (this.props.rightIconProps) {
            let rightIconProps = typeof this.props.rightIconProps == "string" ? {
                color: "#333333",
                name: this.props.rightIconProps,
                size: SCALE_SIZE(35)
            } : this.props.rightIconProps
            return IconView(rightIconProps)(this, NavigationBarRight)
        }
    }
    /**
     * 可点击事件回调
     */
    onNavBarPress = (tag) => {
        switch (tag) {
            case NavigationBarLeft:
                if (this.props.onNavBarPress) {
                    let isBack = this.props.onNavBarPress({ isRight: false, tag: null })
                    !isBack && this.props.navigation.goBack();
                    return
                }
                this.props.navigation.goBack();
                break
            case NavigationBarRight:
                this.props.onNavBarPress && this.props.onNavBarPress({ isRight: true, tag: null })
                break

            default:
                this.props.onNavBarPress && this.props.onNavBarPress({ isRight: tag.indexOf(NavigationBarRight) == 0, tag })
                break
        }
    }
    render() {
        return (
            <HeaderBase {...this.props}
                leftView={
                    this.props.leftView ? this.props.leftView() : this._leftView()
                }
                centerView={
                    this.props.centerView ? this.props.centerView : this._centerView()
                }
                rightView={
                    this.props.rightView ? this.props.rightView() : this._rightView()
                }
            >
            </HeaderBase>
        )
    }

}
_NavigationBar.defaultProps = {
    ...StatusBar.defaultProps,
    containerStyle: null,

    leftIconProps: null, //"return"  || {name,icon,size}
    leftTextProps: null,//{title:"",style:{}} || ""
    leftView: null, //function=>UI

    centerView: null, //function=>UI
    centerProps: "", //{title:"",style:{}}

    rightTextProps: null,//{title:"",style:{}}|| ""
    rightIconProps: null,//{name,icon,size}
    rightView: null,//function=>UI
    /***
     * 点击 事件
     * 
     * 
     * 返回键 return true 阻止默认返回事件
     * 
     * 右侧 。。。
     */
    onNavBarPress: null,//function({isRight,tag})
    //底部线条
    showShadow: undefined
}
const ThemeNavigationBar = RypTheme.registerComponent("NativeBase.RypNavigationBar", withNavigation(_NavigationBar));

export {
    ThemeNavigationBar as NavigationBar
}