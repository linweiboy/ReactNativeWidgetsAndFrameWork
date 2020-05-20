/**
 * 
 * 业务组件-待付款、待发货等模块，带有悬浮标签
 * 
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import { scaleSize, setSpText } from '../../library/appScreen';
import theme from "../../library/base-theme";
import BadgeView from "../../basic/BadgeView";
import ImageTop from '../../basic/ImageText/ImageTop';
import PropTypes from 'prop-types';

export default class MeOrderList extends Component {

    constructor(props) {
        super(props)
    }


    render() {        
        return (
            <View style={styles.container}>

                {this.props.data.map((item, index) => {
                    var itemT = "";
                    if(item.count>=1&&item.count<10){
                        itemT = item.count;
                    }else{
                        itemT = (item.count>99)?"99+":item.count+"";
                    }
                    return (
                        <View style={{ position: "relative", justifyContent: "center" }} key={index}>
                            <ImageTop title={item.title}
                                image={item.url}
                                onPress={() => { this.props.onPress(index) }}
                                imageStyle={this.props.imageStyle}
                                key={item.title}
                                resizeMode={"contain"}
                                textStyle={{fontSize: scaleSize(26),
                                    color: theme.gray_medium,
                                    fontFamily: theme.regularFontFamily,
                                    marginTop: scaleSize(12),}}
                            >
                            </ImageTop>
                            <View style={{ position: "absolute", left: scaleSize(50), top: 5 }} >
                                {
                                    item.count >= 1 ? <BadgeView textStr={itemT + ""} background={theme.news} fontSize={scaleSize(26)} height={20}></BadgeView> : null
                                }

                            </View>
                        </View>

                    )
                })}


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'space-around',
        height: scaleSize(172),
        backgroundColor: "white",
    },

    orderImageStyle: {
        width: scaleSize(94.6),
        height: scaleSize(76.6),
    },
    orderTextStyle: {
        // marginTop:5,
        color: theme.orderTypeColor,
        textAlign: 'center',
        fontSize: theme.orderTypeFontSize,
        fontFamily: theme.regularFontFamily,
    },

    textViewStyle: {
        position: 'absolute',
        right: scaleSize(0),
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: scaleSize(33),
        //
        backgroundColor: '#F00D0D',
        borderColor: '#F00D0D',
        borderRadius: 10,
        borderWidth: 2,
        overflow: 'hidden',
    },

    textStyle: {
        

    },
    imageStyle: {
        
    },
});

//默认属性
MeOrderList.defaultProps = {
    data: [ //title:文字标题  url:图片资源路径
        { title: '商品管理', url: '', count: 0 },
        { title: '车架号查询', url: '', count: 0 },
        { title: '买家求购', url: '', count: 0 },
        { title: '发布商品', url: '', count: 0 },
    ],
    imageStyle: {
        width: scaleSize(60),
        height: scaleSize(60),
        resizeMode: "contain",
    },
};

//暴露在外面的属性
MeOrderList.propTypes = {
    data: PropTypes.array, //数据
    textStyle: PropTypes.object, //文字样式
    imageStyle: PropTypes.object, //图片样式
    onPress: PropTypes.func, //点击事件
};


