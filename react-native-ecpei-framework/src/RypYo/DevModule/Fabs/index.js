import React, { Component } from 'react';

import {  View, Text, TouchableOpacity, Dimensions, PanResponder, Animated } from 'react-native';
import { NativeModules } from 'react-native';
import {  getBottomSpace } from "react-native-iphone-x-helper";
import RypYo from "../../RypYo";
var RNDeviceInfo = NativeModules.RNDeviceInfos;
const SCALESCRREN = Dimensions.get("window")
import { UIPlugin, UIPluginManager } from "../../UIPlugin";




class DevFabs extends Component {
    constructor(ops) {
        super(ops)
        this.isRelease = RypYo.appConfig.appConfig.mode == "release" || RypYo.appConfig.appConfig.mode == "alpha"
    }
    clickMode(index) {

        if (this.isRelease) {
            switch (index) {
                case 0:
                    // RNDeviceInfo.saveMode && RNDeviceInfo.saveMode("dev");
                    break
                case 1:
                    // RNDeviceInfo.saveMode && RNDeviceInfo.saveMode("beta");
                    break
                case 2:
                    RNDeviceInfo.saveMode && RNDeviceInfo.saveMode("release");
                    break
                case 3:
                    RNDeviceInfo.saveMode && RNDeviceInfo.saveMode("alpha");
                    break
            }
        } else {
            switch (index) {
                case 0:
                    RNDeviceInfo.saveMode && RNDeviceInfo.saveMode("dev");
                    break
                case 1:
                    RNDeviceInfo.saveMode && RNDeviceInfo.saveMode("beta");
                    break
                case 2:
                    RNDeviceInfo.saveMode && RNDeviceInfo.saveMode("release");
                    break
                case 3:
                    RNDeviceInfo.saveMode && RNDeviceInfo.saveMode("alpha");
                    break
            }
        }
        this.props.onSuccess && this.props.onSuccess()
    }
    render() {
        if (RNDeviceInfo && RNDeviceInfo.runMode) {

            let Size = this.props.Size || 160
            let _Size = Size / 3
            return (
                <View style={{ height: Size, width: Size, position: "relative", justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(1,1,1,0)" }}>
                    <TouchableOpacity activeOpacity={1} style={{
                        height: _Size, width: _Size, backgroundColor: "red",
                        justifyContent: 'center', alignItems: 'center',
                        borderRadius: _Size / 2,

                    }} >
                        <Text>{RNDeviceInfo.runMode}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.clickMode(0)} activeOpacity={1} style={{
                        width: _Size, height: _Size, position: "absolute", backgroundColor: "yellow",
                        left: 0, top: 0, justifyContent: 'center', alignItems: 'center',
                        borderRadius: _Size / 2,
                    }}>
                        {
                            this.isRelease ? null : <Text>Dev</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.clickMode(1)} activeOpacity={1} style={{
                        width: _Size, height: _Size, position: "absolute", backgroundColor: "yellow",
                        top: 0, right: 0, justifyContent: 'center', alignItems: 'center',
                        borderRadius: _Size / 2,
                    }}>
                        {
                            this.isRelease ? null : <Text>Beta</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.clickMode(2)} activeOpacity={1} style={{
                        width: _Size, height: _Size, position: "absolute", backgroundColor: "yellow",
                        left: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
                        borderRadius: _Size / 2,
                    }}>
                        <Text>Realse</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.clickMode(3)} activeOpacity={1} style={{
                        width: _Size, height: _Size, position: "absolute", backgroundColor: "yellow",
                        right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
                        borderRadius: _Size / 2,
                    }}>
                        <Text>alpha</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return null
        }

    }
}

export class DevView extends Component {
    constructor(ops) {
        super(ops)

        this.state = {
            showFabs: false
        }
        this.isRelease = RypYo.appConfig.appConfig.mode == "release" || RypYo.appConfig.appConfig.mode == "alpha"
    }
    componentWillMount() {
        if (this.isRelease) {
            this._panResponder = PanResponder.create({
                onStartShouldSetPanResponder: (evt, gestureState) => true,
                onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
                onMoveShouldSetPanResponder: (evt, gestureState) => true,
                onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
                onPanResponderGrant: (evt, gestureState) => {
                    this.maxX = 0;
                    this.minY = SCALESCRREN.height;
                    this.dx = 0;
                    this.dy = 0;
                },
                onPanResponderMove: (evt, gestureState) => {
                    if (gestureState.dx > this.maxX) { this.maxX = gestureState.dx }
                    if (gestureState.dy < this.minY) { this.minY = gestureState.dy }
                    this.dx = gestureState.dx;
                    this.dy = gestureState.dy;
                },
                onPanResponderTerminationRequest: (evt, gestureState) => true,
                onPanResponderRelease: (evt, gestureState) => {
                    this.dy = Math.abs(this.dy);
                    this.dx = Math.abs(this.dx);
                    this.minY = Math.abs(this.minY);
                    this.maxX = Math.abs(this.maxX);
                    if ((this.maxX + 70) > SCALESCRREN.width && (this.minY + 150) > SCALESCRREN.height && this.dy < 60 && this.dx < 60) {
                        this.setState({ showFabs: true })
                    }
                },
                onShouldBlockNativeResponder: (evt, gestureState) => {
                    return true;
                },
            });
        } else {

            let _hei = SCALESCRREN.height * 0.5;
            this._panResponder = PanResponder.create({
                onStartShouldSetPanResponder: (evt, gestureState) => true,
                onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
                onMoveShouldSetPanResponder: (evt, gestureState) => true,
                onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
                onPanResponderGrant: (evt, gestureState) => {
                    this.progress = [];
                    this.dx = 0;
                    this.progress = [0]
                },
                onPanResponderMove: (evt, gestureState) => {
                    if (gestureState.dx > this.dx) { this.dx = gestureState.dx; }
                    if (gestureState.dy <= -_hei && this.progress[1] == undefined) {
                        this.progress.push(1);
                    } else if (gestureState.dy > -100 && this.progress.length == 2) {
                        this.progress.push(0);
                    }
                },
                onPanResponderTerminationRequest: (evt, gestureState) => true,
                onPanResponderRelease: (evt, gestureState) => {
                    if (this.progress.length == 3 && this.progress[0] == 0 && this.progress[1] == 1 && this.progress[2] == 0) {
                        if (this.dx > SCALESCRREN.width * 0.6)
                            this.setState({ showFabs: true })
                    }
                },
                onShouldBlockNativeResponder: (evt, gestureState) => {
                    return true;
                },
            });
        }

    }
    render() {
        return (
            <View pointerEvents={'box-none'} style={{ width: SCALESCRREN.width, height: SCALESCRREN.height, backgroundColor: 'rgba(178,178,178,0.0005)', position: "absolute", justifyContent: 'center', alignItems: 'center' }}>
                {
                    this.state.showFabs ?
                        <View style={{ backgroundColor: "rgba(1,1,1,0)" }}>
                            <DevFabs onSuccess={() => {
                                this.setState({ showFabs: false });
                                setTimeout(()=>{
                                    NativeModules.ToolsModule.reLoad && NativeModules.ToolsModule.reLoad();
                                },1000)
                            }}></DevFabs>
                        </View>
                        : null
                }
                <View pointerEvents={'box-none'} style={{ width: 40, top: 0, bottom: 0, position: "absolute", left: 0, backgroundColor: 'rgba(178,178,178,0.0005)'}}>
                    <Animated.View {...this._panResponder.panHandlers} style={{ marginTop: SCALESCRREN.height - (getBottomSpace() + 50 + 80), height: 80, width: 40, backgroundColor: 'rgba(178,178,178,0.01)' }}>
                    </Animated.View>
                </View>
            </View>
        )
    }
}

class DevPlugin extends UIPlugin {
    name = "DevViewPlugin";
    component = DevView
    constructor() {
        super()
    }
    emit(data) { }
}

UIPluginManager.addPlugin(new DevPlugin())
/***
 ios工程 ToolsModule.m文件下

    -(NSString*)runMode{
        #ifdef DEBUG
            NSUserDefaults * UDefault = [NSUserDefaults standardUserDefaults];
            NSString *appMode = [UDefault stringForKey:@"App_Run_Mode"];
            return appMode != nil ? appMode : BASE_MODE;
        #else
            return BASE_MODE;
        #endif
    }


    RCT_EXPORT_METHOD(saveMode:(NSString *)mode){
        NSUserDefaults * UDefault = [NSUserDefaults standardUserDefaults];
        [UDefault setObject:mode forKey:@"App_Run_Mode"];
    }

android  RNDeviceModule.java文件

    public Map getConstants()
        constants.put("runMode", getMode());//运行模式

    @ReactMethod
    public void saveMode(String mode){
        SharedPreferences preference = null;
        preference = getCurrentActivity().getSharedPreferences("text", 0);
        SharedPreferences.Editor editor = preference.edit();
        editor.putString("mode_key", mode);
        editor.commit();
    }

    public String getMode(){
        if (TextUtils.equals(AppConfig.RUN_MODE,"release")){
            return AppConfig.RUN_MODE;
        }else {
            SharedPreferences preference = null;
            preference = getCurrentActivity().getSharedPreferences("text", 0);
            String APP_MODE =  preference.getString("mode_key", AppConfig.RUN_MODE);
            return APP_MODE;
        }
    }
 */