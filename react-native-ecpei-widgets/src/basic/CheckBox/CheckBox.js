/**
 * Created by tanlinwei
 *
 * Description:
 */


import PropTypes from 'prop-types';
import React,{Component} from 'react';
import {TouchableOpacity,Image,StyleSheet} from 'react-native';
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";
// import {image} from "../../library/image";
const check = require('../../library/images/hook_blue.png');
const uncheck = require('../../library/images/hook_gray.png');
//组件一般都只做UI化，事件传出在外处理
export default class CheckBox extends Component {

    render(){
        const {uncheckedIcon,checked,checkedIcon,onPress, style,imageStyle} = this.props;
        let icon = uncheckedIcon;
        if (checked) {
            icon = checkedIcon;
        }
        return(
            <TouchableOpacityThrottle style={[styles.container,style]} onPress={onPress} >
                <Image source={icon} style={[styles.iconContainerStyle,imageStyle]}/>
            </TouchableOpacityThrottle>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5
    },

    iconContainerStyle: {
        paddingHorizontal: 4,
        paddingVertical: 4,
    }
});

//默认属性
CheckBox.defaultProps = {
    checked: false,
    uncheckedIcon: uncheck,
    checkedIcon: check,
};

//暴露在外面的属性
CheckBox.propTypes = {
    checked: PropTypes.bool, //是否被选中
    checkedIcon: PropTypes.any.isRequired, //选中的图片
    uncheckedIcon: PropTypes.any.isRequired, //未选中的图片
    onPress: PropTypes.func, //点击事件
    imageStyle:PropTypes.any,//图片样式
};