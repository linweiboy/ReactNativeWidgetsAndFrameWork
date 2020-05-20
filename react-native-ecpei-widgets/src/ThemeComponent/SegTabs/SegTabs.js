import React, { Component } from 'react';
import PropTypes from "prop-types";
import { StyleSheet, ViewPropTypes, ScrollView, View as _View } from "react-native";
import { Text, View } from "native-base";
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import computeProps from "../../utils/computeProps";
import { RypTheme } from "../../RypTheme";
import { scaleSize } from "../../utils/Screen";

const STYLE = StyleSheet.create({
    touch: {
        height: "100%",
        paddingHorizontal: scaleSize(20),
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 8,
    }
})

class SegTabs extends Component {
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
    getInitialStyle() {
        return {
            container: { flexDirection: 'row' }
        };
    }
    prepareRootProps() {
        const defaultProps = {
            style: this.getInitialStyle().container
        };
        return computeProps(this.props, defaultProps);
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
        for (let index = 0; index < this.state.items.length; index++) {
            let select = index == this.state.currentIndex;
            let title = this.state.items[index]
            _items.push(
                <View key={index}>
                    <TouchableOpacityThrottle throttle={1000} style={[STYLE.touch, this.props.textContainerStyle]} onPress={() => this._onPress(index, title)}>
                        <Text style={select ? this.props.selectTextStyle : this.props.textStyle} select={select}>
                            {
                                title
                            }
                        </Text>
                    </TouchableOpacityThrottle>
                </View>
            )
        }
        return _items;
    }
    render() {
        return (
            <View  {...this.prepareRootProps()}>
                <ScrollView style={{ flex: 1 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <_View style={{ flex: 1, flexDirection: 'row' }}>
                        {
                            this._renderItems()
                        }

                    </_View>
                </ScrollView>
            </View>
        )
    }
}
SegTabs.defaultProps = {
    items: [],
    currentIndex: 0
}

SegTabs.propTypes = {
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
    /**
     * TouchableOpacity
     * 作为标题的展示容器
     */
    textContainerStyle: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.any
    ]),
    /**
     * 未选择的字体样式
     */
    textStyle: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.any
    ]),
    /**
     * 选择的字体样式
     */
    selectTextStyle: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.any
    ]),
}


const ThemeSegTabs = RypTheme.registerComponent("NativeBase.RypSegTabs", SegTabs);

export { ThemeSegTabs as SegTabs }