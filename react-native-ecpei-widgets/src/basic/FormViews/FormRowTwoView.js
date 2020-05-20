/**
 * Created by tanlinwei
 *
 * Description:表格组件,一行两个格子表格
 * 
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class FormRowTwoView extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const { style, titleViewSty,titleStyle ,title,contentViewSty,contentStyle,content,borderRadiusStyle} = this.props;
        return (
            <View style={[styles.containterStyle, style]}>
                <View style={[styles.titleViewSty,titleViewSty]} >
                    <Text style={[styles.titleStyle,titleStyle]}>{title}</Text>
                </View>
                <View style={[styles.contentViewSty,contentViewSty]} >
                    <View style={[styles.borderRadiusStyle,borderRadiusStyle]}>
                       <Text style={[styles.contentStyle,contentStyle]}>{content}</Text>
                    </View > 
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containterStyle: {
        flexDirection: 'row',
        borderColor: '#b7b7b7', //边框颜色
        borderWidth: 0.5, //边框宽度
        width: 300,
        //backgroundColor:'#ff0'
        // height: 50,
    },
    titleViewSty: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 0.5,
        borderRightColor: '#b7b7b7',
        flex: 0.38,
        //backgroundColor:'#f00',
        padding:5

    },
    contentViewSty: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderRightWidth: 0.1,
        borderRightColor: '#b7b7b7',
        flex: 0.62,
        //backgroundColor:'#f0f',
        padding:10
    },
    titleStyle: {
        fontSize: 15,
        color: '#000',
    },
    contentStyle: {
        fontSize: 15,
        color: '#000',
    },
    borderRadiusStyle:{
        backgroundColor:"#FFFFFF",
        borderRadius:5,
        padding:5,
    }
});

FormRowTwoView.defaultProps = {
    title:'商品规格',
    content:'GHJNHGDGGHJ',
};

FormRowTwoView.propTypes = {
    style: PropTypes.any,//表格样式
    title: PropTypes.string,//标题文字
    titleStyle: PropTypes.any,//标题文字样式
    titleViewSty: PropTypes.any,//标题框样式
    content: PropTypes.string,//内容文字
    contentStyle: PropTypes.any,//内容文字样式
    contentViewSty: PropTypes.any,//内容框样式
    borderRadiusStyle: PropTypes.any,//给文字切圆角颜色
};