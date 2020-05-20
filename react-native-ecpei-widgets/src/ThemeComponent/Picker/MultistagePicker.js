import _Picker from 'react-native-picker';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Dimensions, ViewPropTypes, TextStyle
} from 'react-native';
import PropTypes from 'prop-types';
import { View, Text } from "native-base";
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../utils/Screen";

import { RypTheme } from "../../RypTheme";

export const Status = {
    Confirm: 0,
    Cancel: 1
}
class MultistagePicker extends Component {
    static contextTypes = {
        theme: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }
    /**
     * 关闭
     */
    close(){
        this.setState({show:false})
        _Picker.hide()
    }
    /**
    * 显示Picker
    * @param {*} items 显示的items
    * @param {*} selectValue 当前选中的
    * @param {*} options 自定义设置
    *           // pickerConfirmBtnText: "完成",
                // pickerConfirmBtnColor: [255, 255, 255, 1],
                // pickerCancelBtnText: "取消",
                // pickerCancelBtnColor: [255, 255, 255, 1],
                // //tool背景颜色
                // pickerToolBarBg: [63, 80, 243, 1],
                // //背景颜色
                // pickerBg: [255, 255, 255, 1],
                // //tool字体大小
                // pickerToolBarFontSize: SCALE_SIZE(30),
                // //picker字体大小
                // pickerFontSize: SCALE_SIZE(36),
                // pickerFontColor: [0, 0, 0, 1],
                // pickerRowHeight: SCALE_SIZE(88),
    */
    show(items = [], selectValue = null, options = {}) {
        this.setState({ show: true });
        return new Promise((resolve, reject) => {
            let _options = {};
            let theme = this.context.theme && this.context.theme["@@shoutem.theme/themeStyle"] && this.context.theme["@@shoutem.theme/themeStyle"]["variables"];
            if (theme != null) {
                theme = theme["rypVariables"] && theme["rypVariables"]["PickerOptions"]
                if (theme != null) {
                    Object.keys(theme).map((key, index) => {
                        let value = theme[key];
                        if (typeof value == "string") {
                            let _value = value.split(",")
                            if (_value.length == 4) {
                                _options[key] = _value.map((item) => {
                                    return parseFloat(item)
                                });
                            } else
                                _options[key] = value;
                        } else
                            _options[key] = value;
                    })
                }
            }

            _options = {
                ..._options,
                ...options
            }
            _Picker.init({
                pickerData: items,
                selectedValue: selectValue != null ? [selectValue] : [],
                wheelFlex: [1],
                pickerTitleText: "",
                ..._options,
                onPickerConfirm: (item, index) => {
                    this.setState({ show: false });
                    resolve({
                        item,
                        index,
                        status: Status.Confirm
                    })
                    this.setState({ show: false });
                },
                onPickerCancel: (item) => {
                    this.setState({ show: false });
                    resolve({
                        item,
                        status: Status.Cancel
                    })
                }
            })
            _Picker.show()
        })
    }
    render() {
        if (this.state.show) {
            return (
                <View style={{ position: "absolute", height: SCREEN_H, width: SCREEN_W, backgroundColor: "rgba(100,100,100,0.4)" }}>
                    <TouchableOpacityThrottle style={{ flex: 1 }}>

                    </TouchableOpacityThrottle>
                </View>
            )
        } else {
            return null;
        }

    }

}
const ThemePicker = RypTheme.registerComponent("NativeBase.RypPicker", MultistagePicker);

export {
    ThemePicker as MultistagePicker
}