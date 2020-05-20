import React, { Component } from 'react';
import PropTypes from "prop-types";
import { StyleSheet, ViewPropTypes, ScrollView, View as _View } from "react-native";
import { Text, View } from "native-base";
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import computeProps from "../../utils/computeProps";
import { RypTheme } from "../../RypTheme";
import { scaleSize } from "../../utils/Screen";

const STYLE = StyleSheet.create({
    container: {
        width: scaleSize(388),
        height: scaleSize(58),
        flexDirection: 'row',
        // overflow: 'hidden',
    },
    segBaseStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})


class Segments extends Component {
    static contextTypes = {
        theme: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            index: this.props.currentIndex,
            titles: this.props.titles
        }
    }
    componentWillReceiveProps(nextP) {
        this.setState({ index: nextP.currentIndex, titles: nextP.titles });
    }
    _render() {
        let tisArr = [];
        let variables = (this.context.theme && this.context.theme["@@shoutem.theme/themeStyle"] && this.context.theme["@@shoutem.theme/themeStyle"].variables) || {}
        let headerVar = variables.rypVariables || {};
        let themeColor = this.props.themeColor || headerVar.Segments_Theme_Color;
        for (let index = 0; index < this.state.titles.length; index++) {
            const element = this.state.titles[index];
            let Radia = {
                borderColor: themeColor,
            };
            if (index == 0) {
                Radia = {
                    ...Radia,
                    // borderTopLeftRadius: scaleSize(8),
                    // borderBottomLeftRadius: scaleSize(8),
                    // borderBottomWidth: scaleSize(2),
                    // borderTopWidth: scaleSize(2),
                    // borderLeftWidth: scaleSize(2),
                }
            } else if (index == this.state.titles.length - 1) {
                Radia = {
                    ...Radia,
                    // borderTopRightRadius: scaleSize(8),
                    // borderBottomRightRadius: scaleSize(8),
                    // borderBottomWidth: scaleSize(2),
                    // borderTopWidth: scaleSize(2),
                    // borderRightWidth: scaleSize(2)
                }
            } else {
                Radia = {
                    ...Radia,
                    // borderBottomWidth: scaleSize(2),
                    // borderTopWidth: scaleSize(2),
                }
            }

            if (index != 0) {
                Radia = {
                    ...Radia,
                    borderLeftWidth: scaleSize(2),

                }
            }

            if (index == this.state.index) {
                Radia = {
                    ...Radia,
                    backgroundColor: themeColor,
                }
            } else {
                Radia = {
                    ...Radia,
                    backgroundColor: "white",

                }
            }
            tisArr.push(
                <TouchableOpacityThrottle key={element} style={[STYLE.segBaseStyle, Radia]} onPress={() => {
                    this.setState({ index }, () => {
                        this.props.segClick && this.props.segClick(this.state.index)
                    });
                }}>
                    <Text style={[{ color: index == this.state.index ? "white" : themeColor }]}>{element}</Text>
                </TouchableOpacityThrottle>
            )
        }
        return tisArr
    }
    render() {
        let variables = (this.context.theme && this.context.theme["@@shoutem.theme/themeStyle"] && this.context.theme["@@shoutem.theme/themeStyle"].variables) || {}
        let headerVar = variables.rypVariables || {};
        let themeColor = this.props.themeColor || headerVar.Segments_Theme_Color;
        return (
            <View {...this.props} style={[STYLE.container, this.props.style, {
                borderRadius: scaleSize(8),
                borderColor: themeColor,
                borderWidth: scaleSize(2),
                overflow: "hidden"
            }]}>
                {
                    this._render()
                }
            </View>
        )
    }

}

Segments.defaultProps = {
    // themeColor: "#4D78E7",
    titles: ["销售中", "仓库中"],
    currentIndex: 0
}

Segments.propTypes = {
    /**
     * 表面主题颜色
     */
    themeColor: PropTypes.any,
    /**
     * 显示的标题
     */
    titles: PropTypes.array,
    /**
     * 当前所处的索引
     */
    currentIndex: PropTypes.number,
    /**
     * 点击触发事件
     */
    segClick: PropTypes.func

}

const ThemeSegments = RypTheme.registerComponent("NativeBase.RypSegments", Segments);

export { ThemeSegments as Segments }