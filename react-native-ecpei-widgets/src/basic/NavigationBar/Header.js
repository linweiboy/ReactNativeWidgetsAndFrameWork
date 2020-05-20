/**
 * Created by tanlinwei
 *
 * Description:基于Native Base二次开发的导航栏
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet,Platform } from "react-native";
import { Header as HeaderView, Left, Body, Right, Title, Button, Text } from 'native-base';
import HIcon from '../../library/HIcon';
import Theme from '../../library/base-theme';
import { scaleSize } from './../../library/appScreen';
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.Top = Platform.OS === "ios" ? scaleSize(10):scaleSize(53)
    }

    statistics(tag){
        if( !tag ){
            return null
        }
        return(
            <Body style={{ position: 'absolute', top: scaleSize(this.Top + scaleSize(30)), left: scaleSize(50),  backgroundColor: 'red', borderRadius: scaleSize(14), paddingHorizontal:scaleSize(5), minWiddth:scaleSize(28),justifyContent:'center',alignItems:'center' }}>
                <Text style={{ color: 'white', fontSize: scaleSize(16),height:scaleSize(28), lineHeight: scaleSize(28) }}> { tag } </Text>
            </Body>
        )
    }

    render() {
        const { leftIcon, letfTitle, letfText, leftIconProps, leftTextStyle,
            title,
            rightContents
        } = this.props;
        return (
            <HeaderView androidStatusBarColor={"transparent"} iosBarStyle={"dark-content"} style={styles.navBarStyle} {...this.props}>
                <Left style={{flexDirection:"row"}}>
                    {
                        leftIcon ?
                            <TouchableOpacityThrottle onPress={() => { this.props.leftOnPress(0) }} style={{paddingLeft:5,paddingRight:20}}>
                                <HIcon name={leftIconProps.name} color={leftIconProps.color} size={leftIconProps.size} style={{ marginTop: this.Top }} />
                            </TouchableOpacityThrottle>
                            : null
                    }
                    {
                        letfTitle ?
                            <TouchableOpacityThrottle  onPress={() => { this.props.leftOnPress(1) }} style={{paddingLeft:5,paddingRight:20}}>
                                <Text style={[styles.leftTextStyle, leftTextStyle]}>{letfText}</Text>
                            </TouchableOpacityThrottle> : null
                    }

                </Left> 
                <Body>
                    <Title style={[styles.HeaderSty, this.props.titleStyle]}>{title}</Title>
                </Body>
                <Right>
                    {

                        rightContents && rightContents.map((elements, index) => {
                            return (
                                <TouchableOpacityThrottle onPress={elements.onPress} key={index} style={{padding:5,marginLeft:10}}>
                                    {
                                        elements.rightIcon ? <HIcon name={elements.iconData.name} color={elements.iconData.color} size={elements.iconData.size} style={{ marginTop: this.Top }} /> : null
                                    }
                                    {
                                        elements.rightTitle ? <Text style={[{ marginTop: this.Top }, elements.titleData.style]}>{elements.titleData.title}</Text> : null
                                    }
                                    {
                                        this.statistics(elements.rightBadge)
                                    }
                                </TouchableOpacityThrottle>
                            )
                        })
                    }
                </Right>
            </HeaderView>
        );
    }
}

const styles = StyleSheet.create({
    HeaderSty: {
        marginTop: 20, color: "#000"
    },
    leftTextStyle: {
        color: '#000',
        fontSize: 14,
        marginTop: this.Top,
    },
    navBarStyle: {
        height: Theme.navHeight,
    },
});

Header.defaultProps = {
    leftOnPress: () => { },
    title: "Header",
    letfText: "Left",
    leftIconProps: {
        color: "#000",
        name: "back1",
        size: 16,
    },
    // rightContents: [{
    //     rightIcon: true,
    //     onPress: () => { },
    //     iconData: {
    //         color: "#000",
    //         name: "return",
    //         size: 16,

    //     },
    //     rightTitle: false,
    //     titleData: {
    //         title: "右侧",
    //         style: { //按钮文本样式
    //             color: '#000',
    //             fontSize: 14,

    //         }
    //     },
    // }
    // ],
};

Header.propTypes = {
    leftIcon: PropTypes.bool,
    letfTitle: PropTypes.bool,
    leftTextStyle: PropTypes.any,
    leftOnPress: PropTypes.func,
    title: PropTypes.string,
    letfText: PropTypes.string,
    leftIconProps: PropTypes.object,
    rightContents: PropTypes.array,
    titleStyle: PropTypes.any,
}