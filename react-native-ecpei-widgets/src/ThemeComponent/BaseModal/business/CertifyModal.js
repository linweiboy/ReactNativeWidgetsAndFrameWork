import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet, Text, Modal, View, TouchableOpacity, ImageBackground, Image
} from 'react-native';
import PropTypes from 'prop-types';
import { ModalContainer } from "../ModalContainer";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../../utils/Screen";
import { ModalHeader } from "./ModalHeader";
import HIcon from "../../../library/HIcon";
const STYLES = StyleSheet.create({
    containerStyle: {
        backgroundColor: "white",
        borderTopLeftRadius: SCALE_SIZE(14),
        borderTopRightRadius: SCALE_SIZE(14),
        overflow: 'hidden',
    },
    bottomText: { fontFamily: 'PingFang-SC-Regular', fontSize: SCALE_SIZE(30), color: "white" },
    button: {
        marginHorizontal: SCALE_SIZE(62), height: SCALE_SIZE(80), marginBottom: SCALE_SIZE(56)
        , backgroundColor: "#4D78E7",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SCALE_SIZE(8),
    },
    imageSty: {
        width: SCALE_SIZE(489),
        height: SCALE_SIZE(313),
        borderRadius: SCALE_SIZE(8),
        borderWidth: SCALE_SIZE(1),
        borderColor: "#E5E5E5",
    },
    openStyC: {
        width: SCALE_SIZE(88),
        height: SCALE_SIZE(88),
        right: 0,
        bottom: 0,
        position: "absolute",
        paddingLeft: SCALE_SIZE(32),
        paddingTop: SCALE_SIZE(32),
    },
    openSty: {
        width: SCALE_SIZE(56),
        height: SCALE_SIZE(56),
        borderTopLeftRadius: SCALE_SIZE(24),
        borderTopRightRadius: SCALE_SIZE(8),
        borderBottomLeftRadius: SCALE_SIZE(8),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.35)",
    }
})
export class CertifyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: this.props.showModal,
            showImage: false
        }
    }
    // componentDidMount(){
    //     console.log(this.props.imageProps,"11111111111111111ss")
    // }
    componentWillReceiveProps(nextP) {
        if (nextP.showModal != this.state.showModal)
            this.setState({
                showModal: nextP.showModal,
            })
    }
    close = (index) => {
        this.setState({ showModal: false, showImage: false }, () => { this.props.onPress && this.props.onPress(index) });

    }
    _rightView = () => {
        return <HIcon {...this.props.rightIcon}></HIcon>
    }
    _opemImage = () => {
        this.setState({
            showImage: true
        });
        this.props.onPress(1, this.props.imageProps)
    }
    render() {
        return (
            <View>
                <ModalContainer {...this.props} showModal={this.state.showModal} backgroundColor={"rgba(0,0,0,0.4)"}
                    onRequestClose={() => {
                        this.close(2)
                    }}
                >
                    <TouchableOpacity style={{ flex: 1 }}></TouchableOpacity>
                    <View style={STYLES.containerStyle}>
                        <ModalHeader title={this.props.title} rightView={this._rightView} rightPress={() => this.close(2)}></ModalHeader>
                        <View style={{ height: SCALE_SIZE(566) }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <ImageBackground style={STYLES.imageSty} resizeMode={"center"} {...this.props.imageProps}>
                                    <View style={STYLES.openStyC}>
                                        <TouchableOpacity style={STYLES.openSty} onPress={this._opemImage}>
                                            <HIcon {...this.props.openIcon}></HIcon>
                                        </TouchableOpacity>
                                    </View>

                                </ImageBackground>
                            </View>
                            <TouchableOpacity style={[STYLES.button,this.props.buttonStyle]} onPress={() => this.close(0)}>
                                <Text style={[STYLES.bottomText,this.props.buttonTextStyle]}>
                                    {this.props.buttonText}
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        this.state.showImage ?

                            <TouchableOpacity activeOpacity={1} style={{ flex: 1,position:"absolute",top:0,bottom:0,left:0,right:0,backgroundColor:'black' }} onPress={() => this.setState({ showImage: false })}>
                                <ImageBackground style={{ flex: 1}}  {...this.props.imageProps} resizeMode={"contain"}>

                                </ImageBackground>
                            </TouchableOpacity>
                            : null
                    }
                </ModalContainer>


                {/*<ModalContainer showModal={this.state.showImage} backgroundColor={"black"}*/}
                    {/*onRequestClose={() => {*/}
                        {/*this.setState({ showImage: false })*/}
                    {/*}}*/}
                {/*>*/}
                    {/**/}
                {/*</ModalContainer>*/}
            </View>
        )
    }

}
CertifyModal.defaultProps = {
    title: "变更证明示例",
    rightIcon: { name: "close", color: "black" },
    imageProps: {
        source: null
    },
    openIcon: {
        name: "magnifyingglass",
        color: "white",
        size: 14
    },
    buttonText:"开始上传"
}
CertifyModal.propTypes = {
    //继承Modal属性
    //是否显示
    showModal: PropTypes.bool,
    //标题
    title: PropTypes.string,
    //标题栏右侧ICon
    rightIcon: PropTypes.any,
    //显示的图片
    imageProps: PropTypes.any,
    //查看按钮Hicon
    openIcon: PropTypes.any,
    //回调
    /***
     * 0 点击开始上传
     * 1 props 点击查看
     * 2 close
     */
    onPress: PropTypes.func,

    //按钮文字
    buttonText:PropTypes.string,
    //按钮文本样式
    buttonTextStyle:PropTypes.any,
    //按钮样式
    buttonStyle:PropTypes.any,
    
}
