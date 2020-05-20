import React, { Component } from 'react';
import PropTypes from "prop-types";
import { StyleSheet, ViewPropTypes, Modal } from "react-native";
import { Text, View } from "native-base";
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import computeProps from "../../utils/computeProps";
import { RypTheme } from "../../RypTheme";
import { scaleSize } from "../../utils/Screen";

const STYLE = StyleSheet.create({
    container: {
        // position: "absolute",
        // width: scaleSize(138),
    },
    itemContainer: {
        // flex: 1,
        // backgroundColor: "rgb(40,40,40)",
        // borderRadius: scaleSize(8),
        // overflow: 'hidden',
    },
    itemC: {
        position: "relative", flex: 1,
    },
    item: {
        flex: 1,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        // fontSize: scaleSize(26),
        // color: "white"
    },
    line: {
        // position: "absolute",
        // bottom: 0,
        // height: scaleSize(1),
        // backgroundColor: "#8E8E93"
    },
    down: {
        // position: "absolute",
        // backgroundColor: "rgb(40,40,40)",
        // height: 6,
        // width: 6,
        transform: [{ rotateZ: '45deg' }],
    }
})

class PopupDialog extends Component {
    static contextTypes = {
        theme: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            touchBkHidden: this.props.touchBkHidden,
            androidBackHidden: this.props.androidBackHidden,
            layout: { x: 0, y: 0, width: 0, height: 0 },
            item: [],
            dialogClick: this.props.itemClick
        }
    }
    /**
     * 
     * @param {*} index 选择的索引
     */
    _onPress = (index, item) => {
        this.setState({
            showModal: false
        }, () => this.state.dialogClick && this.state.dialogClick(index, item))
    }
    show(layout = { x: 0, y: 0, width: 0, height: 0 }, item = [], dialogClick, touchBkHidden, androidBackHidden) {
        // debugger
        this.setState({
            showModal: true,
            item,
            layout,
            touchBkHidden: touchBkHidden == undefined ? this.props.touchBkHidden : touchBkHidden,
            androidBackHidden: androidBackHidden == undefined ? this.props.androidBackHidden : androidBackHidden,
            dialogClick: dialogClick == undefined ? this.props.itemClick : dialogClick
        });
    }
    _renderItems = () => {
        let width = scaleSize(138);
        let height = scaleSize(77 * this.state.item.length);
        let left = this.state.layout.x + this.state.layout.width / 2 - width / 2;
        let top = this.state.layout.y - height;
        let _is_top = true
        if (top < 44) {
            top = this.state.layout.y + this.state.layout.height;
            _is_top = false
        }
        let _hei = 3;
        return (
            <View style={[{ left, top, height: height + _hei }, STYLE.container]}>
                <View container style={[STYLE.itemContainer, _is_top ? { marginBottom: _hei, } : { marginTop: _hei, }]}>
                    {
                        this.state.item.map((item, index) => {
                            return (
                                <View style={STYLE.itemC} key={item.title || item}>
                                    <TouchableOpacityThrottle activeOpacity={1} style={STYLE.item}
                                        onPress={() => this._onPress && this._onPress(index, item)}
                                    >
                                        <Text style={[STYLE.itemText]}>
                                            {item.title || item}
                                        </Text>
                                        {
                                            index != this.state.item.length - 1 ?
                                                <View style={[STYLE.line, { left: width / 4, width: width / 2 }]}></View> : null
                                        }
                                    </TouchableOpacityThrottle>
                                </View>
                            );
                        })
                    }
                </View>
                <View down style={[STYLE.down, { left: width / 2 - 2, }, _is_top ? { bottom: 0 } : { top: 0 }]}></View>
            </View>
        )
    }
    render() {
        return (
            <View  {...this.props} >
                <Modal
                    animationType={"none"}
                    transparent={true}
                    visible={this.state.showModal}
                    onRequestClose={() => {
                        if (this.state.androidBackHidden)
                            this.setState({ showModal: false });
                    }}
                >
                    <TouchableOpacityThrottle activeOpacity={1} style={{
                        flex: 1,
                    }} onPress={() => {
                        if (this.state.touchBkHidden) {
                            this.setState({ showModal: false });
                        }
                    }}
                    >
                        {this._renderItems()}
                    </TouchableOpacityThrottle>
                </Modal>
            </View>
        )
    }
}
PopupDialog.defaultProps = {
    touchBkHidden: true,
    androidBackHidden: true
}

PopupDialog.propTypes = {
    /**
     * 点击背景是否关闭
     */
    touchBkHidden: PropTypes.bool,
    /**
     * 安卓返回键是否关闭
     */
    androidBackHidden: PropTypes.bool,
    /**
     * 点击items
     * ["A","B"] or  [{title:"AA"},{title:"BB"}]
     */
    itemClick: PropTypes.func
}
const RypPopupDialog = RypTheme.registerComponent("NativeBase.RypPopupDialog", PopupDialog);

export { RypPopupDialog as PopupDialog }