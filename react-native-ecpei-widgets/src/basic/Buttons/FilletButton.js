/**
 * Created by tanlinwei
 *
 * Description:基于native-base，开发的切圆角的按钮
 */
import React, {Component} from 'react';
import {Text} from 'react-native';
import {Button} from 'native-base';
import PropTypes from 'prop-types';

export default class FilletButton extends Component{
    render(){
        const {title,buttonStyle,textStyle,onPress} = this.props;
        return(
            <Button primary style={[{justifyContent:'center'},buttonStyle]} onPress={onPress}>
                <Text style={textStyle}>{title}</Text>
            </Button>
        );
    }
}

FilletButton.defaultProps = {
    title:'确定',
    buttonStyle:{
        width:100,
        height:40,
        backgroundColor:'#187fff',

    },
    textStyle:{
        fontSize:15,
        color:'#fff',
    }
};

//圆形切角按钮
FilletButton.propTypes = {
    title:PropTypes.string, //按钮文字
    buttonStyle:PropTypes.any, //按钮样式
    textStyle:PropTypes.any, //文字样式
    onPress:PropTypes.func,
};