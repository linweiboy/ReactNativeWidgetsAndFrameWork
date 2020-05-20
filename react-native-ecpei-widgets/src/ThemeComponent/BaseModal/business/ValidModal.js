import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { ModalContainer } from "../ModalContainer";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../../utils/Screen";
import { ModalHeader } from "./ModalHeader";
import HIcon from "../../../library/HIcon";
import { TextInput, isNumber } from "../../Input";
const STYLES = StyleSheet.create({
    containerStyle: {
        height: SCALE_SIZE(604),
        backgroundColor: "white",
        // minHeight: SCALE_SIZE(320),
        borderTopLeftRadius: SCALE_SIZE(14),
        borderTopRightRadius: SCALE_SIZE(14),
        overflow: 'hidden',
    }
})

export class ValidModal extends Component {
    selectValue = ""
    constructor(props) {
        super(props);
        this.state = {
            showModal: this.props.showModal,
            selectIndex: this.props.selectItem.selectIndex || 0
        }
        this.selectValue = this.props.selectItem.value;
    }
    close = () => {
        this.setState({ showModal: false });
    }
    rightPress = () => {
        this.close();
        if (this.props.selectResult) {
            let index = this.state.selectIndex;
            let res = { index, value: null };
            if (index >= 2) res.value = this.selectValue;
            this.props.selectResult && this.props.selectResult(res)
        }
    }
    componentWillReceiveProps(nextP) {
        if (nextP.showModal != this.state.showModal) {
            this.selectValue = nextP.selectItem.value
            this.setState({
                showModal: nextP.showModal,
                selectIndex: nextP.selectItem.selectIndex
            })
        }

    }
    onChangeText = (value) => {
        this.selectValue = value;
    }
    _renderItem = (item, index) => {
        if (item.type == "string") {
            return <Text>{item.title}</Text>
        } else if (item.type == "input") {
            return (
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                    <Text>{item.title[0]}</Text>
                    <View style={{ width: SCALE_SIZE(158), marginHorizontal: SCALE_SIZE(10), borderWidth: SCALE_SIZE(1), borderColor: "#D1D1D6", borderRadius: SCALE_SIZE(4), }}>
                        <TextInput
                            clearTextOnFocus={true}
                            multiline={false}
                            numberOfLines={1}
                            underlineColorAndroid={"transparent"}
                            textInputStyle={{ height: SCALE_SIZE(64), padding: 0, margin: 0, textAlign: "center" }}
                            editable={index == this.state.selectIndex}
                            keyboardType={"numeric"}
                            verification={[isNumber]}
                            placeholder={""}
                            onChangeText={this.onChangeText}
                            value={index == this.state.selectIndex ? this.selectValue : ""}
                        ></TextInput>
                    </View>
                    <Text>{item.title[1]}</Text>
                </View>
            )
        }

    }
    _iconSelect = (index) => {
        if (index != this.state.selectIndex)
            this.setState({
                selectIndex: index
            });
    }
    _renderContent = () => {
        if (this.props.datas) {
            return this.props.datas.map((item, index) => {
                return (
                    <View key={index + ""} style={{ height: SCALE_SIZE(110), flexDirection: 'row', }}>
                        <TouchableOpacity
                            onPress={() => this._iconSelect(index)}
                            style={{ width: SCALE_SIZE(110), justifyContent: 'center', alignItems: 'center', }}
                        >
                            <HIcon
                                size={18}
                                name={this.state.selectIndex == index ? "labelcheck" : "labelcheck-o"}
                                color={this.state.selectIndex == index ? "#4D78E7" : "#D1D1D6"}
                            ></HIcon>
                        </TouchableOpacity>
                        <View style={{ flex: 1, justifyContent: 'center', paddingLeft: SCALE_SIZE(10) }}>
                            {
                                this._renderItem(item, index)
                            }
                        </View>
                    </View>
                )
            })
        }
    }
    render() {
        return (
            <ModalContainer {...this.props} showModal={this.state.showModal} backgroundColor={"rgba(0,0,0,0.4)"}>
                <TouchableOpacity style={{ flex: 1 }}></TouchableOpacity>
                <View style={STYLES.containerStyle}>
                    <ModalHeader
                        title={this.props.title}
                        rightText={this.props.rightText}
                        leftIconPress={this.close}
                        leftIcon={this.props.leftIcon}
                        rightPress={this.rightPress}
                    ></ModalHeader>
                    {
                        this._renderContent()
                    }
                </View>
            </ModalContainer>
        )
    }

}

ValidModal.defaultProps = {
    title: "修改质保期",
    rightText: "完成",
    leftIcon: { name: "close", color: "black" },
    datas: [
        {
            type: "string",
            title: ["无质保"]
        },
        {
            type: "string",
            title: ["保装车"]
        },
        {
            type: "input",
            title: ["保", "个月"]
        },
        {
            type: "input",
            title: ["保", "天"]
        }
    ],
    selectItem: {
        selectIndex: 2,
        value: "8"
    },
    selectResult: null
}
ValidModal.propTypes = {
    /***
     * 继承ModalContainer
     */
    ...ModalContainer.propTypes,
    /**
     * 顶部标题
     */
    title: PropTypes.string,
    /***
     * 左侧icon
     */
    leftIcon: PropTypes.any,
    /***
     * 右侧文字
     */
    rightText:PropTypes.string,
    /**
     * 显示的内容
     */
    datas:PropTypes.array,
    /**
     * 默认选项
     */
    selectItem:PropTypes.any,
    /**
     * 结果回调
     */
    selectResult:PropTypes.func
}