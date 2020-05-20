

import React, { Component } from 'react';
import PropTypes from "prop-types";
import { StyleSheet, ImageBackground } from "react-native";
import { Text, View } from "native-base";
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import computeProps from "../../utils/computeProps";
import { RypTheme } from "../../RypTheme";
import { scaleSize as SCALE_SIZE } from "../../utils/Screen";

const STYLES = StyleSheet.create({
    center: { justifyContent: 'center', alignItems: 'center', },
    flex: { flex: 1 },
    container: {
        height: SCALE_SIZE(70),
    },
    tabsContainer: {
        flexDirection: 'row',
    },
    lineContainer: {
        height: SCALE_SIZE(6),
    },
    textBase: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: SCALE_SIZE(24),
    },
    selText: {
        color: "#000000"
    },
    norText: {
        color: "#666666"
    },
    lineView: { height: "100%", backgroundColor: "#FE4B3A" }
})

class StatusTabs extends Component {
    static contextTypes = {
        theme: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: this.props.selectIndex,
        }
    }
    setSelectIndex = (selectIndex) => {
        this.setState({ selectIndex });
    }
    _onPress = (index) => {
        this.setSelectIndex(index);
        this.props.onPress && this.props.onPress(this.props.items[index])
    }
    _renderItems() {
        let variables = (this.context.theme && this.context.theme["@@shoutem.theme/themeStyle"] && this.context.theme["@@shoutem.theme/themeStyle"].variables) || {}
        let rypVariables = variables.rypVariables;
        return this.props.items.map((item, index) => {
            return (
                <View style={[STYLES.flex]} key={item.title}>
                    <View style={[STYLES.flex, STYLES.center]}>
                        <TouchableOpacityThrottle onPress={() => this._onPress(index)} style={[{ flex: 1, paddingHorizontal: SCALE_SIZE(30) }, STYLES.center]}>
                            <Text style={[
                                {
                                    fontSize: rypVariables.StatusTabs_Text_Size,
                                    fontFamily: 'PingFang-SC-Medium',
                                },
                                index == this.state.selectIndex ?
                                    [
                                        { color: rypVariables.StatusTabs_Select_Text_Color },
                                        this.props.selectTextStyle]
                                    : [
                                        { color: rypVariables.StatusTabs_Normal_Text_Color },
                                        this.props.normalTextStyle]
                            ]}>{item.title}</Text>
                        </TouchableOpacityThrottle>
                    </View>
                    <View style={[STYLES.lineContainer, STYLES.center]}>
                        {
                            index == this.state.selectIndex ?
                                <View style={[{ width: rypVariables.StatusTabs_Line_Width, backgroundColor: rypVariables.StatusTabs_Line_Bk, height: "100%" }, { width: this.props.lineWidth }]}>
                                </View>
                                : null
                        }
                    </View>
                </View>
            )
        })
    }
    render() {
        let variables = (this.context.theme && this.context.theme["@@shoutem.theme/themeStyle"] && this.context.theme["@@shoutem.theme/themeStyle"].variables) || {}
        let rypVariables = variables.rypVariables;
        return (
            <View style={[{height:rypVariables.StatusTabs_Container_height},STYLES.tabsContainer, this.props.style]}>
                {this._renderItems()}
            </View>
        )
    }

}

StatusTabs.defaultProps = {
    items: [
        { title: "可使用" },
        { title: "不可使用" }
    ],
    selectIndex: 0,
    lineWidth: SCALE_SIZE(96)
}

StatusTabs.propTypes = {
    /***
     * 显示的数据
     */
    items: PropTypes.array,
    /**
     * 默认选择的index
     */
    selectIndex: PropTypes.number,

    /***
     * 未选中文本样式
     */
    normalTextStyle: PropTypes.any,
    /***
     * 选中文本样式
     */
    selectTextStyle: PropTypes.any,
    /**
     * 选中回调
     */
    onPress: PropTypes.func,
    /**
     * 线宽
     */
    lineWidth: PropTypes.number
}

const ThemeStatusTabs = RypTheme.registerComponent("NativeBase.RypStatusTabs", StatusTabs);

export { ThemeStatusTabs as StatusTabs }