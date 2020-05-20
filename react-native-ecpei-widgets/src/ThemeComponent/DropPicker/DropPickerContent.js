
import React, { Component, PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet,
    FlatList, ScrollView,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../utils/Screen";
import { RypTheme } from "../../RypTheme";
import computeProps from "../../utils/computeProps";
import { View, Text } from "native-base";
import HIcon from '../../library/HIcon';
import { DropManager } from "./DropManager";

const defaultOptions = {
    selectIcon: {
        name: "check-fws",
        color: "#FE4B3A",
        size: 16
    },
    buttonsOptions: [
        {
            title: "重置",
            titleContainerStyle: {
                height: SCALE_SIZE(88),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: "white",
                flex: 1,
            },
            titleStyle: {
                color: "#000000",
                fontFamily: "PingFangSC-Regular",
                fontSize: SCALE_SIZE(28)
            }
        },
        {
            title: "确定",
            titleContainerStyle: {
                backgroundColor: "#FE4B3A",
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                backgroundColor: "#FE4B3A"
            },
            titleStyle: {
                color: "#FFFFFF",
                fontFamily: "PingFangSC-Regular",
                fontSize: SCALE_SIZE(28)
            }
        }
    ],
    dropItemContainerStyle: {
        // height: SCALE_SIZE(104),
        justifyContent: 'space-between',
        backgroundColor: "white",
        alignItems: 'center',
        flexDirection: "row",
        paddingHorizontal: SCALE_SIZE(28),
        paddingVertical: SCALE_SIZE(30),
    },
    dropItemNormalTextStyle: {
        color: "#333333",
        fontFamily: "PingFangSC-Regular",
        fontSize: SCALE_SIZE(30)
    },
    dropItemSelectTextStyle: {
        color: "#FE4B3A",
        fontFamily: "PingFangSC-Regular",
        fontSize: SCALE_SIZE(30)
    },
    bottomContainerStyle: {
        borderTopWidth: SCALE_SIZE(1),
        borderTopColor: "#E5E5E5",
        height: SCALE_SIZE(88),
        flexDirection: 'row',
    }
}
class DropPickerContent extends PureComponent {
    static contextTypes = {
        theme: PropTypes.object
    };
    headerLayout = null
    options = null
    selectIndexs = []
    constructor(props) {
        super(props);
        if (props.id == null) {
            throw new Error("id 是必须的")
        }
        this.state = {
            showContent: false,
            multiple: false
        }
    }
    componentDidMount() {
        DropManager.addPart(2, this.props.id, this)
    }
    componentWillUnmount() {
        DropManager.removePart(2, this.props.id)
    }
    /**
     * toggle 开关
     * layout = {x,y,width,height} Tab栏的位置信息
     * options ={
     *  ...defaultOptions,
     *  data:{
            data: [],
            multiple: true,
            default: []
        },
     *  surePress:(result)=>{}
     * }
     * single:true 默认 必须
     */
    toggleContent = (toggle, layout, options, single = false) => {
        if (toggle == false) {
            return this.setState({ showContent: false });
        }
        if (single)
            options = { ...defaultOptions, ...options }
        let multiple = toggle ? options.data.multiple : false;
        this.selectIndexs = (options.data && options.data.default) || [];
        if (multiple == false && this.selectIndexs.length >= 2) { this.selectIndexs = [this.selectIndexs[0]] }

        this.headerLayout = layout;
        this.options = options || {};

        this.setState({
            showContent: !!toggle,
            multiple,
            data: (this.options.data && this.options.data.data) || []
        },()=>{
            setTimeout(()=>{
                this.state.data.length >= 5 && this.list && this.list.flashScrollIndicators()
            },1000)
        });
    }
    _renderItem = ({ item, index }) => {
        let element = item;
        let select = this.selectIndexs.includes(index)
        const {
            dropItemContainerStyle,
            dropItemNormalTextStyle,
            dropItemSelectTextStyle,
            selectIcon
        } = this.options
        let variables = (this.context.theme && this.context.theme["@@shoutem.theme/themeStyle"] && this.context.theme["@@shoutem.theme/themeStyle"].variables) || {}
        let headerVar = variables.rypVariables || {};
        return (
            <TouchableOpacityThrottle key={index} activeOpacity={1} onPress={() => {
                this._itemClick(index)
            }}>
                <View style={[dropItemContainerStyle]}>
                    <View style={{ flex: 1 }}>
                        <Text style={[{
                            color: select
                                ? headerVar.DropPicker_Content_Cell_Text_SelectColor
                                : headerVar.DropPicker_Content_Cell_Text_NormolColor
                        }, select ? dropItemSelectTextStyle : dropItemNormalTextStyle]}>
                            {
                                element
                            }
                        </Text>
                    </View>
                    <View>
                        {
                            select ? <HIcon {...selectIcon}></HIcon> : null
                        }
                    </View>
                </View>
            </TouchableOpacityThrottle>

        )
    }
    _renderItems = () => {

        let items = [];
        let datas = this.state.data;
        const {
            dropItemContainerStyle,
            dropItemNormalTextStyle,
            dropItemSelectTextStyle,
            selectIcon
        } = this.options
        let variables = (this.context.theme && this.context.theme["@@shoutem.theme/themeStyle"] && this.context.theme["@@shoutem.theme/themeStyle"].variables) || {}
        let headerVar = variables.rypVariables || {};
        for (let index = 0; index < datas.length; index++) {
            const element = datas[index];
            let select = this.selectIndexs.includes(index)
            items.push(
                <TouchableOpacityThrottle key={index} activeOpacity={1} onPress={() => {
                    this._itemClick(index)
                }}>
                    <View listView style={[dropItemContainerStyle]}>
                        <View style={{ flex: 1 }}>
                            <Text style={[{
                                color: select
                                    ? headerVar.DropPicker_Content_Cell_Text_SelectColor
                                    : headerVar.DropPicker_Content_Cell_Text_NormolColor
                            }, select ? dropItemSelectTextStyle : dropItemNormalTextStyle]}>
                                {
                                    element
                                }
                            </Text>
                        </View>
                        <View>
                            {
                                select ? <HIcon {...selectIcon}></HIcon> : null
                            }
                        </View>
                    </View>
                </TouchableOpacityThrottle>

            )
        }
        return items;
    }
    _renderButtons = () => {
        let items = [];
        const {
            buttonsOptions
        } = this.options
        for (let index = 0; index < 2; index++) {
            const element = buttonsOptions[index];
            items.push(
                <TouchableOpacityThrottle key={index} activeOpacity={1}
                    style={{ flex: 1 }}
                    onPress={() => {
                        this._buttonClick(index)
                    }}
                >
                    <View style={[element.titleContainerStyle]}>
                        <Text style={[element.titleStyle]}>
                            {
                                element.title
                            }
                        </Text>
                    </View>

                </TouchableOpacityThrottle>

            )
        }
        return items;
    }
    _itemClick = (index) => {
        let multiple = this.state.multiple;
        if (this.selectIndexs.includes(index)) {
            if (multiple) {
                this.selectIndexs = this.selectIndexs.filter((value) => { return value != index })
            }
        } else {
            if (multiple) {
                this.selectIndexs.push(index)
            } else {
                this.selectIndexs = [index]
            }
        }
        this.setState({
            data: [].concat(this.state.data)
        });
    }
    _buttonClick = (index) => {
        if (index == 0) {
            this.selectIndexs = []
            this.setState({
                data: [].concat(this.state.data)
            });
        } else {
            this.setState({ showContent: false });
            this.options.surePress && this.options.surePress(this.selectIndexs);
            DropManager.HandleResult(this.props.id, this.selectIndexs)
        }
    }
    prepareRootProps() {
        const defaultProps = {
            style: {
                position: "absolute",
                right: 0,
                left: 0,
                bottom: 0,
                top: (this.headerLayout ? (this.headerLayout.y + this.headerLayout.height) : 0) + (48 / 2),
                backgroundColor: "rgba(100,100,100,0.4)"
            }
        };
        return computeProps(this.props, defaultProps);
    }
    render() {
        if (this.state.showContent) {
            const { bottomContainerStyle } = this.options
            return (
                <View {...this.prepareRootProps()} >
                    {
                        this.state.data.length >= 5 ?
                            <FlatList style={{ maxHeight: SCALE_SIZE(440) }}
                                data={this.state.data}
                                renderItem={this._renderItem}
                                keyExtractor={(item, index) => index + ""}
                                ref={r => this.list = r}
                            >
                            </FlatList>
                            :
                            this._renderItems()
                    }

                    <View buttons style={[bottomContainerStyle]}>
                        {
                            this._renderButtons()
                        }
                    </View>
                    <TouchableOpacity 
                        style={{ backgroundColor:'rgba(100,100,100,0.4)',flex:1 }}
                        activeOpacity={1}
                        onPress={ ()=> this.props.emptyOnPress() }>

                    </TouchableOpacity>
                </View>
            )
        }

        return null
    };
}


const ThemeDropPickerContent = RypTheme.registerComponent("NativeBase.RypDropPickerContent", DropPickerContent);

export {
    ThemeDropPickerContent as DropPickerContent
}