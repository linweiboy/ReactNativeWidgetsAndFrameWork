/**
 * Created by tanlinwei
 *
 * Description:  业务组件-汽车品牌、商品品牌分组头部视图
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

import {scaleSize,setSpText,screenW} from '../../library/appScreen';
import theme from "../../library/base-theme";
import HIcon from '../../library/HIcon';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";
export default class TextSection extends Component {

    render() {
        const {title,titleLabel,name,size,color,onPress} = this.props;   
        return (
            <View style={styles.container}>
                  <Text style={styles.titleStyle}>{title}
                  </Text>
                    <TouchableOpacityThrottle
                        activeOpacity={1}
                        onPress = {onPress} >
                        <View style={styles.topViewStyle}>
                            <Text style={styles.titleLabelStyle}>{titleLabel}</Text> 
                                <HIcon
                                    name={name}
                                    size={size}
                                />
                        </View>
                        </TouchableOpacityThrottle>
            </View>
        );  
          
    }
}


const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        flexDirection:"row",
        height:scaleSize(88),
        justifyContent: 'space-between',
        backgroundColor:'white'
    },

    titleStyle:{
        color: theme.titleColor,
        fontSize:theme.titleFontFamilySize,
        marginLeft:scaleSize(32),      
        fontFamily:theme.mediumFontFamily, 
    },
    topViewStyle:{
        height:scaleSize(88),
        justifyContent: 'flex-end', 
        alignItems: 'center',
        flexDirection:"row",
        marginRight:scaleSize(32),
    },

    titleLabelStyle:{
        color: theme.titleLabelColor,
        fontSize:theme.titleLabelFontSize,
        fontFamily: theme.regularFontFamily, 
    },
    iconStyle:{
        height:scaleSize(22.6),
        width:scaleSize(22.6),
        resizeMode:'cover',
        marginLeft:scaleSize(10),
    }

});

//默认属性
TextSection.defaultProps = {
    title:'热门车系',
    titleLabel:'更多',
    name:'information_more1',
    size:scaleSize(24),
    color:''
};

//暴露在外面的属性
TextSection.propTypes = {
    title: PropTypes.string, //
    titleLabel: PropTypes.string, //
    name: PropTypes.string, //
    size: PropTypes.number, //
    color: PropTypes.string, //
    onPress: PropTypes.func, //
};
