/**
 * Created by tanlinwei
 *
 * Description:
 */
import React,{Component} from 'react';
import {StyleSheet,View} from 'react-native';
import PropTypes from 'prop-types';


export default class FilletView extends Component{
    render(){
        const {ViewStyle} = this.props;
        return(
            <View style={[styles.containStyle,ViewStyle]}>
            {
               this.props.children
            }
            </View>

        );
    }
};

const styles = StyleSheet.create({
    containStyle:{
        elevation:5, //此属性只对Android阴影设置有效，对iOS不影响
        shadowOffset: {width: 3, height: 2}, //阴影偏移量
        shadowOpacity: 0.8, //阴影透明度
        shadowRadius: 3, //阴影圆角半径
        borderRadius:5,  //视图圆角半径
        borderColor:'#fff', //边框颜色
        borderWidth:1, //边框宽度
        shadowColor: '#dfdfdf', //阴影颜色
        width:300,
        height:120,
        backgroundColor:'#fff', //背景颜色
    }
});

FilletView.defaultProps = {

};

FilletView.propTypes = {
    ViewStyle:PropTypes.any,
};