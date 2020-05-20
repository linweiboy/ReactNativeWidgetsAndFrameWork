import React, { Component } from 'react';
import { NavigationContainer, TabNavigator, DrawerNavigator, SwitchNavigator, StackNavigator } from "react-navigation";
import { Connect, Store } from 'react-redux';
import { Effect, Channel } from 'redux-saga';
import { ForkEffect, CallEffect, Pattern } from 'redux-saga/effects';

export declare type Business = any;

export declare type createStackNavigator = (routeConfigMap: any, stackConfig?: any) => NavigationContainer
export declare type createSwitchNavigator = (routeConfigMap: any, switchConfig?: any) => NavigationContainer
export declare type createDrawerNavigator = (routeConfigMap: any, drawerConfig?: any) => NavigationContainer
export declare type createTabNavigator = (routeConfigMap: any, drawConfig?: any) => NavigationContainer
export declare type ContentListenerFunction = (content: any) => viod
export declare class ContentListenerSubscription{
    key:string;
    /**
     * 移除监听
     */
    remove();
}
export declare class ModuleRouter {
    name: string
    type: createStackNavigator | createSwitchNavigator | createDrawerNavigator | createTabNavigator
    routeConfigMap: { [key: string]: ModuleRouter | { [key: string]: any } }
    stackConfig: { [key: string]: any }
    // acceptRouter: boolean
    getRouterInstance: () => NavigationContainer
}
/**
 * 
 * 让该路由支持设定初始路由
 * props.navigation.navigate("XXModule",{initRouter:"xxPage"})
 */
export declare type NavigationInitRouterHandle = (container: NavigationContainer) => void

export declare class DevModule {
    disable: boolean
    configName: string
    run(isEnv: boolean, config: object): void
}
export declare class DevModuleManager {
    addModule(module: DevModule): void;
    // removeModule(module:DevModule):void;
}

export interface RypModule {
    key?: string
    /**
     * 设置Redux Store
     * imports 中的子模块 接受上级模块的影响
     *  子模块中没有设置 接受上级的值 
     *  子模块设置了 无任何影响
     */
    reduxStore: any
    /**
     * Component
     * 仅仅在Root模块中使用
     * 其他模块中设置无效
     */
    bootstrap?: Component

    imports?: RypModule[]

    navRouter: ModuleRouter
}

export class ModuleBase {
    static ConfigStart(): void
    /**路由解析完成 */
    static RouterHandleAfter(config: { [key: string]: ModuleRouter }, Container: NavigationContainer): void
    /**
     * 在App启动后调用
     */
    Applaunch(): void;
}

export type ItemMap = { [key: string]: any }
export enum AppType {
    Supplier = "Supplier",
    Server = "Server",
    Vin = "Vin"
}
export declare interface RypYoConfig {
    //app运行环境配置
    appConfig: any,
    //请求服务 api配置
    apiConfig: any,
    //redux 配置
    reducerData: { [key: string]: Function },
    //主题配置
    getTheme: Function,
    theme: any,
    //redux注册插件
    reduxMiddleware: Function[],
    /**
     * 开始 使用redux-saga插件
     */
    rootSage: GeneratorFunction,
    /**
     * 表明当前是
     *  供应商App
     *  服务商App
     */
    appType: AppType
}
export declare type RypDevConfig = { [key: string]: ItemMap };

/**
 * 得到Redux Store对象
 */
export declare type getReduxStore = () => Store

/**
 * 1：连接对象 设置派发对象 
 * 2：修饰方法
 *    class ABusiness{
 *      会在你 所有参数后面加参数
 *      统一Promise返回
 *      AMethod=(a,b,c,d,reslove,reject)=>{
 *            
 *      }
 *      //下划线开头的方法 不会进行修饰 没有resolve 和 reject 并且 不是Promise返回   
 *      _BMethod = ()=>{
 *          return {xx:oo}
 *      }
 * 
 *  }
 */
export declare type connectDispatch = (business: Business) => Business

export declare class Button {
    title: string;
    containerStyle: any
    titleStyle: any
}
export declare class PopupType {
    Title: string
    TitleStyle: any
    style: any
    buttonOptions: Button[]
    BottomContainerStyle: any
    topContainerStyleStyle: any
    onPress: Function
}
export interface ToashOption {
    disabled: true,
    text: String,
    textStyle: any,
    showTime: Number
}
export class RypYoClass {
    //启动根模块
    registerBoots(key: string, AppModule: RypModule): string;
    //配置运行环境
    initConfig(confog: RypYoConfig): void;
    //配置调试模块
    initDevConfig(config: RypDevConfig): void;
    //开启和更新 全局Loading
    runLoading(tip: string): void;
    //关闭全局Loading
    closeLoading(): void;
    /***
     * 显示Popup
     */
    showPopup(options: PopupType, touchBkHidden: Boolean, androidBackHidden: Boolean, props: any): void;
    closePopup(): void;
    showDialog(layout, item, touchBkHidden: Boolean, androidBackHidden: Boolean): void;
    toastShow(option: String | ToashOption): void;

    /**
     * 判断App是服务还是供应商
     */
    isSupplier(): Boolean;
    isServer(): Boolean;
    isVin(): Boolean;
    select<T, V, U>(options = {
        Vin: T,
        Server: V,
        Supplier: U
    }): T | V | U;
    /**
     * 派发Action
     * Ryp.dispatch({type:"XXXModule/AAAAAction",payload:[]}).then
     */
    dispatch(action: Action): Promise<any>;

    /**
     * 得到对照表
     */
    getContent(): any;
    /***
     * 监听Content变化
     */
    addStoreContentListener(call: ContentListenerFunction):ContentListenerSubscription;
}

export const RypYo: RypYoClass;

export interface UIPluginOptions {
    name: string;
    props: any;
    component: Component
}
export class UIPlugin {
    name: string;
    props: any;
    component: Component
    constructor(ops: UIPluginOptions) { }
    getComponent: () => Component
}
export type UIPluginDict = { [key: sring]: UIPlugin }
export class UIPluginManagerClass {
    container: any;
    plugins: UIPluginDict
    addPlugin: (plugin: UIPlugin) => void
    updateContainer: () => void
    removePlugin: (plugin: UIPlugin) => void
    setPluginContainer: (container: any) => void
    getPluginInstance: (name: string) => UIPlugin
    emitEvent: (pluginOrName: string, data: any) => void
}
export const UIPluginManager: UIPluginManagerClass;

/**
 * 
 */
// export declare const connect: Connect;
/**
 * creatActionCreator,
    creatActionCreators,
    createActionTyps
 * 
 */

export declare interface Meta {
    thunk: boolean
}

export declare interface Action {
    type: string,
    payload: any,
    meta?: Meta
}

export declare interface ActionTypes {
    REQUEST: string,
    PENDING: string,
    SUCCESS: string,
    FAILURE: string,
    RESET: string
}
export declare interface ActionGroup {
    request: (payload: any) => Action,
    pending: (payload: any) => Action,
    success: (payload: any) => Action,
    failure: (payload: any) => Action,
    reset: (payload: any) => Action
}
export declare type createActionTypes = (actionName: string) => ActionTypes;

export declare type createActionCreator = (type: string, payload: any, meta?: Meta) => Action;

export declare type createActionCreators = (types: ActionTypes) => ActionGroup;
/**
 *  让dispatch能正常回调
 *  this.props.dispatch({
 *      type:"XXX",
 *  }).then((res)=>{
 *      res == Adata
 * })
 *  yeild PutPromise(action,type,Adata)
 */
export declare type PutPromise<_Action extends Action> = (action: _Action, type: string, payload: any) => Effect;


/**
 * 
 *  防抖动  在一定时间内 仅仅执行一次
 *  <InputText onChange={(text)=>{
 *      this.props.disapatch({
 *          type:"Seacher",
 *          data:"xxxxxx"
 *      })
 * }}>
 *  yeild deboune("Seacher",function*(action){
 *      let result = yeild call(fetch,"url")
 *      yeild put({})
 * },500)
 */
export declare type deboune = (type: Action | string, targe: GeneratorFunction, time: Number) => ForkEffect
/**
 *  在任务失败之后重启任务
 *  最多执行count次
 *  let result = yeild reset(call(function*(){
 *       return yeild call(fetch,"url")
 *  }),2)
 */
export declare type reset = (effect: CallEffect, count: Number) => CallEffect

export declare type takeSwitch = (parrents: Array<Pattern>, GeneratorFunction) => ForkEffect



export declare type Handle = Object;
export declare type Reducer = (state: any, action: Action) => any;
export declare type ResultHandle = { [key: string]: Reducer | any }
export declare type HandleWrap = (ActionTypes) => ResultHandle

export declare type combineTypes = (types: string[]) => string;
export declare type ActionHandle = (type: ActionTypes, handle: HandleWrap | ResultHandle) => Handle;
export declare type CreateReduxcer = (handles: Handle[], initState: any) => Reducer