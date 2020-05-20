import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { DevModuleManager, RNValidate, AjaxIntercept } from "./DevModule";
import getReduxcers from './getReducer';
import { isReduxStore } from "./NgTool";
import RyPLog from "./RyPLog";
// import { EventEmitterCenter, EventTypeCenter } from "react-native-ecpei-common";
import { UIPluginManager } from "./UIPlugin";
const DefaultConfig = {
    WebLog: {
        disable: true
    },
    Validate: {

    }
};

export const OnlyLoading = "LoadingPlugin";
export const OnlyPopup = "PopupContainerPlugin"
export const OnlyToast = "ToastPlugin";

export const AppType = {
    Supplier: "Supplier",
    Server: "Server",
    Vin: "Vin"
}

const AppConfig = {
    appConfig: null,
    apiConfig: null,
    reducerData: {},
    getTheme: function () { return {} },
    theme: {},
    reduxMiddleware: [],
    rootSaga: function* () { },
    appType: AppType.Supplier
}

class _RypYo {
    models = {}
    DevConfig = {};
    appConfig = {}
    Store = null;
    constructor() { }
    _reduxListener = []
    getStore() {
        return this.Store;
    }
    _addReduxInitListenr(listen) {
        this._reduxListener.push(listen)
    }
    initConfig(appConfig = {}) {
        RyPLog("配置RypYo");
        this.appConfig = Object.assign(AppConfig, appConfig);
        RyPLog("初始化Redux");
        this.Store = getReduxcers(this.appConfig);
        this._reduxListener.map((item) => {
            item && item.call && item(this.Store)
        })
        this._reduxListener = [];
        this.Store.subscribe(this._StroeListener())
    }
    initDevConfig(devConfig) {
        RyPLog("配置调试模块");
        this.DevConfig = devConfig;
        RyPLog("开始调试模块");
        //调试
        DevModuleManager.setConfig(this.DevConfig)
        //默认开启的调试模块
        DevModuleManager.addModule(new RNValidate("Validate"))
        DevModuleManager.addModule(new AjaxIntercept("WebLog"))
    }
    registerBoots(key, AppModule) {
        if (isReduxStore(this.Store) == false) {
            throw new Error("必须需要初始化: RypYo.initConfig")
        }
        RyPLog("启动应用");
        this._initActions(AppModule);
        let Result = AppRegistry.registerComponent(key, AppModule);
        AppModule.prototype.AppInit && AppModule.prototype.AppInit();
        return Result;
    }

    /****
     * 处理App 得到所有Actions
     */
    _initActions(App) {
        let actions = [];
        function scanModule(module) {
            module.prototype.moduleConfig.imports.map((item) => {
                let action = item.prototype.moduleConfig.action || {};
                actions.push({ name: item.prototype.moduleConfig.key, action: action });
                scanModule(item);
            })
        }
        let action = App.prototype.moduleConfig.action || {};
        actions.push({ name: App.prototype.moduleConfig.key, action });
        scanModule(App);
        // 注册所有Actions
        actions.map((_action) => {
            let name = _action.name;
            if (name) {
                this.models[name] = _action.action;
            }
        })
    }
    /**
     * Action 查找
     * @param {*} type 
     * @param {*} target 
     * @param {*} index 
     */
    _scan(type = "", target = {}, index = 0) {
        let parts = type.split("/");
        let tar = target[parts[index] || ""];
        if (tar == null) {
            return null;
        } else {
            if (parts.length - 1 == index) {
                return tar;
            } else {
                return this._scan(type, tar, index + 1)
            }
        }

    }
    /**
     * 对全局Action进行派发
     */
    dispatch({ type, payload }) {
        return new Promise((resolve, reject) => {
            let handle = this._scan(type, this.models);
            if (handle) {
                this.Store.dispatch(handle(...(payload || []))).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
                return
            }
            reject({
                error: new Error(`${type} 没有检索到对应的 Action`)
            })
        })
    }
    //唯一的loading
    runLoading(tip) {
        // EventEmitterCenter.emit(OnlyLoading, JSON.stringify({ tip, disabled: true }))
        UIPluginManager.emitEvent(OnlyLoading, JSON.stringify({ tip, disabled: true }))
    }
    closeLoading() {
        // EventEmitterCenter.emit(OnlyLoading, JSON.stringify({ tip: "", disabled: false }))
        UIPluginManager.emitEvent(OnlyLoading, JSON.stringify({ tip: "", disabled: false }))
    }
    toastShow(options) {
        UIPluginManager.emitEvent(OnlyToast, options)
        // EventEmitterCenter.emit(OnlyToast, options)
    }
    /**
     * import {PopupContainer,PopupType } from "react-native-ecpei-widgets";
     * 
     * showPopup({
     *      ...PopupType.Type2,
     *      Title:"你想干嘛!!!",
     *      onPress:()=>{},
     * },touchBkHidden,androidBackHidden)
     */
    showPopup(options, touchBkHidden = false, androidBackHidden = true, props = {}) {
        UIPluginManager.emitEvent(OnlyPopup, { options, touchBkHidden, androidBackHidden, props, close: false });
        // EventEmitterCenter.emit(OnlyPopup, { options, touchBkHidden, androidBackHidden, props });
    }
    /**
     * 关闭Popup弹框
     */
    closePopup() {
        UIPluginManager.emitEvent(OnlyPopup, { close: true });
    }
    showDialog(layout, item, touchBkHidden = false, androidBackHidden = true) {
        // EventEmitterCenter.emit(OnlyDialog, { item, layout, touchBkHidden, androidBackHidden });
    }
    /**
     * 判断App是服务还是供应商
     */
    isSupplier() { return this.appConfig.appType == AppType.Supplier }
    isServer() { return this.appConfig.appType == AppType.Server }
    isVin() { return this.appConfig.appType == AppType.Vin }
    select(options = {
        Vin: null,
        Server: null,
        Supplier: null
    }) {
        if (this.isVin()) {
            return options.Vin;
        } else if (this.isSupplier()) {
            return options.Supplier
        } else {
            return options.Server
        }
    }
    getContent() {
        if (this.Store == null) return {}
        return (this.Store.getState().AppModule || {}).ContentMap || {}
    }
    _listeners = {}
    _remove = (key) => {
        key && delete this._listeners[key]
    }
    /**
     * 增加Store监听
     * @param {*} callBack 
     */
    addStoreContentListener(callBack) {
        if (callBack) {
            let key = (new Date()).toString();
            this._listeners[key] = callBack;
            return {
                remove: this._remove.bind(this, key),
                key
            }
        }
        return {
            remove: this._remove,
            key: null
        }
    }
    _StroeListener = () => {
        let ContentMap = this.getContent();
        return function () {
            let _ContentMap = this.getContent();
            if (ContentMap != _ContentMap) {
                ContentMap = _ContentMap;
                for (let key in this._listeners) {
                    try {
                        let call = this._listeners[key];
                        call && call(ContentMap);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }.bind(this)
    }
}
const RypYo = new _RypYo();
export default RypYo;
export const getReduxStore = () => RypYo.getStore()