import React, { Component } from 'react';
import PropTypes from "prop-types";
import { StyleSheet, ViewPropTypes } from "react-native";
import { Text, View } from "native-base";
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import computeProps from "../../utils/computeProps";
import { RypTheme } from "../../RypTheme";
import { scaleSize } from "../../utils/Screen";

const STYLE = StyleSheet.create({
})

class SegCollection extends Component {
    static contextTypes = {
        theme: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: this.props.currentIndex,
            items: this.props.items
        }
    }
    /**
     * 
     * @param {*} index 选择的索引
     */
    _onPress = (index, item) => {
        this.setState({
            currentIndex: index
        }, () => {
            this.props.onChangeTab && this.props.onChangeTab(index, item)
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            currentIndex: nextProps.currentIndex,
            items: nextProps.items
        });
    }
    _renderItems = () => {
        let _items = [];
        let variables = (this.context.theme && this.context.theme["@@shoutem.theme/themeStyle"] && this.context.theme["@@shoutem.theme/themeStyle"].variables) || {}
        let headerVar = variables.rypVariables || {};
        let selStyle = {
            fontSize: headerVar.SegCollection_Select_Font_Size,
            fontFamily: headerVar.SegCollection_Select_Font_Family,
            color: headerVar.SegCollection_Select_Font_color
        }
        let norStyle = {
            fontSize: headerVar.SegCollection_Normal_Font_Size,
            fontFamily: headerVar.SegCollection_Normal_Font_Family,
            color: headerVar.SegCollection_Normal_Font_color
        }
        for (let index = 0; index < this.state.items.length; index++) {
            let select = index == this.state.currentIndex;
            let title = this.state.items[index]
            if (select) {
                let as = title.split(this.props.splitCode);
                let num = as[as.length - 1]
                as.length = as.length - 1
                _items.push(
                    <View style={[STYLE.touch]} key={title}>
                        <TouchableOpacityThrottle throttle={1000} style={{
                            flex: 1, justifyContent: 'center',
                            alignItems: 'center',
                        }} onPress={() => this._onPress(index, title)}>
                            <Text style={this.props.selectTextStyle || selStyle} select={select}>
                                {
                                    as.join(this.props.splitCode)
                                }
                                <Text style={this.props.normalTextStyle || norStyle}>
                                    {this.props.splitCode + num}
                                </Text>
                            </Text>

                        </TouchableOpacityThrottle>
                    </View>
                )
            } else {
                _items.push(
                    <View style={[STYLE.touch]}>
                        <TouchableOpacityThrottle throttle={1000} style={{
                            flex: 1, justifyContent: 'center',
                            alignItems: 'center',
                        }} onPress={() => this._onPress(index, title)}>
                            <Text style={this.props.normalTextStyle || norStyle} select={select}>
                                {
                                    title
                                }
                            </Text>
                        </TouchableOpacityThrottle>
                    </View>
                )
            }

        }
        return _items;
    }
    render() {
        return (
            <View  {...this.props} style={[this.props.style]}>
                {
                    this._renderItems()
                }
            </View>
        )
    }
}
SegCollection.defaultProps = {
    splitCode: "(",
    items: ["已经完善(99+)", "待补录(99+)", "待处理(99)"],
    currentIndex: 0
}

SegCollection.propTypes = {
    /**
     * 分割字符
     */
    splitCode: PropTypes.string,
    /**
     * 展示的数据源
     */
    items: PropTypes.array.isRequired,
    /***
     * 默认选择的index
     */
    currentIndex: PropTypes.number,
    /***
     * 作为点击的回调
     */
    onChangeTab: PropTypes.func,
    selectTextStyle: PropTypes.any,
    normalTextStyle: PropTypes.any
}


const ThemeSegCollection = RypTheme.registerComponent("NativeBase.RypSegCollection", SegCollection);

export { ThemeSegCollection as SegCollection }