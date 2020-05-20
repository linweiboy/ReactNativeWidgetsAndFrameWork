/**
 * Created by tanlinwei
 *
 * Description:Icon图标与文字搭配组件，图标在上，文字在下
 */

import React from 'react';
import {Text,TouchableOpacity,StyleSheet,Image,View} from 'react-native';
import PropTypes from 'prop-types';
import HIcon from '../../library/HIcon'
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";
export default class IconTop extends React.Component {

    render(){

        const {onPress, image, imageStyle,textStyle,title,size,color,activeOpacity} = this.props;

        return(
            <TouchableOpacityThrottle style={styles.container} onPress={onPress} activeOpacity={activeOpacity}>
                <View style={[styles.backViewStyle]}>
                    <HIcon name={image}  style={[styles.imageStyle,imageStyle]} color={color} size={size}/>
                    <Text style={[styles.textStyle,textStyle]}>{title}</Text>
                </View>
            </TouchableOpacityThrottle>
        );
    }



};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 2,
        paddingVertical: 2,
    },
    backViewStyle:{
        flexDirection:'column',
        alignItems: 'center',
    },
    text: {
        marginTop: 10,
        fontSize:12,
    },
    iconContainerStyle: {
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    imageStyle:{
        marginTop:10,
    },
    textStyle:{
        marginTop: 10,
        fontSize:12,
    },
});


IconTop.defaultProps = {
    image: '',
    activeOpacity:0,
    size:20,
    onPress: () => {},
};

//图片在上，文字在下的图文组件，默认文字距图片10个像素
IconTop.propTypes = {
    style:PropTypes.object, //组件样式
    title: PropTypes.string, //文本文字
    image: PropTypes.string,    //Icon图片名称
    imageStyle: PropTypes.any,//Icon图标样式
    textStyle:PropTypes.any,//文字样式
    onPress: PropTypes.func,
    size:PropTypes.number,//Icon图标的尺寸大小
    color:PropTypes.string,//Icon图标颜色
    activeOpacity:PropTypes.number,//点击响应透明度
};