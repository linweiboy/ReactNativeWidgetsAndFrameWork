import React, { Component, PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View, Text, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../utils/Screen";
const STYLES = StyleSheet.create({
    container: {
        width: SCALE_SIZE(268),
        flexDirection: 'row',
        minHeight: SCALE_SIZE(80),
    },
    paddingV: {
        paddingVertical: SCALE_SIZE(10),
    },
    paddL: {
        paddingLeft: SCALE_SIZE(32),
    },
    paddR: {
        paddingRight: SCALE_SIZE(32),
    },
    center: { justifyContent: 'center', alignItems: 'center', },
    numStyle: {
        width: SCALE_SIZE(98),
    },
    optionStyle: {
        width: SCALE_SIZE(55), height: SCALE_SIZE(60)
    },
    topBottomBorder: {
        borderTopColor: "#D1D1D6",
        borderTopWidth: 1,
        borderBottomColor: "#D1D1D6",
        borderBottomWidth: 1,
    },
    leftBorder: {
        borderLeftColor: "#D1D1D6",
        borderLeftWidth: 1
    },
    rightBorder: {
        borderRightColor: "#D1D1D6",
        borderRightWidth: 1
    },
    leftRadius: {
        borderTopLeftRadius: SCALE_SIZE(4),
        borderBottomLeftRadius: SCALE_SIZE(4),
        // borderTopRightRadius:0,
        // borderBottomRightRadius:0
    },
    rightRadius: {
        borderTopRightRadius: SCALE_SIZE(4),
        borderBottomRightRadius: SCALE_SIZE(4),
    }
})

export class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.initCount
        }
        if (this.props.initCount != this.props.minCount) { console.warn("起购数 应该等于 最新数") };
    }
    componentWillReceiveProps(nextP) {
        if (nextP.initCount != this.state.value) {
            this.setState({ value: nextP.initCount });
        }
    }
    reduce = () => {
        let reduceValueBefore = this.state.value
        let value = this.props.doubly ? this.state.value - this.props.minCount : this.state.value - 1
        value = value < this.props.minCount ? this.state.value : value;
        this.setState({ value }, () => {
            this.props.onReduce && this.props.onReduce(this.state.value, reduceValueBefore)
        });
    }
    increase = () => {
        let increaseValueBefore = this.state.value
        let value = this.props.doubly ? this.state.value + this.props.minCount : this.state.value + 1;
        value = value > this.props.maxCount ? this.state.value : value;
        this.setState({ value }, () => {
            this.props.onIncrease && this.props.onIncrease(this.state.value, increaseValueBefore)
        });
    }
    render() {
        let canReduce = this.state.value > this.props.minCount;
        let canAdd = this.state.value < this.props.maxCount;
        return (
            <View {...this.props} style={[STYLES.container, this.props.style]}>
                <TouchableOpacity isThrottle={false} style={
                    [
                        STYLES.paddingV,
                        { minWidth: SCALE_SIZE(88) },
                        STYLES.paddL
                    ]} onPress={this.reduce}>
                    <View style={[
                        // STYLES.topBottomBorder,
                        {flex:1},
                        STYLES.leftBorder,
                        STYLES.leftRadius,
                    ]}>
                        <View style={[{ width:"100%",height:"100%",backgroundColor:"white"},STYLES.center,STYLES.topBottomBorder,]}>
                            <Text style={{ color: canReduce ? "#8E8E93" : "#D1D1D6" }}>-</Text>
                        </View>
                    </View>
                </TouchableOpacity >
                <TouchableOpacity activeOpacity={1} style={[STYLES.paddingV, STYLES.numStyle]}>
                    <View style={[
                        STYLES.topBottomBorder,
                        { flex: 1 },
                        STYLES.center,
                        STYLES.rightBorder, STYLES.leftBorder,
                    ]}>
                        <Text>{this.state.value}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity isThrottle={false} style={[
                    STYLES.paddingV,
                    { minWidth: SCALE_SIZE(88) },
                    STYLES.paddR
                ]} onPress={this.increase}>
                    <View style={[
                        STYLES.topBottomBorder,
                        { flex: 1 },
                        STYLES.center,
                        STYLES.rightBorder,
                        STYLES.rightRadius
                    ]}>
                        <Text style={{ color: canAdd ? "#8E8E93" : "#D1D1D6" }}>+</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


Calculator.defaultProps = {
    initCount: 1,
    minCount: 1,
    maxCount: 9999,
    doubly: false
}

Calculator.propTypes = {
    /**
     * 初始数量 
     */
    initCount: PropTypes.number,
    /***
     * 是否成倍数增加
     */
    doubly: PropTypes.bool,
    /**
     * 最小的数量 起购数
     */
    minCount: PropTypes.number,
    /**
     * 最大的数量
     */
    maxCount: PropTypes.number,

    /**
     * 点击减少按钮触发
     * args: 当前数量
     */
    onReduce: PropTypes.func,
    /**
     * 点击增加按钮触发
     * args: 当前数量
     */
    onIncrease: PropTypes.func,
}
