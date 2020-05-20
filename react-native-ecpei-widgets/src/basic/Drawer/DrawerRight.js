/**
 * Created by tanlinwei
 *
 * Description:  右侧抽屉弹框
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    Platform,
    BackHandler,
    Modal,
    TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types';
import { scaleSize } from '../../library/appScreen'
import Header from '../NavigationBar/Header';

const { height, width } = Dimensions.get('window');

export default class DrawerRight extends Component {

    constructor(props) {
        super(props);
        this.state = {//设置初值
            currentStatus: false,//记录蒙层消失显示时渐变状态
            fadeAnim: new Animated.Value(1.0),
            isForbid: false,
            isShow: false,
        };
    }

    componentWillMount() {
        this.listener = BackHandler.addEventListener('hardwareBackPress', this.close.bind(this));
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            this.listener.remove('hardwareBackPress');
        }
    }

    //展开
    show(callback) {
        this.callback = callback;
        this.setState({ isShow: true });
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0.0,
            }
        ).start(() => {
            this.setState({ currentStatus: true });
        })

    }

    //关闭
    close() {
        if (this.state.isShow) {
            this.setState({ currentStatus: false }, () => {
                Animated.timing(
                    this.state.fadeAnim,
                    {
                        toValue: 1.0,
                    }
                ).start(() => {
                    this.setState({ isShow: false });
                });
            })
            return true
        }
        return false
    }



    render() {
        const { title, style,titleStyle,leftIconProps } = this.props;
        const bgColor = this.state.currentStatus ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)";

        return (
            <Modal animationType={"none"}
                transparent={true}
                visible={this.state.isShow}
                onRequestClose={() => {this.close()}}
            >
                <View style={[styles.container, { backgroundColor: bgColor }]} 
                    // onPress={ ()=> this.close() }
                    >
                    <Animated.View style={[styles.content, {
                        transform: [{
                            translateX: this.state.fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, width]
                            }),
                        }],//transform动画
                        flexDirection:'row'

                    }]}>
                        <TouchableOpacity
                            style={{ backgroundColor:'rgba(0,0,0,0)',width:width }}
                            activeOpacity={1}
                            onPress={ ()=> this.close() }>

                        </TouchableOpacity>
                        {/* <View style={[{ left: width - style.width, height: height}, style]}> */}
                        <View style={[{ height: height}, style]}>
                            {
                                this.props.isDefualtHeader ? 
                                <Header 
                                    leftIcon 
                                    leftIconProps={ leftIconProps } 
                                    titleStyle={ titleStyle }
                                    leftOnPress={() => { this.close() }} 
                                    title={title} /> : null
                            }
                            {
                                this.props.children
                            }
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 10000,
        bottom: 0,
        flex:1,
        justifyContent: 'flex-end'
    },
    content: {
        width: width,
        height: height,
        flex:1,
        justifyContent: 'flex-end'
    },

});

DrawerRight.defaultProps = {
    style: {
        width: 3 * (width / 4),
        height: height,
        backgroundColor: "#fff",
    },
    title: 'Hello',//检测文字颜色
};

DrawerRight.propTypes = {
    style: PropTypes.any,//样式
    isDefualtHeader: PropTypes.bool,//
    title: PropTypes.string,//
};