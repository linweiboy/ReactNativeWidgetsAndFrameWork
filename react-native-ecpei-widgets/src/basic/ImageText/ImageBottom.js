/**
 * Created by tanlinwei
 *
 * Description:图片与文字混合，图片在下
 */

import React from 'react';
import {Text,TouchableOpacity,StyleSheet,Image,View} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";
export default class ImageBottom extends React.Component {

    render(){

        const {onPress, image, imageStyle,resizeMode,title,textStyle} = this.props;

        return(
            <TouchableOpacityThrottle style={styles.container} onPress={onPress}>
                <View style={[styles.backViewStyle]}>
                    <Text style={[styles.text,textStyle]}>{title}</Text>
                    <Image source={image}  style={[styles.imageStyle,imageStyle]}
                           resizeMode={resizeMode} />
                </View>
            </TouchableOpacityThrottle>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 2,
        paddingVertical: 2
    },
    backViewStyle:{
        flexDirection:'column',
        justifyContent: 'center',
    },
    text: {
        marginLeft: 10,
        fontSize:12,
    },
    iconContainerStyle: {
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    imageStyle:{
        width:40,
        height:40,
    }
});


ImageBottom.defaultProps = {
    image: "",
    resizeMode:'cover',

};

//
ImageBottom.propTypes = {
    title: PropTypes.string, //文字
    image: PropTypes.any.isRequired, //图片路径(要求必传)
    imageStyle:PropTypes.any,//图片样式
    textStyle:PropTypes.any,//文本样式
    resizeMode: PropTypes.string, //
    onPress: PropTypes.func,
};