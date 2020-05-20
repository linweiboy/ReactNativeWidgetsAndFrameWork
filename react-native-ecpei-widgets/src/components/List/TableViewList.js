/**
 * Created by tanlinwei
 *
 * Description: 业务组件--商务中心（员工管理、资金管理）带Icon图标的列表
 * 
 * ---旧组件，需要后面优化定制
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
} from 'react-native';
// import {images} from '../../sources';
import { screenW, screenH, scaleSize, setSpText } from '../../library/appScreen';
import theme from "../../library/base-theme";
import HIcon from '../../library/HIcon';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";

export default class TableViewList extends Component {

    //声明变量
    constructor(props) {
        super(props);
        this.state = {
            //定义数据源
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
                automaticallyAdjustContentInsets={true}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                removeClippedSubviews={false}
                scrollEnabled={false}
            />
        );
    }

    renderRow(rowData, sectionID, rowID, highlightRow) {
        const { onPress,textStyle,imageStyle,color} = this.props;
        return (
            <TouchableOpacityThrottle activeOpacity={1}
                onPress={() => this.props.onPress(rowID)}
            >
                <View style={styles.listViewStyle}>

                    <View style={styles.cellViewStyle}>
                        <HIcon name={rowData.icon}
                            style={styles.iconStyle}
                            size={scaleSize(34)}
                            color={color}
                        />
                        <Text style={[styles.titleStyle,textStyle]}>
                            {rowData.title}
                        </Text>
                    </View>
                    <View style={styles.tagViewStyle} >
                        <HIcon name='enter'
                            style={styles.imageStyle}
                            size={scaleSize(25)}
                        />
                    </View>

                </View>
                <View style={{ backgroundColor: theme.spaceLineColor, height: theme.spaceLineHeight }}></View>
            </TouchableOpacityThrottle>
        )

    }

    getDataList() {
        return (
            [
                { title: '员工管理', image: images.jiantou(), icon: images.employees() },
                { title: '资金管理', image: images.jiantou(), icon: images.money_m() },

            ]
        );
    }



}

const styles = StyleSheet.create({

    listViewStyle: {
        //设置主轴方向
        flexDirection: 'row',
        backgroundColor: 'white',
        height: scaleSize(88),
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: scaleSize(30)
    },

    cellViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    tagViewStyle: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: "row",
        marginRight: 15,
    },
    titleStyle: {
        fontSize: setSpText(26),
        fontFamily: theme.regularFontFamily,
        textAlign: 'center',
        marginLeft: scaleSize(24),
        color: theme.orderTypeColor,
        alignItems: 'center',
        marginBottom:scaleSize(20),
    },

    imageStyle: {
        width: scaleSize(24.8),
        height: scaleSize(24.8),
        // resizeMode: 'cover',
    },
    iconStyle: {
        width: scaleSize(34),
        height: scaleSize(34),
        // resizeMode: 'cover',
    }
});

//默认属性
TableViewList.defaultProps = {
    data: [ //title:文字标题  icon:Icon图片资源路径
        { title: '员工管理',  icon: 'e' },
        { title: '资金管理',  icon: 'e' },
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
    },
    size:scaleSize(34),
    color:'#09CAB1'
};

//暴露在外面的属性
TableViewList.propTypes = {
    data: PropTypes.array, //
    textStyle: PropTypes.any, //文字样式
    imageStyle: PropTypes.any, //图片样式
    color: PropTypes.string, //Icon颜色
    onPress: PropTypes.func, //点击事件
    size:PropTypes.number,//Icon字体大小
};