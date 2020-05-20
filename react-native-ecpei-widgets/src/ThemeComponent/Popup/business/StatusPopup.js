import React, { Component } from 'react';
import {
    StyleSheet, Image, Modal, TextStyle, ImageBackground
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle } from "../../Button/TouchableThrottle";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../../utils/Screen";
import { View, Text } from "native-base";
import { BasePopup } from "../basePopup";

const STYLES = StyleSheet.create({
    closeContainer: {
        height: SCALE_SIZE(108),
        alignItems: 'center',
    },
    contentContainer: {
        height: SCALE_SIZE(773),
        width: SCALE_SIZE(563)
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentViewBk: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: SCALE_SIZE(72),
    },
    contentButtonView: {
        width: SCALE_SIZE(392),
        height: SCALE_SIZE(76)
    },
    buttonText: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: SCALE_SIZE(32),
        color: "#DD3C49"
    }
})
export class StatusPopup extends Component {
    constructor(props) {
        super(props);
        this.contBk = require("./images/window_btn.png");
        this.closeBk = require("./images/window_close_btn.png")
    }
    render() {
        return (
            <View>
                <View style={STYLES.contentContainer}>
                    <ImageBackground style={STYLES.contentViewBk} source={this.props.type.bk()}>
                        <TouchableOpacityThrottle style={[STYLES.contentButtonView]} onPress={()=>this.props.onPress(2)}>
                            <ImageBackground source={this.contBk} style={[{ flex: 1 }, STYLES.center]}>
                                <Text style={[STYLES.buttonText, this.props.type.titleStyle]}>{this.props.type.title}</Text>
                            </ImageBackground>
                        </TouchableOpacityThrottle>
                    </ImageBackground>
                </View>
                <View style={STYLES.closeContainer}>
                    <TouchableOpacityThrottle onPress={()=>this.props.onPress(1)}>
                        <Image source={this.closeBk}></Image>
                    </TouchableOpacityThrottle>
                </View>
            </View>
        )
    }
}

export const StatusPopupType = {
    Type1: {
        title: "立即激活",
        titleStyle: null,
        // bk: () => require("./images/window_registered_successfully.png")
        bk:()=>null
    },
    Type2: {
        title: "立即查看",
        titleStyle: null,
        // bk: () => require("./images/window_approved.png")
        bk:()=>null
    },
    Type3: {
        title: "立即注册",
        titleStyle: null,
        // bk: () => require("./images/window_register.png")
        bk:()=>null
    }
}

export const StatusPopupOptions = {
    _type: "StatusPopupType",
    type: StatusPopupType.Type1,
}