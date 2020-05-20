/**
 * Created by tanlinwei
 *
 * Description:
 */
import React,{Component} from 'react';
import {StyleSheet, View,TouchableOpacity,TextInput} from 'react-native';
import PropTypes from 'prop-types';
import HIcon from '../../library/HIcon'
import {InputRoundIcon} from '../Input'
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";

export default class NavigationSearchBar extends Component{

    renderLeft = () => {
        const {leftIcon,leftIconSize, leftIconColor,onLeftPress} = this.props;
        return (
            <TouchableOpacityThrottle style={styles.leftContainerStyle}
                              onPress={onLeftPress}>
                <HIcon name={leftIcon} color={leftIconColor} size={leftIconSize}/>
            </TouchableOpacityThrottle>
        );
    };

    onChangeOnPress (text) {
        this.props.onChangeText(text);
    };

    renderTitle = () => {
        const {searchStyle,placeholder,inputStyle} = this.props;
        return (
            <InputRoundIcon placeholder={placeholder} onChangeText={this.onChangeOnPress} name='tubiao-26'
                            size={25}
                            searchStyle={[styles.searchStyle,searchStyle]}
                            inputStyle={inputStyle}

            />
        );
    };

    renderRight = () => {
        const {rightIcon,
            rigthIconColor,rigthIconSize,
            onRightPress} = this.props;

        return (
            <TouchableOpacityThrottle hitSlop={{top: 20, bottom: 20, left: 20, right: 10}}
                              style={styles.rightContainerStyle}
                              onPress={onRightPress}>
                <HIcon style={styles.rightIconStyle}
                      name={rightIcon} color={rigthIconColor} size={rigthIconSize}
                />
            </TouchableOpacityThrottle>
        );
    };

    render(){
        const {backgroundColor,borderBottomWidth} = this.props;
        return(
            <View style={[styles.navBarStyle,{backgroundColor:backgroundColor,borderBottomWidth:borderBottomWidth}]}>
                <View style={styles.navContentStyle}>
                    {this.renderLeft()}
                    {this.renderTitle()}
                    {this.renderRight()}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    navBarStyle: {
        height: 64,
        borderBottomWidth: 0.3,
        borderBottomColor: '#a7a6ab',
    },
    navContentStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 2,
        marginRight: 2,
        marginTop: 20,
    },
    backViewStyle:{
        flexDirection:'row',
        alignItems: 'center',
        // justifyContent:'center',
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    leftContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
    },
    rightContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 45
    },
    rightIconStyle: {
        width: 25,
        height: 25,
    },
    searchStyle:{
        height:40,
        width:300,
        backgroundColor:'#F5FCFF',
    },
});

NavigationSearchBar.defaultProps = {
    leftIcon:'back1',
    leftIconColor:'#abc',
    leftIconSize:20,
    rightIcon:'search_classificati',
    rigthIconColor:'#1953D0',
    rigthIconSize:25,
    placeholder:'请输入搜索商品',
    onChangeText:()=>{},

};

NavigationSearchBar.propTypes = {
    backgroundColor:PropTypes.string, //背景色
    leftIcon:PropTypes.string,
    leftIconColor:PropTypes.string,
    leftIconSize:PropTypes.number,
    rightIcon:PropTypes.string,
    rigthIconColor:PropTypes.string,
    rigthIconSize:PropTypes.number,
    placeholder:PropTypes.string,
    searchStyle:PropTypes.any,
    inputStyle:PropTypes.any,
    onLeftPress:PropTypes.func,
    onRightPress:PropTypes.func,
    onChangeText:PropTypes.func,
    borderBottomWidth:PropTypes.number,//导航栏底部线条宽度，去掉线条值为0
};