/**
 * Created by tanlinwei
 *
 * Description:手机号输入框，只能输入数字
 */
import React,{Component} from 'react';
import {StyleSheet,TextInput,View,ImageBackground} from 'react-native';
import BaseInput from './BaseInput';
import PropTypes from 'prop-types';
import HIcon from '../../library/HIcon'
import { scaleSize ,validate} from '../../library/appScreen';

export default class InputRoundIcon extends Component{

    constructor(props) {
        super(props);
        this.state = {
            opacity: 0,
            inputText:this.props.value,
        };
    }

    onChangeOnPress = (text) => {
        const val = validate(text);
        if (val) {
            this.setState({ inputText: text });
            this.props.onChangeText(text)
        } 
        if (text.length !== 0) {
            this.setState({ opacity: 1 })
        } else { 
            this.setState({ opacity: 0,inputText:'', });
            this.props.onChangeText(text); 
        }
    };

    onEndEditing = (event) =>{
        const text = event.nativeEvent.text; 
        this.setState({inputText:text});
        if(text.length != 0){
            this.setState({opacity:1})
        }else {this.setState({opacity:0})}
        this.props.onEndEditingText(text);
    };


    render(){
        const {size,name,placeholder,style,inputStyle,keyboardType,returnKeyType,maxLength} = this.props;
        return(
            <BaseInput style={[styles.searchStyle,style]} width={this.props.width}>
                <HIcon name={name} style={styles.iconContainerStyle} size={scaleSize(size)} /> 
                <TextInput ref='input' placeholder={placeholder}
                    style={[styles.inputStyle, inputStyle]}
                    onChangeText={this.onChangeOnPress}
                    onEndEditing={this.onEndEditing}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    value={this.state.inputText}
                    keyboardType={keyboardType}
                    returnKeyType={returnKeyType}
                    maxLength={maxLength}
                    selectionColor = "#DB3727"       
                    underlineColorAndroid='transparent'
                />
                <HIcon name='delete-x' style={[styles.closeStyle,{opacity:this.state.opacity}]} onPress={this.noPressClear} />
            </BaseInput>
        )
    }


    noPressClear=()=>{
        this.setState({
            inputText: '',
            opacity: 0,
        });
        this.props.onClearAway();
    }

    onBlur=()=>{
       this.props.onBlur();
    }
    onFocus=()=>{
        this.props.onFocus();
    }
}


const styles = StyleSheet.create({
    iconContainerStyle: {
        paddingHorizontal: 4,
        paddingVertical: 4,
        marginLeft:scaleSize(30),
    },
    closeStyle:{
        flex:0.1,
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    inputStyle:{
        flex:0.9,
        height:scaleSize(80),
        fontSize:scaleSize(28),
    },
    searchStyle:{
        width:scaleSize(600),
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: "center",
        height:scaleSize(120),
        // backgroundColor:'#F5FCFF',

        // elevation:4, //此属性只对Android阴影设置有效，对iOS不影响
        // shadowOffset: {width: 3, height: 2}, //阴影偏移量
        // shadowOpacity: 0.8, //阴影透明度
        // shadowRadius: 3, //阴影圆角半径
        // shadowColor: '#E5E5E5', //阴影颜色
        // zIndex:9,
    },
});


InputRoundIcon.defaultProps = {
    placeholder:'请输入手机号码',
    size:scaleSize(64),
    maxLength:200,
    name:'login_phone',
    keyboardType:'default',
    returnKeyType:'default',
    value:'',
    onChangeText: () => {},
    onEndEditingText: () => {},
    onClearAway:() => {},
    onBlur:() => {},
    onFocus:() => {},
};

InputRoundIcon.propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
    maxLength:PropTypes.number,
    onChangeText:PropTypes.func,
    onEndEditingText:PropTypes.func,
    onClearAway:PropTypes.func,
    onBlur:PropTypes.func,
    onFocus:PropTypes.func,
    style: PropTypes.any,
    inputStyle:PropTypes.any,
    keyboardType:PropTypes.string,//键盘类型默认defaul
    returnKeyType:PropTypes.string,
    value:PropTypes.string,
};