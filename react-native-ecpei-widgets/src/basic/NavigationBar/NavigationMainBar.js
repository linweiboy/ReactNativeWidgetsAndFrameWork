/**
 * Created by tanlinwei
 *
 * Description:
 */
import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import HIcon from '../../library/HIcon'
import Theme from '../../library/base-theme';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";

export default class NavigationMainBar extends Component {


    renderLeft() {
        let component;
        const { leftIcon, leftTitle, IsLeftIcon, leftIconSize, leftIconColor,
            leftTitleStyle, onLeftPress } = this.props;
        if (IsLeftIcon) {
            component = (
                <HIcon name={leftIcon} color={leftIconColor} size={leftIconSize} />
            );
        } else if (leftTitle) {
            component = (
                <Text numberOfLines={1}
                    style={[styles.leftTitleStyle, leftTitleStyle && leftTitleStyle]}>
                    {leftTitle}
                </Text>
            );
        } else {
            component = (
                <HIcon name={leftIcon} color='#a7a6ab' size={25} />
            );
        }

        return (
            <View style={styles.leftContainerStyle}>
                <TouchableOpacityThrottle style={styles.leftContainerStyle}
                    onPress={onLeftPress}>
                    {component}
                </TouchableOpacityThrottle>
            </View>
        );
    };

    renderTitle() {
        const { titleStyle, title } = this.props;
        return (
            <View style={styles.titleContainerStyle}>
                <Text style={[styles.titleStyle, titleStyle && titleStyle]}
                    // ellipsizeMode="head"
                    numberOfLines={1}>
                    {title}
                </Text>
            </View>
        );
    };

    renderRight() {
        let component;
        const { rightIcon, rightTitle, IsRightIcon, rightTitleStyle, rigthIconColor, rigthIconSize, onRightPress } = this.props;
        if (IsRightIcon) {
            component = (
                <HIcon name={rightIcon} color={rigthIconColor} size={rigthIconSize} />
            );
        } else if (rightTitle) {
            component = (
                <Text numberOfLines={1}
                    style={[styles.rightTitleStyle, rightTitleStyle && rightTitleStyle]}>
                    {rightTitle}
                </Text>
            );
        } else {
            component = <View style={{ width: 40 }} />;
        }

        return (
            <View style={styles.rightContainerStyle}>
                <TouchableOpacityThrottle hitSlop={{ top: 20, bottom: 20, left: 20, right: 10 }}
                    style={styles.rightContainerStyle}
                    onPress={onRightPress}>
                    {component}
                </TouchableOpacityThrottle>
            </View>
        );
    };


    render() {
        const { statusBarBackgroudColor,backgroundColor, borderBottomWidth, isLinearGradient, colors, start, end, animated, translucent, hidden, barStyle } = this.props;
        return (
            isLinearGradient ? <LinearGradient colors={colors} start={start} end={end}
                style={[styles.navBarStyle, { backgroundColor: backgroundColor, borderBottomWidth: borderBottomWidth }]}>
                 <StatusBar
                        animated={animated} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden  
                        hidden={hidden}  //是否隐藏状态栏。  
                        backgroundColor={statusBarBackgroudColor} //状态栏的背景色   transparent
                        translucent={translucent}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。  
                        barStyle={barStyle} // enum('default', 'light-content', 'dark-content')  
                    />
                <View style={styles.navContentStyle}>
                    {this.renderLeft()}
                    {this.renderTitle()}
                    {this.renderRight()}
                </View>
            </LinearGradient> :
                <View style={[styles.navBarStyle, { backgroundColor: backgroundColor, borderBottomWidth: borderBottomWidth }]}>
                    <StatusBar
                        animated={animated} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden  
                        hidden={hidden}  //是否隐藏状态栏。  
                        backgroundColor={statusBarBackgroudColor} //状态栏的背景色   transparent
                        translucent={translucent}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。  
                        barStyle={barStyle} // enum('default', 'light-content', 'dark-content')  
                    />
                    <View style={styles.navContentStyle}>
                        {this.renderLeft()}
                        {this.renderTitle()}
                        {this.renderRight()}
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    navBarStyle: {
        height: Theme.navHeight,
        borderBottomColor: '#a7a6ab',
    },
    navContentStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 2,
        marginRight: 2,
        marginTop: 20,
    },
    leftContainerStyle: {
        justifyContent: 'center',
        // alignItems: 'center',
        height: Theme.navHeight,
        // width: 100,
        paddingLeft: 5,
        minWidth: 41,
    },
    titleContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightContainerStyle: {
        justifyContent: 'center',
        // alignItems: 'center',
        width: 100,
        height: Theme.navHeight,
        paddingRight: 5,
        minWidth: 41,
    },
    leftTitleStyle: {
        fontSize: 15,
        color: '#000',
    },
    leftIconStyle: {
        width: 25,
        height: 25,
    },
    iconStyle: {
        width: 25,
        height: 25,
    },
    rightTitleStyle: {
        fontSize: 15,
        color: '#000',
        textAlign: 'right'
    },
    rightIconStyle: {
        width: 25,
        height: 25,
    },
    titleStyle: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold'
    },
});

NavigationMainBar.defaultProps = {
    hidden: false,
    backgroundColor: "#ffffff",
    IsLeftIcon: true,
    leftIcon: 'back1',
    leftTitle: '',
    leftTitleStyle: null,
    leftIconSize: 25,
    leftIconColor: '#a7a6ab',
    titleStyle: null,
    title: 'Header',
    IsRightIcon: true,
    rightIcon: 'enter',
    rightTitle: '',
    rigthIconSize: 25,
    rightTitleStyle: null,
    rigthIconColor: '#a7a6ab',
    borderBottomWidth: 0.3,
    isLinearGradient: false,
    colors: ['#63B8FF', '#1C86EE', '#0000EE',],
    start: { x: 0.3, y: 0.4 },// 渐变是从 左侧30%， 上部 40% 开始
    end: { x: 0.7, y: 0.8 },//渐变是从 左侧70%， 上部 80% 结束
    animated: true,
    hidden: false,
    translucent: true,
    barStyle: 'dark-content',
    statusBarBackgroudColor:'transparent',
};

//此NavBar图标全部为尺量图标
NavigationMainBar.propTypes = {
    backgroundColor: PropTypes.string, //背景色
    onLeftPress: PropTypes.func, //左侧点击方法
    onRightPress: PropTypes.func, //右侧点击方法
    leftTitleStyle: Text.propTypes.style, //左侧文字样式
    leftTitle: PropTypes.string, //左侧文字
    IsLeftIcon: PropTypes.bool, //是否用Icon图标
    leftIcon: PropTypes.string, //左侧Icon名称
    leftIconSize: PropTypes.number,//左侧图标大小
    leftIconColor: PropTypes.string,//左侧图标颜色
    title: PropTypes.string,//中间标题
    titleStyle: Text.propTypes.style,//中间标题样式
    rightIcon: PropTypes.string,//右侧Icon名称
    rigthIconSize: PropTypes.number,//右侧图标大小
    rigthIconColor: PropTypes.string,//右侧图标颜色
    IsRightIcon: PropTypes.bool,//是否用右侧Icon图标
    rightTitle: PropTypes.string, //右侧文字
    rightTitleStyle: Text.propTypes.style, //右侧文字样式
    borderBottomWidth: PropTypes.number,//导航栏底部线条宽度，去掉线条值为0
    // isLinearGradient: PropTypes.bool,//是否颜色渐变导航栏
    // colors: PropTypes.array,
    // start: PropTypes.object,
    // end: PropTypes.object,
    // animated: PropTypes.bool,//指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden  
    // hidden: PropTypes.bool,  //是否隐藏状态栏。  
    // translucent: PropTypes.bool,//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。  
    
    /**
     * 这个属性是改变状态栏字体颜色
     *  默认为白色界面
     *  barStyle 白色导航栏设置为dark-content   深色导航栏设置为 light-content
     *  statusBarBackgroudColor  默认设置为 transparent    
     * */
    // barStyle: PropTypes.oneOf([
    //     "default",
    //     'light-content',
    //     'dark-content',
    // ]), // enum('default', 'light-content', 'dark-content')   
    // barStyle={'light-content'}
    // barStyle:'light-content'
    // statusBarBackgroudColor:PropTypes.string,   
    
};