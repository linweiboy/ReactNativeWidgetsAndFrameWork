import React, { Component, PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet,
    FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../utils/Screen";
import { RypTheme } from "../../RypTheme";
import { View, Text } from "native-base";
import computeProps from "../../utils/computeProps";

const { regions } = require("./regions")

const STYLE = StyleSheet.create({
    container: {
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.4)",
        left:0,right:0,top:0,bottom:0
    }
})
class AddressPicker extends PureComponent {
    static contextTypes = {
        theme: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            result: [{
                index: 0,
                title: this.props.toolDefaultText,
                value: null
            }],
            data: [],
            show: false
        }
    }
    /**
     * 
     * @param {*} item
     */
    _toolClick = (item) => {
        const { index } = item;
        if (index == 0) {
            this.setState({
                data: this.props.regions || regions,
                result: this.state.result.splice(0, index + 1)
            }, () => this.refs.list.scrollToIndex({ index: 0, animated: false }))
        } else {
            this.setState({
                data: this.state.result[index - 1].value.children,
                result: this.state.result.splice(0, index + 1)
            }, () => this.refs.list.scrollToIndex({ index: 0, animated: false }))
        }
    }
    /**
     * 省份  城市  地区  点击
     */
    _itemClick = (item) => {
        let index = item.grade;
        this.state.result[index].value = item;
        this.state.result[index].title = item.name;
        if (index == 2 || (item.children == null && item.children.lenght == 0)) {
            let result = this.state.result.map((item) => {
                let value = item.value;
                return value
            })
            this.setState({ show: false });
            this.props.onFinishSelect && this.props.onFinishSelect(result);
            return
        }
        this.setState({
            result: this.state.result.concat([{
                index: index + 1,
                title: this.props.toolDefaultText,
                value: null
            }])
        }, () => {
            this._toolClick({ index: index + 1 })
        })
    }
    /**
     * 关闭
     */
    close(){
        this.setState({
            show:false
        });
    }
    /**
     * 显示地址选择器
     */
    show() {
        this.setState({
            result: [{
                index: 0,
                title: this.props.toolDefaultText,
                value: null
            }],
            show: true,
            data:[]
        }, () => {
            this._toolClick({ index: 0 });
        })
    }

    /**
     * 渲染tool栏
     */
    _rendeToolItems = () => {
        let variables = (this.context.theme && this.context.theme["@@shoutem.theme/themeStyle"] && this.context.theme["@@shoutem.theme/themeStyle"].variables) || {}
        let headerVar = variables.rypVariables || {};
        return this.state.result.map((item, index) => {
            return (
                <TouchableOpacityThrottle key={index} onPress={() => { this._toolClick(item) }}
                >
                    <View style={[]}>
                        <Text style={[this.props.resultTextStyle, {
                            color:
                                index == this.state.result.length - 1
                                    ? (this.props.selectTextColor || headerVar.Address_Picker_text_select_Color)
                                    : (this.props.normalTextColor || headerVar.Address_Picker_text_Normal_Color)
                        }]}>
                            {
                                item.title
                            }
                        </Text>
                    </View>
                </TouchableOpacityThrottle>
            )
        })
    }
    /**
     * 渲染选项
     */
    _renderItem = ({ item }) => {
        let title = this.state.result[item.grade].title;
        let variables = (this.context.theme && this.context.theme["@@shoutem.theme/themeStyle"] && this.context.theme["@@shoutem.theme/themeStyle"].variables) || {}
        let headerVar = variables.rypVariables || {};
        return (
            <TouchableOpacityThrottle onPress={() => { this._itemClick(item) }}>
                <View style={[this.props.itemContainerStyle]}>
                    <Text style={[this.props.itemTextStyle, {
                        color: (title == item.name)
                        ? (this.props.selectTextColor || headerVar.Address_Picker_text_select_Color)
                        : (this.props.normalTextColor || headerVar.Address_Picker_text_Normal_Color)
                    }]}>
                        {
                            item.name
                        }
                    </Text>
                </View>
            </TouchableOpacityThrottle >
        )
    }
    _keyExtractor = (item, id) => {
        return item.code
    }
    prepareRootProps() {
        return computeProps(this.props, { style: StyleSheet.flatten(STYLE.container) });
    }
    
    render() {
        if (!this.state.show) { return null }
        return (
            <View {...this.prepareRootProps()}>
                <TouchableOpacityThrottle style={{ height: SCALE_SIZE(300) }}
                    onPress={() => {
                        if (this.props.clickBkHidden) {
                            this.setState({ show: false });
                        }
                    }}

                ></TouchableOpacityThrottle>
                <View style={this.props.containerStyle}>
                    <View titleView style={[this.props.titleContainerStyle]}>
                        <Text style={[this.props.titleStyle]}>{this.props.Title}</Text>
                    </View>
                    <View toolView style={[this.props.resultContainerStyle]}>
                        {
                            this._rendeToolItems()
                        }
                    </View>
                    <View listView style={{ flex: 1 }}>
                        <FlatList style={{ flex: 1,backgroundColor:"white" }}
                            data={this.state.data}
                            renderItem={this._renderItem}
                            keyExtractor={this._keyExtractor}
                            ref="list"
                        >
                        </FlatList>
                    </View>
                </View>
            </View>
        )
    }
}

AddressPicker.defaultProps = {
    Title:"所在地区",
    toolDefaultText: "请选择",
    // selectTextColor: "#FE4B3A",
    // normalTextColor: "#000000",
    regions
}

AddressPicker.propTypes = {
    /***
     * 标题
     */
    Title:PropTypes.string,
    /**
     * 底部容器样式
     */
    containerStyle: PropTypes.any,
    /***
     * 顶部 标题容器样式
     */
    titleContainerStyle: PropTypes.any,
    /**
     * 顶部 标题样式
     */
    titleStyle: PropTypes.any,
    /**
     * tool 栏容器样式
     */
    resultContainerStyle: PropTypes.any,
    /***
     * tool 选择结果样式 
     */
    resultTextStyle: PropTypes.any,
    /**
     * tool 默认文字
     */
    toolDefaultText: PropTypes.string,
    /***
     * tool栏 当前选择的文字颜色
     */
    selectTextColor: PropTypes.string,
    normalTextColor: PropTypes.string,
    /**
     * 省份  城市 市区  选择容器样式
     */
    itemContainerStyle: PropTypes.any,
    /**
     * 省份  城市 市区  选择文字样式
     */
    itemTextStyle: PropTypes.any,
    /***
     * 点击背景隐藏
     */
    clickBkHidden: PropTypes.bool,
    /**
     * 结果返回函数
     */
    onFinishSelect: PropTypes.func,
    /**
     * 地址数据
     * [
     *  {
     *      name:"湖北",
     *      value:1,
     *      code:11,
     *      grade:0 //0-2
     *      children:[
     *          {
     *              name:"武汉",
     *              value:212,
     *              code:100,
     *              grade:1,
     *              parent:1,
     *              children:[
     *                  {}
     *              ]
     *          }
     *          ....
     *      ]
     *  }
     *  ....
     * ]
     */
    regions:PropTypes.any
}

const ThemeAddressPicker = RypTheme.registerComponent("NativeBase.RypAddressPicker", AddressPicker);

export {
    ThemeAddressPicker as AddressPicker
}