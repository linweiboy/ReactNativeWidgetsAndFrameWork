import { combineReducers } from "redux";
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import apiConfigFunc from "../config/apiConfig";
import appConfigFunc from "../config/appConfig";
import RyPLog from "./RyPLog";
import { isArray } from "./NgTool";
import createSagaMiddleware from 'redux-saga';
import { middleware as thunkMiddleware } from 'redux-saga-thunk'
import { ConnectDiapatch } from "./Redux-saga/Connect";
import { isGenerator } from "./Redux-saga/saga/generator";
import { SagaThunkHandle } from "./Redux-middeware/SagaThunkHandle";
import promise from "./Redux-middeware/promise";


export default function getReduxcers(AppConfig) {
    let Middleware = isArray(AppConfig.reduxMiddleware) ? AppConfig.reduxMiddleware : [];
    if (AppConfig.rootSage && isGenerator(AppConfig.rootSage)) {
        RyPLog("创建Sage");
        let Sage = createSagaMiddleware()
        Middleware.push(thunkMiddleware, Sage)
        setTimeout(() => {
            RyPLog("启动Sage");
            Sage.run(AppConfig.rootSage);
        })
    }
    let thunks = Middleware.concat([thunk, promise, SagaThunkHandle]);
    RyPLog("配置Redux插件", thunks);
    const enhancer = compose(applyMiddleware(...thunks));
    let apiConfig = AppConfig.apiConfig;
    let appConfig = AppConfig.appConfig;
    let reducers = null;
    if (typeof AppConfig.reducerData == "function") {
        reducers = function (state = null, action) {
            return {
                apiConfig: apiConfig,
                appConfig: appConfig,
                ...AppConfig.reducerData(state, action),
            }
        };
    } else {
        reducers = combineReducers(Object.assign({
            apiConfig: () => apiConfigFunc(apiConfig),
            appConfig: () => appConfigFunc(appConfig)
        }, AppConfig.reducerData));
    }
    RyPLog("创建Store");
    let Store = createStore(reducers, enhancer);
    Store.dispatch = ConnectDiapatch(Store.dispatch)
    return Store;
}