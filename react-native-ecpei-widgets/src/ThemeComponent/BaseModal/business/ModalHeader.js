import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet, Text, View, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../../utils/Screen";
import HIcon from "../../../library/HIcon";
const STYLES = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container:{ height: SCALE_SIZE(108), flexDirection: 'row',backgroundColor:"white" },
    widHei: {
        height: SCALE_SIZE(108),
        width: SCALE_SIZE(108),
        backgroundColor: "white",
    },
    titleSty: {
        fontFamily: "PingFangSC-Medium",
        fontSize: SCALE_SIZE(32),
        color: "#000000"
    },
    rightText:{
        fontFamily: "PingFang-SC-Regular",
        fontSize: SCALE_SIZE(30),
        color: "#4D78E7"
    }
})

export class ModalHeader extends Component {
    constructor(props) {
        super(props);

    }
    _rightView = () => {
        if (this.props.rightView) {
            return this.props.rightView();
        } else {
            if (this.props.rightText) {
                return <Text style={STYLES.rightText}>
                    {this.props.rightText}
                </Text>
            }
        }
    }
    render() {
        return (
            <View style={STYLES.container}>
                <TouchableOpacity style={[STYLES.widHei, STYLES.center]} onPress={this.props.leftIconPress}>
                    <HIcon {...this.props.leftIcon}></HIcon>
                </TouchableOpacity>
                <View style={[STYLES.center, { flex: 1 }]}>
                    <Text style={STYLES.titleSty}>{this.props.title}</Text>
                </View>
                <TouchableOpacity style={[STYLES.widHei,STYLES.center]} onPress={this.props.rightPress}>
                    {
                        this._rightView()
                    }
                </TouchableOpacity>
            </View>
        )
    }

}