/**
 * Created by tanlinwei
 *
 * Description:  网络加载时加载菊花图组件
 */

import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
    StyleSheet,
    View,
    Modal,
    Text,
    Dimensions,
    TouchableHighlight, StatusBar, BackHandler, Platform
} from 'react-native';
import { Spinner } from "native-base";
import DisplayAnimated, { AnimatedType } from "../../common/DisplayAnimated";
import RootSiblings from "../../common/RootSiblings";
import { UIPlugin, UIPluginManager } from "react-native-ecpei-framework";

let sibling = new RootSiblings();

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({
            disabled: false
        }, this.props);
        console.log("Loading:constructor", this.props);
    }

    componentWillReceiveProps(props) {
        this.setState({});
    }

    static defaultProps = {
        tip: null,
    }
    static propTypes = {
        tip: PropTypes.string, //提示信息 
    }

    /**
     * 显示
     * @param {基础设置} options 
     */
    static show(options) {
        let _options = { disabled: true, tip: null, animatedType: AnimatedType.Fade };
        if (typeof options === "string") {
            options = { tip: options };
        }
        _options = Object.assign(_options, options);
        let _sibling = sibling.show(<Loading {..._options} />);
        // _sibling.destroy=
        return _sibling;
    }

    /**
     * 关闭释放
     * @param {*} ele 
     */
    static close(ele) {
        sibling.close(ele);
    }


    _onShowed(ele) {
        this.displayEle = ele;
    }
    static clearAllLoading() {
        sibling.clear && sibling.clear()
    }

    render() {
        const { disabled, tip } = this.props;
        return (
            <DisplayAnimated onRequestClose={true} animatedType={this.props.animatedType || AnimatedType.NotAnimate} onShowed={this._onShowed} style={{ position: 'absolute', width: "100%", height: "100%", flex: 1 }} isShow={disabled}>
                <View style={styles.alertModal}>
                    <View style={[styles.alert]}>
                        <Spinner color="#FFF" />
                        {tip ? <Text style={styles.text} >{tip}</Text> : null}
                    </View>
                </View>
            </DisplayAnimated >
        );
    }
}
let _width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    alertModal: { flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "column", backgroundColor: "rgba(0,0,0,0)" },
    alert: { width: 0.25 * _width, height: 0.25 * _width, backgroundColor: "rgba(0,0,0,0.5)", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: 5, overflow: "hidden" },
    title: { flexDirection: "row", alignItems: "center", justifyContent: "center", height: 40, borderBottomColor: "#eee", borderBottomWidth: .5 },
    titleCon: { flex: 1, textAlign: "center", fontSize: 20 },
    text: { marginTop: -15, fontSize: 14, color: "#FFF" },
});


export default Loading;



class LoadingPlugin extends UIPlugin {
    name = "LoadingPlugin";
    _props = { disabled: false, tip: "" }
    constructor() {
        super()
    }
    get props() {
        return {
            ...this._props,
            style: { position: "absolute", zIndex: 999999 },
            animatedType: AnimatedType.NotAnimate
        };
    }
    get component() {
        if (this.props.disabled)
            return Loading
        return View
    }
    emit(data) {
        this._props = JSON.parse(data);
    }
}

UIPluginManager.addPlugin(new LoadingPlugin())