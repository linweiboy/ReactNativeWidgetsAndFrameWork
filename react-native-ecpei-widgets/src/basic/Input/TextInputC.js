/*
 * @Creator: TanLinWei 
 * @Date: 2018-11-09 14:55:58 
 * @Last Modified by: TanLinWei
 * @Last Modified time: 2018-11-09 17:09:57
 * @Desc: 
 */


import React, { Component } from 'react';
import { Platform, TextInput, StyleSheet, View, NativeModules, LayoutAnimation, NativeEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
const {ToolsModule} =  NativeModules
const  kbHeightEvt = new NativeEventEmitter(ToolsModule)

export default class TextInputC extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value,
            type: this.props.type,
            num: this.props.number,
            isUpStateIos:true,//RN0.51～0.55版本系统拼音输入TextInput实时更新问题消除,为确保刚进来的时候需要更新状态，当输入的时候需要关闭这个属性
        }
    }


    componentWillReceiveProps(newProps) {
        const { value } = this.props;
        if (value === newProps.value) {
            return false
        }
        this.setState({ value: newProps.value });
        return true;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (Platform.OS === 'ios') {
            if (this.state.value !== nextState.value) {                 
                return this.state.isUpStateIos;
            }
        }
        return true;
    };

    componentDidMount(){
        this.keyBoardL = kbHeightEvt.addListener("KeyBoardheightChanged",(keyHeight)=>{
            if(keyHeight>0){
                this.setState({isUpStateIos:false});
            }else{
                this.setState({isUpStateIos:true});
            }
        });
    }

    componentWillUnmount(){
        this.keyBoardL && this.keyBoardL.remove()
    }

    testEnglishOrNumber(text) {
        //只能输入由数字和26个英文字母组成的字符串
        const reg = new RegExp('^[A-Za-z0-9]+$')
        if (reg.test(text)) {
            return true;
        }
        return false
    }

    validate(phoneNumber) {
        //只能输入数字
        var reg = new RegExp("^[0-9]*$");
        if (!reg.test(phoneNumber)) {
            return false;
        }
        // //匹配数字字符
        // if(!/^[0-9]+$/.test(phoneNumber)){
        //     return false;
        // }
        return true;
    }

    testChinese(text) {
        //检测匹配中文
        const reg = new RegExp('^[\u4e00-\u9fa5]*$');
        if (reg.test(text)) {
            return true
        }
        return false
    }

    onChangeText(inputText) {
        if (inputText.length === 0) {
            this.setState({ value: '', })
            this.props.onChangeText && this.props.onChangeText('')
        } else {
            var val;
            switch (this.state.type) {
                case 'number': {
                    val = this.validate(inputText);
                }
                    break;
                case 'numberOrEnglish': {
                    val = this.testEnglishOrNumber(inputText);
                }
                    break;
                case 'chinese': {
                    val = this.testChinese(inputText);
                }
                    break;
                case 'none': {
                    val = true
                }
                    break;
            }
            if (val) {
                this.setState({ value: inputText });
                this.props.onChangeText && this.props.onChangeText(inputText)
            }
        }

    }

    render() {
        return (<TextInput ref='inputT'
            {...this.props}
            selectionColor={"#DB3727"}
            underlineColorAndroid='transparent'
            value={this.state.value}
            maxLength={this.props.maxLength}
            onChangeText={(inputText) => {
                this.onChangeText(inputText);
            }}

        ></TextInput>)
    }
}
TextInputC.defaultProps = {
    type: 'none',
    maxLength: 35,
}

TextInputC.propTypes = {
    type: PropTypes.oneOf([
        'number', //纯数字
        'numberOrEnglish',//数字或英文
        'chinese', //中文
        'none'
    ]),
    maxLength: PropTypes.number,
}

