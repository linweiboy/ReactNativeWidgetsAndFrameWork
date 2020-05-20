import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { BarContainer } from "./BarContainer";
import Theme from "../../library/base-theme";
import { isIphoneX } from "react-native-iphone-x-helper";
const STYLES = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 5,
    },
    rightView: {
        minWidth: 44
    },
    leftView: {
        minWidth: 44
    },
    centerView: {
        flex: 1,
    }
})
export class HeaderBase extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        // debugger
        let { animated, translucent, hidden, barStyle, statusBarBackgroudColor } = this.props;
        return (
            <BarContainer {...this.props} style={[STYLES.container, this.props.containerStyle]} >
                <StatusBar
                    animated={animated} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden  
                    hidden={hidden}  //是否隐藏状态栏。  
                    backgroundColor={statusBarBackgroudColor} //状态栏的背景色   transparent
                    translucent={translucent}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。  
                    barStyle={barStyle} // enum('default', 'light-content', 'dark-content')  
                />
                <View style={STYLES.leftView}>
                    {
                        this.props.leftView
                    }
                </View>
                <View style={STYLES.centerView}></View>
                <View style={STYLES.rightView}>
                    {
                        this.props.rightView
                    }
                </View>
                <View pointerEvents={'none'} style={{ position: "absolute", left: 0, right: 0, top: (isIphoneX() ? 44 : Theme.statusBarHeight), bottom: 0, }}>
                    {
                        this.props.centerView
                    }
                </View>
            </BarContainer>
        )
    }
}
HeaderBase.defaultProps = {
    animated: true,
    hidden: false,
    translucent: true,
    barStyle: 'dark-content',
    statusBarBackgroudColor: 'transparent',
}