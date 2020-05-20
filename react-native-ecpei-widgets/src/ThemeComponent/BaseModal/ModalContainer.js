import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet, StatusBar, Modal, View
} from 'react-native';
import PropTypes from 'prop-types';
// import Container from "../../basic/Views/Container";
import SafeAreaView from "react-native-safe-area-view";
/**
 * 提供一个全屏Modal
 * 
 * showModal 是否显示
 * backgroundColor 背景颜色
 */

export class ModalContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            androidBackHidden: true
        }
    }
    componentWillReceiveProps(nextP) {
        if (nextP.showModal != this.state.showModal) {
            this.setState({ showModal: nextP.showModal })
        }
    }
    render() {
        if (this.state.showModal)
            return (
                <View >
                    <StatusBar backgroundColor={this.props.backgroundColor}></StatusBar>
                    <Modal

                        animationType={"none"}
                        transparent={true}
                        onRequestClose={() => {
                            if (this.state.androidBackHidden)
                                this.setState({ showModal: false });
                        }}
                        {
                        ...this.props
                        }
                        visible={this.state.showModal}
                    >
                        {/* <View style={{ backgroundColor: this.props.backgroundColor, flex: 1, }}>
                            {
                                this.props.children
                            }
                        </View> */}
                        <SafeAreaView style={[{ flex: 1, backgroundColor: this.props.backgroundColor }]} forceInset={{ top: 'never', bottom: "always" }}>
                            {this.props.children}
                        </SafeAreaView>
                    </Modal>
                </View>
            )
        return null;
    }
}