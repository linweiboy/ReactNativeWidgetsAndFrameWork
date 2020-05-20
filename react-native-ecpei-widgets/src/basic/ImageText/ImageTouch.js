/**
 * Created by tanlinwei
 *
 * Description:
 */
import React, {Component} from 'react';
import {TouchableOpacity,StyleSheet,Image} from 'react-native';
import PropTypes from 'prop-types';
// import {images} from "../../sources/index";
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";
export default class ImageTouch extends Component{

    render(){
        const {onPress,imageSource,containerStyle,imageStyle} = this.props;
        return(
            <TouchableOpacityThrottle style={[styles.container,containerStyle]} onPress={onPress}>
                <Image source={imageSource} style={[styles.imageStyle,imageStyle]}/>
            </TouchableOpacityThrottle>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        padding:15,
        alignItems: 'center',
        justifyContent:'center',
        width:50,
        height:50,
    },
    imageStyle:{
        resizeMode:'cover',
        width:40,
        height:40
    },
});

ImageTouch.defaultProps = {
    imageSource:"",
    containerStyle:{
        width:50,
        height:50,
    },

};

ImageTouch.propTypes = {
    imageSource:PropTypes.any,
    onPress:PropTypes.func,
    containerStyle:PropTypes.any,
    imageStyle:PropTypes.any,
};