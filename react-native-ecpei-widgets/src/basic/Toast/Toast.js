/**
 * Created by tanlinwei
 *
 * Description:
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    Text,
    ViewPropTypes as RNViewPropTypes
} from 'react-native'

import PropTypes from 'prop-types';
// import RootSiblings from 'react-native-root-siblings';
import RootSiblings from "../../common/RootSiblings";
import DisplayAnimated, { AnimatedType } from '../../common/DisplayAnimated';
import Config from "../../Config";
import Loading from "../loader/Loading";
import { UIPlugin, UIPluginManager } from "react-native-ecpei-framework";

const ViewPropTypes = RNViewPropTypes || View.propTypes;
export const DURATION = {
    LENGTH_SHORT: 500,
    FOREVER: 0,
};

const { height, width } = Dimensions.get('window');


let sibling = new RootSiblings();

class Toast extends Component {


    constructor(props) {
        super(props);
        this.state = {
        }
        console.log("ceshi.show", props);
    }

    /**
     * 显示提示
     * @param {基础设置} options 
     */
    static show(options) {
        let _options = { disabled: true, text: "", textStyle: styles.text, showTime: 1500 };
        if (typeof options === "string") {
            options = { text: options };
        }
        _options = Object.assign(_options, options);
        return sibling.show(<Toast {..._options} />);
    }

    /**
     * 关闭释放
     * @param {*} ele 
     */
    static close(ele) {
        sibling.close(ele);
    }


    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    _onShowed = (ele) => {
        this.timer = setTimeout(() => {
            ele.animatedHide();
        }, this.props.showTime || 1000)
    }

    render() {
        const { disabled } = this.props;
        let pos;
        switch (this.props.position) {
            case 'top':
                pos = this.props.positionValue;
                break;
            case 'center':
                pos = height / 2;
                break;
            case 'bottom':
                pos = height - this.props.positionValue;
                break;
        }
        console.log("toast.render", this.props);
        {/* <Animated.View style={[styles.content, { opacity: this.state.opacityValue }, this.props.style]}> */ }
        {/* {React.isValidElement(this.state.text) ? this.state.text :  */ }
        return (
            <DisplayAnimated isShow={disabled} ref="disMain" onShowed={this._onShowed} pointerEvents="none" style={[styles.container, { top: pos }, this.props.style]} animatedType={AnimatedType.Fade} >
                <View style={[styles.content]}>
                    <Text style={[styles.text, this.props.textStyle]}>{this.props.text}</Text>
                </View>
            </DisplayAnimated >
        );
        {/* </Animated.View> */ }
    }


    static propTypes = {
        style: ViewPropTypes.style,
        position: PropTypes.oneOf([
            'top',
            'center',
            'bottom',
        ]),
        textStyle: Text.propTypes.style,
        positionValue: PropTypes.number,
        fadeInDuration: PropTypes.number,
        fadeOutDuration: PropTypes.number
    }

    static defaultProps = Config.Toast.defaultProps
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        elevation: 999,
        alignItems: 'center',
        zIndex: 10000,
    },
    pointCenter: {
    },
    content: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: 5,
        padding: 8,
    },
    text: {
        color: 'white'
    }
});


export default Toast;


class ToastPlugin extends UIPlugin {
    name = "ToastPlugin";
    component = View
    constructor() {
        super()
    }
    emit(options) {
        if (typeof options === "string") {
            let op = { text: options, position: "center" }
            Toast.show(op);
        } else {
            Toast.show(options);
        }
        return true;
    }
}

UIPluginManager.addPlugin(new ToastPlugin())