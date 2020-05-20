/**
 * Created by tanlinwei
 *
 * Description:
 */
import React, {Component} from 'react';
import { Text,View,TouchableOpacity,StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";
export default class RoundButton extends Component{
    render(){
        const {buttonStyle,textStyle,title,onPress,activeOpacity,disabled} = this.props;
        return(
            <TouchableOpacityThrottle onPress={onPress} activeOpacity={activeOpacity} disabled={disabled}>
            <View style={[styles.butSty,buttonStyle]} >
                <Text style={textStyle}>{title}</Text>
            </View>
            </TouchableOpacityThrottle>
        );
    }
};

const styles = StyleSheet.create({
    butSty:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        width:180,
        height:40,
        backgroundColor:'#4060E8',
    }
});

RoundButton.defaultProps = {
    buttonStyle:{
        backgroundColor:'#274DE7',
        width:180,
        height:40,
        borderRadius:20,
        alignItems: 'center',
        justifyContent:'center',
    },
    textStyle:{
        width:180,
        height:40,
        fontSize:15,
        color:'#fff',
    },
    title:'确认',
    borderRadius:20,
    activeOpacity:1,
    disabled:false
};

//自行切角任意弧度型按钮
RoundButton.propTypes={
    buttonStyle:PropTypes.any, //button样式，默认有宽高的
    textStyle:PropTypes.any, //文本样式，字体大小，颜色等
    title:PropTypes.string, //文本文字
    onPress:PropTypes.func, //点击事件
    activeOpacity:PropTypes.number,//0或1，响应透明度
    disabled:PropTypes.bool,//是否可被点击
};