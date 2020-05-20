/**
 * Created by tanlinwei
 *
 * Description:  业务组件-首页四个图标文字按钮（商品管理、车架查询、买家求购、发布商品）
 *               UI布局，
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

import PropTypes from 'prop-types';
import { scaleSize, setSpText } from '../../library/appScreen';
import theme from "../../library/base-theme";
import ImageTop from "../../basic/ImageText/ImageTop";
export default class ImageButton extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {data,textStyle,imageStyle,onPress} = this.props;
        return (
            <View style={styles.container}>
                {
                    data.map((item, index) => {
                        return (
                            <ImageTop title={item.title}
                                image={item.url}
                                // 102
                                imageStyle={imageStyle}
                                //29
                                textStyle={textStyle}
                                key={index + ""}
                                onPress={() => { onPress(index) }}
                                activeOpacity={1}
                            >
                            </ImageTop>
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
        backgroundColor: '#fff',
        // backgroundColor: "yellow",
        height: scaleSize(239),
    },

    

    

});

//默认属性
ImageButton.defaultProps = {
    data: [ //title:文字标题  url:图片资源路径
        { title: '商品管理', url: '' },
        { title: '车架号查询', url: '' },
        { title: '买家求购', url: '' },
        { title: '发布商品', url: '' },
    ],
    imageStyle: {
        width: scaleSize(126),
        height: scaleSize(126),
        resizeMode: 'cover',
        marginTop: scaleSize(18),
    },
    textStyle: {
        color: theme.imageButFontColor,
        fontSize: theme.imageButFontSize,
        paddingTop: 5,
        textAlign: 'center',
        fontFamily: theme.regularFontFamily,
        marginBottom: scaleSize(30),
    },
};

//暴露在外面的属性
ImageButton.propTypes = {
    data: PropTypes.array, //数据
    textStyle: PropTypes.any, //文字样式
    imageStyle: PropTypes.any, //图片样式
    onPress: PropTypes.func, //点击事件
};