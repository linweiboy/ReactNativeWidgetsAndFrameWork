import React, { Component, PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TextInput, NativeModules, findNodeHandle
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../utils/Screen";
import { RypTheme } from "../../RypTheme";
import computeProps from "../../utils/computeProps";
import { View, Text } from "native-base";
import HIcon from '../../library/HIcon';
import { DropManager } from "./DropManager";

class DropPockerHeader extends Component {
    static contextTypes = {
        theme: PropTypes.object
    };
    layout = null;
    constructor(props) {
        super(props);
        if (props.id == null) {
            throw new Error("id 是必须的")
        }
        this.state = {
            selectIndex: -1,
            showItem: false,
            dropItems: this.props.dropItems,
            SegOptions: this.props.SegOptions
        }
    }
    componentWillReceiveProps(nextP) {
        this.setState({
            dropItems: nextP.dropItems,
            SegOptions: nextP.SegOptions
        });
    }
    /**
     * 关闭选择器
     */
    close() {
        this.setState({ showItem: false, selectIndex: -1 }, () => {
            DropManager.toggleContent(this.props.id, false, this.layout)
        });
    }
    HandleResult(result) {
        this.props.surePress && this.props.surePress(this.state.selectIndex, result)
        this.setState({ selectIndex: -1 });
    }
    componentDidMount() {
        DropManager.addPart(1, this.props.id, this)
    }
    componentWillUnmount() {
        DropManager.removePart(1, this.props.id)
    }
    _renderTopTabs = () => {
        let buttons = [];
        let options = this.state.SegOptions || [];
        let variables = (this.context.theme && this.context.theme["@@shoutem.theme/themeStyle"] && this.context.theme["@@shoutem.theme/themeStyle"].variables) || {}
        let headerVar = variables.rypVariables || {};
        for (let index = 0; index < options.length; index++) {
            const element = options[index];
            let select = this.state.selectIndex == index
            let props = {};
            buttons.push(
                <TouchableOpacityThrottle
                    key={index}
                    activeOpacity={1}
                    style={{ flex: 1 }}
                    onPress={() => {


                        let showItem = true;
                        if (index == this.state.selectIndex) {
                            showItem = !this.state.showItem
                        }
                        let defaultV = false;
                        if (this.props.segOnPress) {
                            defaultV = this.props.segOnPress(index)
                        }
                        let can = !!defaultV == false;
                        let state = { selectIndex: showItem ? index : -1, showItem: can ? showItem : false }
                        this.setState(state, () => {
                            NativeModules.UIManager.measureInWindow(findNodeHandle(this.refs.DropHeader), (x, y, width, height) => {
                                DropManager.toggleContent(this.props.id, this.state.showItem, { x, y, width, height }, {
                                    selectIcon: this.props.selectIcon,
                                    data: this.state.dropItems[this.state.selectIndex],
                                    buttonsOptions: this.props.buttonsOptions,
                                    dropItemContainerStyle: this.props.dropItemContainerStyle,
                                    dropItemNormalTextStyle: this.props.dropItemNormalTextStyle,
                                    dropItemSelectTextStyle: this.props.dropItemSelectTextStyle,
                                    bottomContainerStyle: this.props.bottomContainerStyle,
                                })
                            })
                        });
                    }}
                >
                    <View style={[{ flex: 1, }]}>
                        <Text style={[{
                            color: select ? headerVar.DropPicker_Header_Text_SelectColor : headerVar.DropPicker_Header_Text_NormolColor,
                            maxWidth: SCALE_SIZE(120),
                        },
                        select ? this.props.segButtonSelectTextStyle : this.props.segButtonNormalTextStyle]}
                            numberOfLines={1}
                            adjustsFontSizeToFit={false}
                        >
                            {
                                element.title
                            }
                        </Text>
                        <HIcon {...(select ? element.selIcon : element.norIcon)}></HIcon>
                    </View>

                </TouchableOpacityThrottle>
            )

        }
        return buttons
    }
    render() {
        return (
            <View {...this.props} >
                <TouchableOpacityThrottle ref={"DropHeader"}>
                    <View style={[this.props.titleContainerStyle]}>
                        {
                            this._renderTopTabs()
                        }
                    </View>
                </TouchableOpacityThrottle>
            </View>
        )
    };
}

DropPockerHeader.defaultProps = {
    SegOptions: [
        {
            title: "品质",
            norIcon: {
                name: "pulldown-fws",
                color: "#BBBBBB",
                size: 14
            },
            selIcon: {
                name: "pulldown-fws",
                color: "#FE4B3A",
                size: 14
            }
        },
        {
            title: "发票",
            norIcon: {
                name: "pulldown-fws",
                color: "#BBBBBB",
                size: 14
            },
            selIcon: {
                name: "pulldown-fws",
                color: "#FE4B3A",
                size: 14
            }
        }, {
            title: "地区",
            norIcon: {
                name: "tab-address-fws",
                color: "#BBBBBB",
                size: 14
            },
            selIcon: {
                name: "tab-address-fws",
                color: "#FE4B3A",
                size: 14
            }
        }
    ],
    segButtonNormalTextStyle: {
        // color: "red"
    },
    segButtonSelectTextStyle: {
        // color: "blue"
    },
    dropItemContainerStyle: {
        // height: SCALE_SIZE(104),
        // justifyContent: 'center',
        // borderColor: "green",
        // borderWidth: 1,
        // backgroundColor: "white",
        // paddingHorizontal: 10,
    },
    dropItemNormalTextStyle: {
        // color: "#333333"
    },
    dropItemSelectTextStyle: {
        // color: "#FE4B3A"
    },
    dropItems: [
        {
            data: ["A","A","A","A"],
            multiple: true,
            default: []
        },
        {
            data: ["!!","AAA","AS","ASAS"],
            multiple: true,
            default: []
        },
        {
            data: ["CSDS","EWQ","ASASA","SAS"],
            multiple: false,
            default: []
        }
    ],
    buttonsOptions: [
        {
            title: "重置",
            titleContainerStyle: {},
            titleStyle: { color: "#000000" }
        },
        {
            title: "确定",
            titleContainerStyle: { backgroundColor: "#FE4B3A", },
            titleStyle: { color: "#FFFFFF" }
        }
    ],
    bottomContainerStyle: {
        borderTopWidth: SCALE_SIZE(1),
        borderTopColor: "#E5E5E5",
    },
    selectIcon: {
        name: "check-fws",
        color: "#FE4B3A",
        size: 16
    }
}

DropPockerHeader.propTypes = {
    /***
     *  顶部容器样式
     */
    titleContainerStyle: PropTypes.any,
    /**
     * 顶部按钮配置
     */
    SegOptions: PropTypes.array,
    /**
     * 顶部文字设置
     */
    segButtonNormalTextStyle: PropTypes.any,
    segButtonSelectTextStyle: PropTypes.any,


    /**
    *  下拉界面设置
    */
    dropItems: PropTypes.any,
    /**
     * cell 
     */
    dropItemContainerStyle: PropTypes.any,
    /**
     * cell Text
     */
    dropItemNormalTextStyle: PropTypes.any,
    /**
     * cell Text
     */
    dropItemSelectTextStyle: PropTypes.any,
    /**
     * 底部按钮
     */
    buttonsOptions: PropTypes.array,
    /**
     * 底部按钮容器样式
     */
    bottomContainerStyle: PropTypes.any,
    /**
     * 选择后的icon
     */
    selectIcon: PropTypes.any,
    /**
     * 接受最后结果的函数
     */
    surePress: PropTypes.func,
    /**
     * 顶部按钮点击事件
     * return 
     *  true 阻止默认事件
     *  false 执行默认事件
     */
    segOnPress: PropTypes.func
}


const ThemeDropPockerHeader = RypTheme.registerComponent("NativeBase.RypDropPockerHeader", DropPockerHeader);

export {
    ThemeDropPockerHeader as DropPockerHeader
}