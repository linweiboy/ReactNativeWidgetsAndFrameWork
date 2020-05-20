/**
 * Created by tanlinwei
 *
 * Description:
 */
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity,View,StyleSheet,Text } from 'react-native';
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";
export default function Button(props) {
    return (
        <TouchableOpacityThrottle  onPress={props.onPress}  disabled={props.disabled} activeOpacity={props.activeOpacity}>
            <View style={[styles.backViewStyle,props.style]}>
                <Text style={[styles.textStyle,props.textStyle]}>{props.title}</Text>
            </View>
        </TouchableOpacityThrottle>
            );
}

const styles = StyleSheet.create({
    backViewStyle:{
        backgroundColor:'#ffffff',
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center',
    },
    textStyle:{
        fontSize:13,
        textAlign:'center',
        color:'#000'
    }

});


Button.defaultProps = {
    onPress: () => {},
    disabled:false, 
    activeOpacity:1,
};

//按钮
Button.propTypes = {
    onPress: PropTypes.func,
    style: PropTypes.any, //按钮样式
    title: PropTypes.string,
    textStyle:Text.propTypes.style,
    disabled:PropTypes.any, //是否可点击
    activeOpacity:PropTypes.number,//1或0
};