import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet, Text, Modal, View, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { ModalContainer } from "../ModalContainer";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../../utils/Screen";
import { ModalHeader } from "./ModalHeader";
const STYLES = StyleSheet.create({
    containerStyle: {
        backgroundColor: "white",
        // minHeight: SCALE_SIZE(320),
        borderTopLeftRadius: SCALE_SIZE(14),
        borderTopRightRadius: SCALE_SIZE(14),
        overflow: 'hidden',
        paddingBottom: SCALE_SIZE(110),
    },
    colView: {
        paddingHorizontal: SCALE_SIZE(32),
        height: SCALE_SIZE(112),
        paddingTop: SCALE_SIZE(40),
        flexDirection: 'row',
    },
    itemCont: {
        height: SCALE_SIZE(72),
        width: SCALE_SIZE(116),
        marginLeft: SCALE_SIZE(16),
        borderRadius: SCALE_SIZE(8),
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemSel: {
        backgroundColor: "#E5EEFF"
    },
    itemNor: {
        backgroundColor: "#F7F7F7"
    },
    itemTextSel: {
        fontFamily: "PingFang-SC-Regular",
        fontSize: SCALE_SIZE(26),
        color: "#4D78E7"
    },
    itemTextNor: {
        fontFamily: "PingFang-SC-Regular",
        fontSize: SCALE_SIZE(26),
        color: "#000000"
    }
})
export class UnitModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSelectIndex: this.props.currentSelectIndex,
            showModal: this.props.showModal
        }
    }
    close = () => {
        this.setState({ showModal: false });
    }
    _itemPress = (item, index) => {
        if (this.props.itemSelect) {
            if (!this.props.itemSelect(item)) {
                this.setState({ showModal: false });
            } else {
                index >= 0 && this.setState({
                    currentSelectIndex: index
                })
            }
        } else {
            this.setState({ showModal: false });
        }
    }
    componentWillReceiveProps(nextP) {
        if (nextP.showModal != this.state.showModal || nextP.currentSelectIndex != this.state.currentSelectIndex)
            this.setState({
                showModal: nextP.showModal,
                currentSelectIndex: nextP.currentSelectIndex
            })
    }
    _renderCols = () => {
        let col = Math.floor((this.props.datas.length + 5 - 1) / 5);
        let views = [];
        for (let index = 0; index < col; index++) {
            let items = this.props.datas.slice(5 * index, 5 * (index + 1))
            views.push(
                <View key={index + ""} style={STYLES.colView}>
                    {
                        items.map((item, _index) => {
                            let selIndex = index * 5 + _index;
                            let select = selIndex == this.state.currentSelectIndex;
                            return (
                                <TouchableOpacity throttle={false} key={_index + ""} style={[
                                    STYLES.itemCont,
                                    select ? [STYLES.itemSel, this.props.selContainerStyle] : [STYLES.itemNor, this.props.norContainerStyle]]}
                                    onPress={() => this._itemPress(item, selIndex)}
                                >
                                    <Text style={select ? [STYLES.itemTextSel, this.props.selTextStyle] : [STYLES.itemTextNor, this.props.norTextStyle]}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            )
        }
        return views;
    }
    render() {

        return (
            <ModalContainer {...this.props} showModal={this.state.showModal} backgroundColor={"rgba(0,0,0,0.4)"}>
                <TouchableOpacity style={{ flex: 1 }}></TouchableOpacity>
                <View style={STYLES.containerStyle}>
                    <ModalHeader title={this.props.title} leftIconPress={this.props.close} leftIcon={this.props.leftIcon}></ModalHeader>
                    <View >
                        {
                            this._renderCols()
                        }
                    </View>
                </View>
            </ModalContainer>
        )
    }

}
UnitModal.defaultProps = {
    title: "选中单位",
    leftIcon: { name: "close", color: "black" },
    currentSelectIndex: 0,
    datas: [
        {
            title: "朱"
        }, {
            title: "子"
        }, {
            title: "豪"
        }
    ],
    selContainerStyle: null,
    selTextStyle: null,
    norContainerStyle: null,
    norTextStyle: null
}

UnitModal.propTypes = {
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
    /**
     * 默认选中索引
     */
    currentSelectIndex: PropTypes.number,
    /**
     * 展示数据
     */
    datas: PropTypes.any,
    /**
     * item  选中和为选中 容器样式
     */
    norContainerStyle: PropTypes.any,
    selContainerStyle: PropTypes.any,
    /**
     * item  选中和为选中 文本样式
     */
    selTextStyle: PropTypes.any,
    borTextStyle: PropTypes.any,
    /**
     * item 选中回调 
     * return true  不关闭modal
     */
    itemSelect: PropTypes.func
}