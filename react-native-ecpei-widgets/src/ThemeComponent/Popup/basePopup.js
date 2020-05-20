import React, { Component } from 'react';
import {
    StyleSheet, Dimensions, Modal, TextStyle, StatusBar
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../utils/Screen";
import { RypTheme } from "../../RypTheme";
import { View, Text } from "native-base";
// import computeProps from "../../utils/computeProps";

export class BasePopup extends Component {
    static contextTypes = {
        theme: PropTypes.object
    };
    constructor(props) {
        super(props);

    }
    
    render() {
        return (
            <View {...this.props}>
                <View style={[{ flex: 1 }, this.props.topContainerStyle]}>
                    {
                        this.props.titleComponent
                    }
                </View>
                {
                    this.props.customViews
                }
                <View style={[this.props.BottomContainerStyle]}>
                    {
                        this.props.bottomViews
                    }
                </View> 
            </View>
        )
    }

}

BasePopup.defaultProps = {
}
BasePopup.propTypes = {
    /**
     *  顶部标题 容器样式
     */
    topContainerStyle: PropTypes.any,
    /**
     * 底部按钮容器样式
     */
    BottomContainerStyle: PropTypes.any,
    /**
     * 底部按钮
     */
    // buttons: PropTypes.array,
    /**
     * 
     */
    titleComponent: PropTypes.any,
    /**
     * 底部自定义组件
     */
    bottomViews:PropTypes.any,
}

// const ThemeBasePopup = RypTheme.registerComponent("NativeBase.RypBasePopup", BasePopup);

// export {
//     ThemeBasePopup as BasePopup
// }