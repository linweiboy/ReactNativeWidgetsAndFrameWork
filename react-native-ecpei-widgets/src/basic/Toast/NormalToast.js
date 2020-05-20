/*
 * @Creator: 谭林伟 
 * @Date: 2018-11-14 15:25:46 
 * @Last Modified by: 朱子豪
 * @Last Modified time: 2019-07-08 11:42:08
 * @Desc: 
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    Text,
    Modal,
    ViewPropTypes as RNViewPropTypes,
} from 'react-native'

import PropTypes from 'prop-types';
const ViewPropTypes = RNViewPropTypes || View.propTypes;
export const DURATION = {
    LENGTH_SHORT: 500,
    FOREVER: 0,
};

const { height, width } = Dimensions.get('window');

export default class NormalToast extends Component {

    constructor(props) {
        super(props);
        this.state = Object.assign({
            isShow: false,
            text: '',
            position: this.props.position,
            opacityValue: new Animated.Value(this.props.opacity),
        }, this.props)
    }

    show(text, position, callback) {
        this.callback = callback;
        this.setState({
            isShow: true,
            text: text,
            position: position,
        });
        Animated.timing(
            this.state.opacityValue,
            {
                toValue: this.props.opacity,
                duration: this.props.fadeInDuration,
            }
        ).start(() => {
            this.isShow = true;
            this.close();
        });
    }
    //新增方法
    showLoading(text, position, time, callback) {
        this.callback = callback;
        this.setState({
            isShow: true,
            text: text,
            position: position,
        });
        Animated.timing(
            this.state.opacityValue,
            {
                toValue: this.props.opacity,
                duration: time,
            }
        ).start(() => {
            this.setState({
                isShow: false,
            });
        });
    }
    close(duration) {
        let delay = typeof duration === 'undefined' ? this.duration : duration;

        if (delay === DURATION.FOREVER) delay = this.props.defaultCloseDelay || 250;

        if (!this.isShow && !this.state.isShow) return;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            Animated.timing(
                this.state.opacityValue,
                {
                    toValue: 0.0,
                    duration: this.props.fadeOutDuration,
                }
            ).start(() => {
                this.setState({
                    isShow: false,
                });
                this.isShow = false;
                if (typeof this.callback === 'function') {
                    this.callback();
                }
            });
        }, delay);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        let pos;
        switch (this.state.position) {
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

        return (
            <Modal visible={this.state.isShow}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    this.setState({
                        isShow: false
                    });
                }}
            >
                <View
                    style={[styles.container, { top: pos }]}
                    pointerEvents="none"
                >
                    <Animated.View
                        style={[styles.content, { opacity: this.state.opacityValue }, this.props.style]}
                    >
                        {React.isValidElement(this.state.text) ? this.state.text : <Text style={this.props.textStyle}>{this.state.text}</Text>}
                    </Animated.View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        elevation: 999,
        alignItems: 'center',
        zIndex: 10000,
    },
    content: {
        backgroundColor: 'black',
        borderRadius: 5,
        padding: 10,
    },
    text: {
        color: 'white'
    }
});

NormalToast.propTypes = {
    style: ViewPropTypes.style,
    position: PropTypes.oneOf([
        'top',
        'center',
        'bottom',
    ]),
    textStyle: Text.propTypes.style,
    positionValue: PropTypes.number,
    fadeInDuration: PropTypes.number,
    fadeOutDuration: PropTypes.number,
    opacity: PropTypes.number
}

NormalToast.defaultProps = {
    position: 'center',
    textStyle: styles.text,
    positionValue: 120,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    opacity: 1
}
