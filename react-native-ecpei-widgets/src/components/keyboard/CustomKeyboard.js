/**
 * Created by tanlinwei
 *
 * Description:  自定制VIN码输入键盘
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    TouchableOpacity,
    Platform,
    NativeModules,
    BackHandler
} from 'react-native'
import HIcon from '../../library/HIcon';
import PropTypes from 'prop-types';
import Speech from 'native-speech';
import { KeyButton as Button } from '../../basic/Buttons';
import { scaleSize } from '../../library/appScreen'

const { height, width } = Dimensions.get('window');

export default class CustomKeyboard extends Component {

    constructor(props) {
        super(props);
        this.state = {//设置初值
            currentAlpha: 1.0,//标志位，记录当前value
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

    //展开键盘
    show(callback) {

        NativeModules.SpeechModule.initialTts()
        console.log("componentDidMount_login", NativeModules.SpeechModule);
        this.callback = callback;
        this.setState({
            isShow: true,
        });
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0.0,
            }
        ).start(() => {
            this.isShow = true;
        });
    }

    //关闭键盘
    close() {
        if (this.state.isShow) {
            this.setState({ isForbid: false });
            // if (Platform.OS == "android") {
            // Speech.speechRelease();
            NativeModules.SpeechModule.speechRelease();
            // }
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 1.0,
                }
            ).start(() => {
                this.setState({
                    isShow: false,
                });
                this.isShow = false;
            });
            return true
        }
        return false
    }

    palyVioce = (text) => {
        if (!this.state.isForbid) {
            let str = text.toLowerCase();
            if (Platform.OS == "android") {
                Speech.speak({
                    text: str,
                    language: 'zh-cn',
                });
            } else {
                NativeModules.SpeechModule.speak(str, () => { });
            }

        }
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

    addBack() {
        this.props.closeOnPress();
    }

    //数字视图
    nuberView() {
        const number = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        return (
            <View style={[styles.nuberViewSty, { paddingTop: 5 }]}>
                {
                    number.map((item, index) => {
                        return (
                            <Button onPress={() => { this.palyVioce(item) }}
                                title={item}
                                style={styles.buttonStyle}
                                key={index}
                                textStyle={styles.textStyle}
                            />
                        )
                    })
                }
            </View>
        );
    }

    letterFisrtViewSty() {
        const letter = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
        return (
            <View style={styles.letterFisrtViewSty}>
                {
                    letter.map((item, index) => {
                        return (
                            <Button onPress={() => { this.palyVioce(item) }}
                                title={item}
                                style={styles.buttonStyle}
                                key={index}
                                textStyle={styles.textStyle}
                            />
                        )
                    })
                }
            </View>
        );
    }

    letterSecondViewSty() {
        const letter = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
        return (
            <View style={[styles.letterFisrtViewSty, { paddingLeft: 20, paddingRight: 20 }]}>
                {
                    letter.map((item, index) => {
                        return (
                            <Button onPress={() => { this.palyVioce(item) }}
                                title={item}
                                style={styles.buttonStyle}
                                key={index}
                                textStyle={styles.textStyle}
                            />
                        )
                    })
                }
            </View>
        );
    }
    letterThreeViewSty() {
        const letter = ["", "Z", "X", "C", "V", "B", "N", "M", ""];
        const { vocieName, vocieColor, deleteColor, deleteName } = this.props;
        return (
            <View style={styles.letterFisrtViewSty}>
                {
                    letter.map((item, index) => {

                        if (index == 0) {
                            return (
                                <TouchableOpacity onPress={() => {
                                    this.setState({ isForbid: !this.state.isForbid });
                                    this.change(!this.state.isForbid);
                                }} key={index}>
                                    <View style={styles.voiceSty} >
                                        <HIcon name={vocieName} color={this.state.isForbid ? '#b7b7b7' : vocieColor} size={scaleSize(30)} />
                                    </View>
                                </TouchableOpacity>
                            )
                        } else if (index == 8) {
                            return (
                                <TouchableOpacity onPress={this.deleteOnPress} onLongPress={this.longDeleteOnPress} onPressOut={this.pressOut} key={index}>
                                    <View style={styles.voiceSty} >
                                        <HIcon name={deleteName} color={deleteColor} size={scaleSize(30)} />
                                    </View>
                                </TouchableOpacity>)

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
                }
            </View>
        );
    }
    //分享给朋友
    shareOnPress = () => {
        if (typeof this.callback === 'function') {
            this.close()
            this.callback({ event: "share" })
        }
    };

    //判断键盘的收起开启选择初始化语音和释放
    change(status) {
        if (Platform.OS == "android") {
            if (status) {
                // Speech.speechRelease();
                NativeModules.SpeechModule.speechRelease();
            } else {
                // Speech.initialTts();
                NativeModules.SpeechModule.initialTts();
            }
        }
    }
    //立即查询
    checkVIN = () => {
        if (typeof this.callback === 'function') {
            this.close()
            this.callback({ event: "query" })
        }
    };

    shareOrCheckView() {
        const bt = ["分享给朋友", "立即查询"];
        const { shareTextColor, shareViewBackColor, checkTexTColor, checkViewBackColor } = this.props;
        return (
            <View style={[styles.letterFisrtViewSty, { height: scaleSize(120) }]}>
                {
                    bt.map((item, index) => {
                        let color = index == 0 ? shareTextColor : checkTexTColor;
                        let backColor = index == 0 ? shareViewBackColor : checkViewBackColor;
                        let click = index == 0 ? this.shareOnPress : this.checkVIN;
                        return (
                            <Button onPress={click}
                                title={item}
                                style={[styles.shareButtonSty, { backgroundColor: backColor }]}
                                textStyle={{ color: color, fontSize: scaleSize(36) }}
                                key={index}
                            />
                        )
                    })
                }
            </View>
        );
    }
    //截图
    Photograph = () => {
        if (typeof this.callback === 'function') {
            this.close();
            this.callback({ event: "printscreen" })
        }
    };

    render() {
        const { photoBackColor, photoIconColor, photoName } = this.props;
        const view = this.state.isShow ? <View style={styles.container}>
            <Animated.View style={[styles.content, {
                transform: [//transform动画
                    {
                        translateY: this.state.fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, scaleSize(680)] //线性插值，0对应310，1对应0
                        }),
                    },

                ],
            }]}>

                <View style={styles.headerStyle}>
                    <View style={{
                        backgroundColor: '#fff', top: scaleSize(32), width: width,
                        height: scaleSize(85)
                    }} />
                </View>
                <View style={{ backgroundColor: "#D3D5DB" }}>
                    {this.nuberView()}
                    {this.letterFisrtViewSty()}
                    {this.letterSecondViewSty()}
                    {this.letterThreeViewSty()}
                    {this.shareOrCheckView()}
                </View>

                {/*圆形拍照按钮视图*/}
                <View style={[styles.roundView, { backgroundColor: photoBackColor }]}>
                    <TouchableOpacity onPress={this.Photograph}>
                        <HIcon name={photoName} color={photoIconColor} size={scaleSize(40)} />
                    </TouchableOpacity>
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
        backgroundColor: 'transparent',
        width: width,
        height: scaleSize(645),
    },
    headerStyle: {
        backgroundColor: 'transparent',
        width: width,
        height: scaleSize(140),
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        backfaceVisibility: 'visible',
    },
    roundView: {
        backgroundColor: '#DB3727',
        width: scaleSize(120),
        height: scaleSize(120),
        borderRadius: scaleSize(60),
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        position: "absolute",
        top: 2,
        left: (width / 2) - (scaleSize(60)),
    },

    nuberViewSty: {
        height: scaleSize(96),
        width: width,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 3,
        paddingRight: 3,
        backgroundColor: '#D3D5DB',
        padding: 5,
    },
    letterFisrtViewSty: {
        height: scaleSize(96),
        width: width,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 3,
        paddingRight: 3,
        backgroundColor: '#D3D5DB',
        padding: 5,
    },
    buttonStyle: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: scaleSize(66),
        height: scaleSize(84),
        borderRadius: scaleSize(6),
        padding: 5,
    },
    voiceSty: {
        backgroundColor: '#fff',
        width: scaleSize(90),
        height: scaleSize(84),
        borderRadius: scaleSize(6),
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    shareButtonSty: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: scaleSize(90),
        width: (width / 2) - 20,
        borderRadius: 3,
        padding: 5,
    },
    textStyle: {
        fontSize: scaleSize(48),
        textAlign: 'center',
        color: '#000'
    }

});

CustomKeyboard.defaultProps = {
    shareTextColor: '#DB3727',//分享文字颜色
    shareViewBackColor: '#ffffff',//分享背景颜色
    checkTexTColor: '#ffffff',//检测文字颜色
    checkViewBackColor: '#DB3727',//检测背景颜色
    photoBackColor: '#DB3727',//拍照背景颜色
    photoIconColor: '#ffffff',//拍照Icon颜色
    photoName: 'photograph',//拍照Icon名字
    vocieName: 'voice1',//语音Icon名字
    vocieColor: '#DB3727',//语音Icon颜色
    deleteName: 'keyboard_d',//删除Icon名字
    deleteColor: '#b7b7b7',//删除Icon颜色
};

CustomKeyboard.propTypes = {
    shareTextColor: PropTypes.string,//分享文字颜色
    shareViewBackColor: PropTypes.string,//分享背景颜色
    checkTexTColor: PropTypes.string,//检测文字颜色
    checkViewBackColor: PropTypes.string,//检测背景颜色
    photoBackColor: PropTypes.string,//拍照背景颜色
    photoIconColor: PropTypes.string,//拍照Icon颜色
    photoName: PropTypes.string,//拍照Icon名字
    vocieName: PropTypes.string,//语音Icon名字
    vocieColor: PropTypes.string,//语音Icon颜色
    deleteName: PropTypes.string,//删除Icon名字
    deleteColor: PropTypes.string,//删除Icon颜色
};