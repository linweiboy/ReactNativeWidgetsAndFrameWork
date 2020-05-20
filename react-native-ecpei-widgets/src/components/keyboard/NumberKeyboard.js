/**
 * Created by tanlinwei
 *
 * Description:  自定制数字输入键盘
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    TouchableOpacity,
    Platform,
    BackHandler,
    Text
} from 'react-native'
import HIcon from '../../library/HIcon';
import PropTypes from 'prop-types';
import { KeyButton as Button } from '../../basic/Buttons';
import { scaleSize } from '../../library/appScreen'
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";
const { height, width } = Dimensions.get('window');

export default class NumberKeyboard extends Component {

    constructor(props) {
        super(props);
        this.state = {//设置初值
            currentAlpha: 1.0,//标志位，记录当前value
            fadeAnim: new Animated.Value(1.0),
            isShow: false,
            ensureTitle: '确定',
            ensureType: true,//只有当为 true，为确定按钮的时候才自动隐藏键盘将确定事件传出
        };
    }

    //展开键盘
    show(callback) {
        this.callback = callback;
        this.setState({
            isShow: true,
        });
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0.0,
                duration: 300,
            }
        ).start(() => {
            this.isShow = true;
        });
    }

    //关闭键盘
    close() {
        if (this.state.isShow) {
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 1.0,
                    duration: 300,
                }
            ).start(() => {
                this.setState({
                    isShow: false,
                });
                this.isShow = false;
            });
        }
    }

    //通知外部调用关闭方法
    closeOnpress() {
        if (typeof this.callback === 'function') {
            this.callback({ event: "close" })
        }
        this.close();
    }

    palyVioce = (text) => {
        if (typeof this.callback === 'function') {
            this.callback(text);
        }
    };
    //删除按钮
    deleteOnPress = () => {
        if (typeof this.callback === 'function') {
            this.callback({ event: "delete" })
        }
    }

    //长按删除
    longDeleteOnPress = () => {
        if (typeof this.callback === 'function') {
            this.callback({ event: "continuousDelete" })
        }
    };

    //长按抬起结束
    pressOut = () => {
        if (typeof this.callback === 'function') {
            this.callback({ event: "pressOut" })
        }
    }

    //修改确定按钮文字
    changeEnsureTitle = (title) => {
        if (title && title != null) {
            this.setState({ ensureTitle: title });
        }
        if (typeof this.callback === 'function') {
            this.callback({ event: "changeTitle" })
        }
    }

    ensureClick = () => {

        if (typeof this.callback === 'function' && this.state.ensureType) {
            this.callback({ event: "ensure", title: this.state.ensureTitle })
        }
    }

    numberContent() {
        const letter = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", " "];
        const { hiddeColor, hiddeName } = this.props;
        return (
            letter.map((item, index) => {

                if (index == 11) {
                    return (
                        <TouchableOpacityThrottle onPress={() => { this.closeOnpress() }} key={index}>
                            <View style={styles.hiddeViewSty} >
                                <HIcon name={hiddeName} color={hiddeColor} size={scaleSize(50)} />
                            </View>
                        </TouchableOpacityThrottle>)

                } else {

                    return (
                        <Button onPress={() => { this.palyVioce(item) }}
                            style={styles.buttonStyle}
                            key={index}
                            title={item}
                            textStyle={styles.textStyle}
                        />
                    )
                }
            })
        );
    }


    render() {
        const { deleteColor, deleteName } = this.props;

        const view = this.state.isShow ? <View style={styles.container}>
            <Animated.View style={[styles.content, {
                transform: [//transform动画
                    {
                        translateY: this.state.fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, scaleSize(384)] //线性插值，0对应310，1对应0
                        }),
                    },

                ],
            }]}>
                <View style={styles.numContentStyle}>
                    {
                        this.numberContent()
                    }
                </View>
                <View style={styles.rightContentStyle}>
                    <TouchableOpacityThrottle onPress={this.deleteOnPress} onLongPress={this.longDeleteOnPress} onPressOut={this.pressOut} >
                        <View style={styles.deleteStyle} >
                            <HIcon name={deleteName} color={deleteColor} size={scaleSize(50)} />
                        </View>
                    </TouchableOpacityThrottle>
                    <TouchableOpacityThrottle onPress={this.ensureClick}>
                        <View style={styles.ensureSty} >
                            <Text style={styles.titleStyle}>{this.state.ensureTitle}</Text>
                        </View>
                    </TouchableOpacityThrottle>

                </View>

            </Animated.View>
        </View> : null;

        return (view)
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
    },
    content: {
        backgroundColor: '#fff',
        width: width,
        height: scaleSize(382),
        flexDirection: 'row',
    },
    hiddeViewSty: {
        width: width / 4,
        height: scaleSize(96),
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopColor: '#b7b7b7',
        borderRightColor: '#b7b7b7',
        borderTopWidth: 0.5,
        borderRightWidth: 0.5,
    },
    numContentStyle: {
        flex: 0.75,
        backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        flexWrap: "wrap",
    },
    rightContentStyle: {
        flex: 0.25,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },

    buttonStyle: {
        width: width / 4,
        height: scaleSize(96),
        borderTopColor: '#b7b7b7',
        borderRightColor: '#b7b7b7',
        borderTopWidth: 0.5,
        borderRightWidth: 0.5,
        borderRadius: 0,
    },
    textStyle: {
        fontSize: scaleSize(50),

    },
    deleteStyle: {
        width: width / 4,
        height: scaleSize(190),
        borderTopColor: '#b7b7b7',
        borderTopWidth: 0.5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ensureSty: {
        backgroundColor: '#3F50F3',
        width: width / 4,
        height: scaleSize(190),
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleStyle: {
        fontSize: 18,
        color: '#fff',

    }

});

NumberKeyboard.defaultProps = {
    deleteName: 'keyboard_d',//删除Icon名字
    deleteColor: '#000000',//删除Icon颜色
    hiddeName: 'keyboard',//隐藏键盘Icon
    hiddeColor: '#000',//隐藏按钮颜色
};

NumberKeyboard.propTypes = {
    deleteName: PropTypes.string,//删除Icon名字
    deleteColor: PropTypes.string,//删除Icon颜色
    hiddeName: PropTypes.string,//隐藏键盘Icon
    hiddeColor: PropTypes.string,//隐藏按钮颜色
};