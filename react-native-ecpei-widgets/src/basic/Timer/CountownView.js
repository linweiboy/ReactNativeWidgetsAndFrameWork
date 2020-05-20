/**
 * Created by tanlinwei
 *
 * Description:
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet, AppRegistry
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";
import { scaleSize } from '../../library/appScreen';
import BackgroundTimer from 'react-native-background-timer';


export default class CountownView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStart: false,
            timeCount: this.props.timeCount,
            activeOpacity: 0,
            title: "",
            timer: null,
            firstCount: true,//是否是第一次计时
        }
    }
    componentWillUnmount() {
        if (this.state.timer != null) {
            BackgroundTimer.clearInterval(this.state.timer)
        }
    }
    num = 0
    countdownfn() {

        if (this.state.timeCount > 0) {
            let that = this;
            this.setState({ firstCount: false });
            this.state.timer = BackgroundTimer.setInterval(() => {
                if (that.state.timeCount < 1) {
                    BackgroundTimer.clearInterval(this.state.timer);
                    that.setState({
                        isStart: false,
                        timeCount: that.props.timeCount,
                        activeOpacity: 0,
                        title: "重新发送",
                    });
                    that.props.callback();
                } else {
                    let totalTime = that.state.timeCount;
                    that.setState({
                        timeCount: totalTime - 1,
                        activeOpacity: 1,
                    })
                }
            }, 1000)
        }
    }

    /**
     * 外部调用开始倒计时,
     * isCountDown:从外部传进来的，是否满足条件开始计时
     */
    onCountDown(isCountDown) {
        if (!this.state.isStart && isCountDown) {
            this.setState({
                isStart: true,
                activeOpacity: 1,
            });
            this.countdownfn();
        }
    }

    startClick() {
        if (!this.state.isStart) {
            this.props.startOnPress()
        }
    }

    render() {
        const { normalBackColor, countingBackColor, normalTitle,
            countingTitle, titleStyle, countingTitleColor, titleColor, style } = this.props;
        var title = ""
        if (this.state.firstCount) {
            title = this.state.isStart ? (this.state.timeCount + countingTitle) : normalTitle;
        } else {
            title = this.state.isStart ? (this.state.timeCount + countingTitle) : this.state.title;
        }
        let backcolor = this.state.isStart ? countingBackColor : normalBackColor;
        let titColor = this.state.isStart ? countingTitleColor : titleColor;
        return (
            <TouchableOpacityThrottle activeOpacity={this.state.activeOpacity}
                onPress={() => { this.startClick() }}>
                <View style={[styles.countViewStyle, style, { backgroundColor: backcolor }]}>
                    <Text style={[[styles.textSty, titleStyle, { color: titColor }]]}>{title}</Text>
                </View>
            </TouchableOpacityThrottle>
        )
    }
}

const styles = StyleSheet.create({
    countViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 13,
        height: 26,
    },
    textSty: {
        fontSize: 12,
        padding: 5,
    }
});

CountownView.defaultProps = {
    timeCount: 60,
    callback: () => { },
    startOnPress: () => { },
    normalBackColor: '#DB3727',
    // countingBackColor:'#c7cfcb', #1854cf
    countingBackColor: '#B7B7B7',
    normalTitle: '获取验证码',
    countingTitle: '秒重新发送',
    titleColor: '#fff',
    countingTitleColor: '#fff',
    isVerifyCode: true,
};

CountownView.propTypes = {
    timeCount: PropTypes.number,
    callback: PropTypes.func, //回调函数
    style: PropTypes.any, //背景视图样式
    normalBackColor: PropTypes.string,
    countingBackColor: PropTypes.string,
    startOnPress: PropTypes.func, //开始计时
    normalTitle: PropTypes.string,
    countingTitle: PropTypes.string,
    titleStyle: PropTypes.any,//字体样式
    titleColor: PropTypes.string,
    countingTitleColor: PropTypes.string,
    isVerifyCode: PropTypes.bool,
};