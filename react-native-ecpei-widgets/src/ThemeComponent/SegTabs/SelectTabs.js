import React, { Component } from 'react';
import PropTypes from "prop-types";
import { StyleSheet, ImageBackground } from "react-native";
import { Text, View } from "native-base";
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import computeProps from "../../utils/computeProps";
import { RypTheme } from "../../RypTheme";
import { scaleSize as SCALE_SIZE } from "../../utils/Screen";

const STYLES = StyleSheet.create({
    flex: {
        flex: 1,
    },
    leftRadius: {
        borderTopLeftRadius: SCALE_SIZE(8),
    },
    rightRadius: {
        borderTopRightRadius: SCALE_SIZE(8)
    },
    selectText: {
        fontFamily: "PingFang-SC-Medium",
        fontSize: SCALE_SIZE(32),
        color: "#4D78E7"
    },
    normalText: {
        fontFamily: "PingFang-SC-Medium",
        fontSize: SCALE_SIZE(32),
        color: "#4A4F66"
    }
})
class SelectTabs extends Component {
    static contextTypes = {
        theme: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: this.props.selectIndex,
            datas: this.props.items
        }
        this.leftIcon = require("./images/left_selected.png")
        this.rightIcon = require("./images/right_selected.png")
    }
    _onPress = (index) => {
        if (index != this.state.selectIndex) {
            this.setState({ selectIndex: index });
            this.props.onPress && this.props.onPress(this.state.datas[index])
        }
    }

    render() {
        let variables = (this.context.theme && this.context.theme["@@shoutem.theme/themeStyle"] && this.context.theme["@@shoutem.theme/themeStyle"].variables) || {}
        let rypVariables = variables.rypVariables;
        let seltext = [rypVariables.SelectTabs_Item_sel_Text, this.props.selectText]
        let nortext = [rypVariables.SelectTabs_Item_nor_Text, this.props.normalText]
        return (
            <View  {...this.props}>
                <View bk style={[this.state.selectIndex == 1 ? STYLES.leftRadius : STYLES.rightRadius]}></View>
                <View content>
                    <ImageBackground style={STYLES.flex} source={this.state.selectIndex == 0 ? this.leftIcon : null}>
                        <TouchableOpacityThrottle style={[STYLES.flex]} activeOpacity={1} onPress={() => this._onPress(0)}>
                            <View >
                                <Text style={this.state.selectIndex == 0 ? seltext : nortext}>{this.state.datas[0].title}</Text>
                            </View>
                        </TouchableOpacityThrottle>
                    </ImageBackground>
                    <ImageBackground style={STYLES.flex} source={this.state.selectIndex == 1 ? this.rightIcon : null}>
                        <TouchableOpacityThrottle style={[STYLES.flex]} activeOpacity={1} onPress={() => this._onPress(1)}>
                            <View >
                                <Text style={this.state.selectIndex == 1 ? seltext : nortext}>{this.state.datas[1].title}</Text>
                            </View>
                        </TouchableOpacityThrottle>
                    </ImageBackground>
                </View>
            </View>
        )
    }
}

SelectTabs.defaultProps = {
    items: [
        { title: "新增报价" },
        { title: "匹配库存" }
    ],
    selectIndex: 0
}

SelectTabs.propTypes = {
    /**
     * 展示的数据源
     */
    items: PropTypes.array.isRequired,
    /**
     * 点击触发
     */
    onPress: PropTypes.func,

    //文字样式
    selectText: PropTypes.any,
    normalText: PropTypes.any,
}


const ThemeSelectTabs = RypTheme.registerComponent("NativeBase.RypSelectTabs", SelectTabs);

export { ThemeSelectTabs as SelectTabs }