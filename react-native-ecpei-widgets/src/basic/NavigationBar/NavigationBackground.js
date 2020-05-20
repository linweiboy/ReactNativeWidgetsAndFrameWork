
/**
 * Created by tanlinwei
 *
 * Description: 渐变导航栏，只有背景，无子视图，（首页上拉导航栏渐变）
 */

import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';

import {screenW, screenH,scaleSize,setSpText} from '../../library/appScreen';
import LinearGradient from 'react-native-linear-gradient';
import baseTheme from '../../library/base-theme';

export default class NavigatorBackground extends Component{
    constructor(props){
        super(props)
        this.state = {
            opacity:this.props.opacity || 0,
            zIndex:this.props.zIndex || 990,
            colors:this.props.colors || ['#3B32CC', '#2764D5']
        }
    }

    Opacity(opacity){
        this.setState({opacity});
    }
    render(){
        return (
            <LinearGradient style = {[styles.container,{opacity:this.state.opacity}]} colors={this.state.colors} start = {{x:0,y:0}} end = {{x:1,y:0}}>
                {
                    this.props.children
                }
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        height:baseTheme.navHeight,
        position:"absolute",
        width:screenW,
        zIndex:990,
    },
});