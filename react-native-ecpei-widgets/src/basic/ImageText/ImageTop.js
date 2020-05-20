/**
 * Created by tanlinwei
 *
 * Description:
 */

import React from 'react';
import {Text,TouchableOpacity,StyleSheet,Image,View} from 'react-native';
import PropTypes from 'prop-types';
// import {images} from "../../sources";
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";
export default class ImageTop extends React.Component {

    render(){

        const {onPress, image, imageStyle,textStyle,resizeMode,title} = this.props;

        return(
            <TouchableOpacityThrottle  style={styles.container} onPress={onPress}  {...this.props}>
                <View style={[styles.backViewStyle]}>
                    <Image source={image}  style={imageStyle} resizeMode= "center"></Image>
                    <Text style={textStyle}>{title}</Text>
                </View>
            </TouchableOpacityThrottle>
        );
    }



};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        paddingHorizontal: 2,
        paddingVertical: 2,
        backgroundColor:"white",
    },
    backViewStyle:{
        flexDirection:'column',
        alignItems: 'center',
        justifyContent:'center',
    },
    text: {
        marginTop: 10,
        fontSize:12,
    },
    iconContainerStyle: {
        // paddingHorizontal: 4,
        // paddingVertical: 4,
        
    }
});


ImageTop.defaultProps = {
    image: "",
    imageStyle:{
        width:40,
        height:40,
    },
    textStyle:{
        marginTop: 10,
        fontSize:12,
    },
};

//图片在上，文字在下的图文组件，默认文字距图片10个像素
ImageTop.propTypes = {
    title: PropTypes.string, //文本文字
    image: PropTypes.any,    //图片路径
    imageStyle: PropTypes.object,
    textStyle:PropTypes.object,
    resizeMode: PropTypes.string,
    onPress: PropTypes.func,
};