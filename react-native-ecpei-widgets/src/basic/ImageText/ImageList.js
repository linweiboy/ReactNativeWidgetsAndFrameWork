/**
 * Created by tanlinwei
 *
 * Description:VINAPP中Icon图标+文字+标签组件
 */

import React from 'react';
import {Text,TouchableOpacity,StyleSheet,Image,View} from 'react-native';
import PropTypes from 'prop-types';
import HIcon from '../../library/HIcon';
import { screenW, screenH, scaleSize, setSpText,validatemobile } from '../../library/appScreen';
import BadgeView from "../BadgeView";
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";
export default class ImageList extends React.Component {

    render(){
        const {onPress, name, imageStyle,textStyle,title,size,color,item} = this.props;
        var itemT = "";
        if(item>=1&&item<10){
            itemT = " "+item+" ";
        }else{
            itemT = (item>99)?"99+":item+"";
        }
        return(
            <TouchableOpacityThrottle activeOpacity={1}  onPress={onPress} key={title}>
                <View style={[styles.container]}>
                    <HIcon name={name}  style={[imageStyle,{color:color}]} size={size}/>
                    <Text style={textStyle}>{title}</Text>
                    <View style={{marginBottom:15}}>
                    {
                        item >= 1 ? 
                        <BadgeView textStr = {item+""} background = {"#F00D0D"} fontSize = {scaleSize(15)} height={18}></BadgeView> : null
                      }
                </View>
                </View>
                <View style ={{marginLeft:scaleSize(40),width:screenW,height:0.5,backgroundColor:'#EFEFF4'}}></View >  
            </TouchableOpacityThrottle>
        );
    }

};


const styles = StyleSheet.create({
    container: {
        width:screenW,
        height:scaleSize(108),
        alignItems: 'center',
        flexDirection:'row',
    },
});


ImageList.defaultProps = {
    name: 'news',
    color:"#DB3727",
    size:20,
    imageStyle:{
        marginLeft:scaleSize(40)
    },

    textStyle:{
        fontSize:scaleSize(30),
        marginLeft:scaleSize(40),
        color:'#4B4B4B',
        fontFamily: "PingFangSC-Regular",
    },

    onPress: () => {},
};

//
ImageList.propTypes = {
    title: PropTypes.string, //文本文字
    name: PropTypes.string,    //Icon图片名称
    imageStyle: PropTypes.any,
    textStyle:PropTypes.any,
    onPress: PropTypes.func,
    size:PropTypes.number,
    color:PropTypes.string,
    item:PropTypes.number,
};