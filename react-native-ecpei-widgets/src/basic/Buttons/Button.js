/**
 * Created by tanlinwei
 *
 * Description:
 */
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";
import { Button as ButtonView, Text } from 'native-base';
import HIcon from '../../library/HIcon';

export default function Button(props) {
    return (
        <ButtonView style={[styles.backViewStyle, props.style]} {...props}>
            {
                props.iconLeft ? <HIcon name={props.name} size={props.size} color={props.color} /> : null
            }
            <Text style={[styles.textStyle, props.textStyle]} allowFontScaling={false}>{props.title}</Text>
            {
                props.iconRight ? <HIcon name={props.name} size={props.size} color={props.color} /> : null
            }
        </ButtonView>
    );
}

const styles = StyleSheet.create({
    backViewStyle: {
        backgroundColor: '#ffffff',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 13,
        textAlign: 'center',
        color: '#000'
    }

});


Button.defaultProps = {
    onPress: () => { },
    disabled: false,
    activeOpacity: 1,
    size: 16,
    color: '#000',
    name: "return"
};

//按钮
Button.propTypes = {
    title: PropTypes.string,
    textStyle: Text.propTypes.style,
    size: PropTypes.number,
    color: PropTypes.string,
    name: PropTypes.string,
};