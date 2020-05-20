/**
 * Created by tanlinwei
 *
 * Description:
 */
import React from 'react';
import {Text,TouchableOpacity,StyleSheet,Image} from 'react-native';
import PropTypes from 'prop-types';
// import {images} from "../../sources";
const check = require('../../library/images/hook_blue.png');
const uncheck = require('../../library/images/hook_gray.png');
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";
export default class CheckBoxV extends React.Component {


    render(){
        const {uncheckedIcon,checked,checkedIcon,onPress,title} = this.props;
        let icon = uncheckedIcon;
        if (checked) {
            icon = checkedIcon;
        }
        return(
            <TouchableOpacityThrottle style={styles.container} onPress={onPress} {...this.props}>
                <Image source={icon} style={{width:20, height:20,paddingHorizontal: 4, paddingVertical: 4,}}/>
                {title && <Text style={styles.text}>{title}</Text>}
            </TouchableOpacityThrottle>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 2,
        paddingVertical: 2
    },
    text: {
        marginLeft: 10,
        marginRight: 10,
    },
    iconContainerStyle: {
        paddingHorizontal: 4,
        paddingVertical: 4,
    }
});

CheckBoxV.defaultProps = {
    checked: false,
    uncheckedIcon: uncheck,
    checkedIcon: check
};

CheckBoxV.propTypes = {
    checked: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    checkedIcon: PropTypes.any.isRequired,
    uncheckedIcon: PropTypes.any.isRequired,
    onPress: PropTypes.func,
};