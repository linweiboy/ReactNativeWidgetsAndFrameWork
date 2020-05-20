import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    FlatList, ViewPropTypes, TextStyle
} from 'react-native';
import PropTypes from 'prop-types';
import { View, Text } from "native-base";
import { PickerView } from "../Picker";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../../utils/Screen";
import { TouchableOpacityThrottle } from "../../Button/TouchableThrottle";
import HIcon from "../../../library/HIcon";
const STYLES = StyleSheet.create({
    BottomViewStyle: {
        height: SCALE_SIZE(88), justifyContent: 'center', alignItems: 'center',
        backgroundColor: "white"
    },
})
/**
 * 员工picker
 * <StaffPicker show={this.state.show} onPress={({index,value})=>{
                        this.setState({show:false});
                }}></StaffPicker>
 */
export class StaffPicker extends Component {
    _onPress = ({ index, value }) => {
        this.props.onPress && this.props.onPress({ index, value })
    }
    _bottomView = () => {
        return (
            <View bottomView>
                <TouchableOpacityThrottle style={[STYLES.BottomViewStyle, { flexDirection: "row" }]} onPress={() => this._onPress({ index: 2 })}>
                    <HIcon name={this.props.Icon.name}
                        size={this.props.Icon.size}
                        color={this.props.Icon.color}></HIcon>
                    <Text style={STYLES.BottomViewText}>{this.props.BottomViewText}</Text>
                </TouchableOpacityThrottle>
            </View>)
    }
    render() {
        return (
            <PickerView {...this.props} showBottomView={true} bottomView={this._bottomView} onPress={this._onPress}>

            </PickerView>
        )
    }
}
StaffPicker.defaultProps = {
    /**
     * 基础PickerView.defaultProps
     */
    ...PickerView.defaultProps,
    BottomViewText: "新增部门",
    Icon: {
        name: "add",
        size: 15,
        color: "#4D78E7"
    }
}