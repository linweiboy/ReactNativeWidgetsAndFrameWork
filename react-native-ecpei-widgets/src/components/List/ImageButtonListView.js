/**
 * Created by tanlinwei
 *
 * Description:  业务组件-商务中心（我的店铺、采购管理）模块（发布商品或收藏夹模块），需要重写优化暂时使用
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
} from 'react-native';

import { screenW, screenH, scaleSize, setSpText } from '../../library/appScreen';
import theme from "../../library/base-theme";
import ImageTop from "../../basic/ImageText/ImageTop";
import PropTypes from 'prop-types';

export default class ImageButtonListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
        }
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.props.data)
        })
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                contentContainerStyle={styles.listViewStyle}//设置cell的样式
                removeClippedSubviews={false}
                horizontal={false}//设置滚动方向,默认垂直false
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                style={{ paddingTop: scaleSize(10), backgroundColor: "white", }}
            />
        );
    }

    renderRow = (rowData, sectionID, rowID, highlightRow) => {
        const { textStyle, imageStyle, onPress } = this.props;
        return (
            <View style={styles.bgStyle}>
                <ImageTop title={rowData.title}
                    image={rowData.url}
                    // 102
                    imageStyle={ imageStyle }

                    //29
                    textStyle={ textStyle}
                    key={rowID + ""}
                    onPress={() => { onPress(rowID) }}
                    activeOpacity={1}
                >

                </ImageTop>
            </View>
        );

    }

}



const styles = StyleSheet.create({
    listViewStyle: {
        flexDirection: 'row', //设置横向布局
        flexWrap: 'wrap',   //设置换行显示
    },

    bgStyle: {
        backgroundColor: 'white',
        width: screenW / 4,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: scaleSize(40),
    },
});

//默认属性
ImageButtonListView.defaultProps = {
    data: [ //title:文字标题  url:图片资源路径
        { title: '发布商品', url: '' },
        { title: '商品管理', url: '' },
        { title: '买家求购', url: '' },
        { title: '店铺管理', url: '' },
        { title: '客户管理', url: '' },
    ],
    textStyle: {
        color: theme.gray_medium,
        fontSize: scaleSize(26),
        fontFamily: theme.regularFontFamily,
        marginTop: scaleSize(26)
    },
    imageStyle: {
        width: scaleSize(54),
        height: scaleSize(54)
    }
};

//暴露在外面的属性
ImageButtonListView.propTypes = {
    data: PropTypes.array, //
    textStyle: PropTypes.any, //文字样式
    imageStyle: PropTypes.any, //图片样式
    onPress: PropTypes.func, //点击事件
};