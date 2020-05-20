import React,{Component} from 'react';
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import HIcon from '../../library/HIcon';
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";
export default class NavigationCheckBar extends Component{


    renderLeft = () => {
        const {leftIcon,leftIconSize, leftIconColor,leftContainerStyle,onLeftPress} = this.props;

        return (
            <TouchableOpacityThrottle style={[styles.leftContainerStyle, leftContainerStyle && leftContainerStyle]}
                              onPress={onLeftPress}>
                <HIcon name={leftIcon} color={leftIconColor} size={leftIconSize}/>
            </TouchableOpacityThrottle>
        );
    };

    renderTitle = () => {
        const {titleStyle,title} = this.props;
        return (
            <View style={styles.titleContainerStyle}>
                <Text style={[styles.titleStyle, titleStyle && titleStyle]}
                    //   ellipsizeMode="head"
                      numberOfLines={1}>
                    {title}
                </Text>
            </View>
        );
    };

    renderRight = () => {
        const {rightIcon,rightTitle,onRightTitlePress,rightTitleStyle,rigthIconColor,rigthIconSize,
            rightContainerStyle,onRightIconPress} = this.props;

        return (
            <View style={{flexDirection: 'row',width:100}}>
                <TouchableOpacityThrottle hitSlop={{top: 20, bottom: 20, left: 20, right: 10}}
                                  style={[styles.rightContainerStyle, rightContainerStyle && rightContainerStyle]}
                                  onPress={onRightIconPress}>
                    <HIcon name={rightIcon} color={rigthIconColor} size={rigthIconSize}/>
                </TouchableOpacityThrottle>
                <TouchableOpacityThrottle style={[styles.rightContainerStyle, rightContainerStyle && rightContainerStyle]}
                                  onPress={onRightTitlePress}>
                    <Text style={[{paddingRight:15},rightTitleStyle]}>{rightTitle}</Text>
                </TouchableOpacityThrottle>

            </View>
        );
    };


    render(){
        const {backgroundColor} = this.props;
        return(
            <View style={[styles.navBarStyle,{backgroundColor:backgroundColor}]}>
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
    navBarStyle:{
        height: 64,
        borderBottomWidth: 0.3,
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
        alignItems: 'flex-start',
        marginLeft:15,
        width: 100,
    },
    titleContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50
    },
    leftTitleStyle: {
        fontSize: 15,
        color: '#000',
    },
    rightTitleStyle: {
        fontSize: 15,
        color: '#000'
    },
    titleStyle: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold'
    },
});

NavigationCheckBar.defaultProps = {
    backgroundColor: '#fff',
    leftIcon:'chevron-left',
    leftIconSize:25,
    leftIconColor:'#a7a6ab',
    titleStyle:null,
    title:'Header',
    rightIcon:'chevron-right',
    rightTitle:'车型',
    rigthIconSize:25,
    rightTitleStyle:null,
    rigthIconColor:'#a7a6ab',
};

//此NavBar图标全部为尺量图标
NavigationCheckBar.propTypes = {
    backgroundColor:PropTypes.string, //背景色
    onLeftPress:PropTypes.func, //左侧点击方法
    onRightTitlePress:PropTypes.func, //右侧文字点击方法
    onRightIconPress:PropTypes.func, //右侧Icon点击方法
    leftIcon:PropTypes.string, //左侧Icon名称
    leftIconSize:PropTypes.number,//左侧图标大小
    leftIconColor:PropTypes.string,//左侧图标颜色
    title:PropTypes.string,//中间标题
    titleStyle:PropTypes.any,//中间标题样式
    rightIcon:PropTypes.string,//右侧Icon名称
    rigthIconSize:PropTypes.number,//右侧图标大小
    rigthIconColor:PropTypes.string,//右侧图标颜色
    rightTitle:PropTypes.string, //右侧文字
    rightTitleStyle:Text.propTypes.style, //右侧文字样式
};