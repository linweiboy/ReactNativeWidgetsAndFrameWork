/**
 * Created by tanlinwei
 *
 * Description:
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import theme from '../../library/base-theme'
import { scaleSize } from '../../library/appScreen';
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";
export default class InputPopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            inputText: '',
            placeholder: '',
        }
    }

    show(placeholder, callback) {
        this.callback = callback;
        this.setState({
            modalVisible: true,
            placeholder: placeholder,
        });
    }

    close() {
        this.setState({
            modalVisible: false,
            inputText: '',
        });
    }

    onChangeOnPress = (text) => {
        this.setState({ inputText: text });
    };

    onEndEditing = () => {

    };

    ensureClick() {
        if (typeof this.callback === 'function') {
            this.callback(this.state.inputText);
        }
        //点击确定后需手动在外部调用关闭窗口
        // this.close();
    }

    render() {
        const { inputStyle, popupViewStyle, textStyle, title, cancelSty, cancelTitle, cancelTitleStyle,
            sureTitleStyle, sureSty, sureTitle,septalLineStyle,textViewStyle,inputMaxLength } = this.props;
        return (
            <Modal visible={this.state.modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => { }}
            >
                <TouchableOpacityThrottle onPress={() => { this.close() }} activeOpacity={1}>
                    <View style={styles.modalBackViewStyle}>
                        <TouchableOpacityThrottle activeOpacity={1}>
                            <View style={[styles.popupViewStyle, popupViewStyle]}>
                                <View style={[styles.textViewStyle,textViewStyle]}>
                                    <Text style={[styles.tetStyle, textStyle]}>{title}</Text>
                                </View>
                                <View style={[ styles.septalLineStyle,septalLineStyle ]} />
                                <TextInput style={[styles.inputStyle, inputStyle]}
                                    placeholder={this.state.placeholder}
                                    underlineColorAndroid='transparent'
                                    onChangeText={this.onChangeOnPress}
                                    onEndEditing={this.onEndEditing}
                                    value={this.state.inputText}
                                    maxLength={inputMaxLength}
                                />
                                <View style={styles.bottomViewStyel}>
                                    <TouchableOpacityThrottle onPress={() => { this.close() }}>
                                        <View style={[styles.cancelSty, cancelSty]}>
                                            <Text style={[styles.cancelTitleStyle, cancelTitleStyle]}>{cancelTitle}</Text>
                                        </View>
                                    </TouchableOpacityThrottle>
                                    <TouchableOpacityThrottle onPress={() => { this.ensureClick() }}>
                                        <View style={[styles.sureSty, sureSty]}>
                                            <Text style={[styles.sureTitleStyle, sureTitleStyle]}>{sureTitle}</Text>
                                        </View>
                                    </TouchableOpacityThrottle>
                                </View>
                            </View>
                        </TouchableOpacityThrottle>
                    </View>
                </TouchableOpacityThrottle>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    modalBackViewStyle: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: theme.deviceWidth,
        height: theme.deviceHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupViewStyle: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        width: scaleSize(540),
        // height: scaleSize(400),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    bottomViewStyel: {
        flexDirection: 'row',
        width: scaleSize(540),
        height: scaleSize(100),
        justifyContent: 'space-between',
    },
    tetStyle: {
        fontSize: 15,
        color: '#000',
    },
    textViewStyle:{
        justifyContent:'center',
        alignItems:'center',
        height:scaleSize(108),
    },
    septalLineStyle:{
        height: scaleSize(0.5), 
        backgroundColor: '#F5F5FA', 
        width: scaleSize(540)
    },
    inputStyle: {
        width: scaleSize(490),
        height: scaleSize(80),
        marginTop:scaleSize(60),
        paddingHorizontal:scaleSize(34),
        borderWidth: 0.5,
        borderColor: '#abc',
        fontSize: 15,
        marginBottom: scaleSize(60),
    },
    cancelSty: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
        width: scaleSize(540) / 2,
        height: scaleSize(100),

    },
    sureSty: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#274DE7',
        width: scaleSize(540) / 2,
        height: scaleSize(100),
    },
    cancelTitleStyle: {
        color: '#000',
        fontSize: 15,
    },
    sureTitleStyle: {
        color: '#fff',
        fontSize: 15,
    }

});

InputPopup.defaultProps = {
    title: '新增部门',
    cancelTitle: '取消',
    sureTitle: '保存',
};
InputPopup.propTypes = {
    popupViewStyle: PropTypes.any,
    septalLineStyle: PropTypes.any,
    textViewStyle: PropTypes.any,
    cancelSty: PropTypes.any,
    sureSty: PropTypes.any,
    textStyle: PropTypes.any,
    title: PropTypes.string,
    cancelTitle: PropTypes.string,
    sureTitle: PropTypes.string,
    cancelTitleStyle: Text.propTypes.style,
    inputStyle: PropTypes.any,
    sureTitleStyle: Text.propTypes.style,
    inputMaxLength: PropTypes.number,
};