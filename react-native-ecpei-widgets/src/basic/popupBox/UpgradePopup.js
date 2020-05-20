/**
 * Created by tanlinwei
 *
 * Description:
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, View, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import HIcon from '../../library/HIcon'
import theme from '../../library/base-theme'
import RoundButton from "../Buttons/RoundButton";
import { scaleSize } from '../../library/appScreen';
import { Permission } from 'react-native-ecpei-common';
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";

export default class UpgradePopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            version: 'V_1.0.0',
            detail: '1. 修复bug;\n2. 修复bug。',
            isforce: false
        }
    }

    show(version, detail, isforce) {
        this.setState({
            modalVisible: true,
            version: 'V_' + version,
            detail: detail,
            isforce: isforce,
        });
    }

    close() {
        !this.state.isforce && this.setState({
            modalVisible: false,
        });
    }
    status() {
        return this.state.modalVisible
    }

    upgradeClick() {
        let that = this;
        //获取权限
        Permission.requestPermission('storage').then(() => {
            that.props.onPress();
            that.close();
        }, (error) => {

        });
    }

    render() {
        const { name, size, textStyle, title, buttonTitleStyle, buttonStyle, buttonTitle, headerImg } = this.props;
        return (
            <Modal visible={this.state.modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {

                    this.setState({
                        modalVisible: this.state.isforce
                    });
                }}
            >
                <View style={styles.modalBackViewStyle}>
                    <TouchableOpacityThrottle activeOpacity={1}>
                        <View style={styles.popupViewStyle}>
                            <ImageBackground style={styles.headerImgBackView} source={headerImg} resizeMode='stretch'>
                                <Text style={[styles.textStyle, textStyle]} numberOfLines={0}>{title}</Text>
                                <Text style={[styles.textStyle, { marginTop: scaleSize(10) }]} numberOfLines={0}>{this.state.version}</Text>
                            </ImageBackground>
                            <View style={styles.contentViewStyle}>
                                <View style={{ width: scaleSize(540) }}>
                                    <Text style={styles.titleSty} numberOfLines={0}>更新内容：</Text>
                                    <Text style={[styles.detailStyle, { marginTop: scaleSize(10) }]} numberOfLines={0}>{this.state.detail}</Text>
                                </View>
                                <RoundButton onPress={() => { this.upgradeClick() }} textStyle={buttonTitleStyle} activeOpacity={0}
                                    buttonStyle={[styles.buttonStyle, buttonStyle]} title={buttonTitle} />
                            </View>
                            {
                                this.state.isforce ? null :
                                    <View style={styles.closeViewStyle}>
                                        <TouchableOpacityThrottle onPress={() => { this.close() }}>
                                            <HIcon name={name} size={size} style={styles.iconStyle} color='#fff' />
                                        </TouchableOpacityThrottle>
                                    </View>
                            }

                        </View>

                    </TouchableOpacityThrottle>

                </View>
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
        overflow: "visible",
    },

    popupViewStyle: {
        backgroundColor: '#fff',
        width: scaleSize(540),
        // height: scaleSize(637),
        borderRadius: 10,
        alignItems: 'center',
        overflow: "visible",
        // margin: scaleSize(15)

    },
    headerImgBackView: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        // marginTop:-3,
        width: scaleSize(540),
        height: scaleSize(290),
    },
    closeViewStyle: {
        flexDirection: 'row',
        // justifyContent:'flex-end',
        // width:300,
        position: "absolute",
        marginTop: -scaleSize(5),
        marginRight: -scaleSize(5),
        right: 0,
        top: 0,
        overflow: "visible",
    },
    iconStyle: {
        padding: 15,
        // marginRight:-10,
        // marginTop:-20,
    },
    contentViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scaleSize(540),

    },
    textStyle: {
        fontSize: scaleSize(32),
        color: '#fff',
        marginTop: 15,
        marginLeft: 35,
    },
    titleSty: {
        marginTop: scaleSize(10),
        fontWeight: 'bold',
        fontSize: scaleSize(32),
        marginLeft: 35,
    },
    detailStyle: {
        fontSize: scaleSize(32),
        color: '#949494',
        marginTop: scaleSize(30),
        marginLeft: scaleSize(70),
        right: scaleSize(30),
    },
    buttonStyle: {
        marginTop: scaleSize(60),
        width: 150,
        backgroundColor: '#DB3727',
        bottom: 10,

    }
});

UpgradePopup.defaultProps = {
    name: 'X',
    size: scaleSize(52),
    textStyle: {},
    title: '版本更新啦',
    buttonTitle: '立即更新',
    buttonTitleStyle: {
        color: '#fff',
    },
    headerImg: '',
};
UpgradePopup.propTypes = {
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    textStyle: Text.propTypes.style,
    title: PropTypes.string,
    onPress: PropTypes.func,
    buttonStyle: PropTypes.any,
    buttonTitle: PropTypes.string,
    buttonTitleStyle: PropTypes.any,
    headerImg: PropTypes.any,
};