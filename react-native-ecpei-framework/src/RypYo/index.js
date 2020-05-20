// Router = APPRouter.getRouterInstance()

import { ModuleConfig, ModuleBase, RypModule } from "./RypModule";
import { ModuleRouter,NavigationInitRouterHandle } from "./ModuleRouter";
import RypYo, { getReduxStore,AppType } from "./RypYo";
import { DevModule, DevModuleManager } from "./DevModule";
// import connect from "./Redux-saga/Connect";
import { createActionCreator, createActionCreators, createActionTypes } from "./Redux-saga/ActionHelper";
import { PutPromise } from "./Redux-saga/PutPromise";

import { deboune } from "./Redux-saga/saga/debouncing";
import { reset } from "./Redux-saga/saga/reset";
import { takeSwitch } from "./Redux-saga/saga/takeSwitch";
import { UIPlugin,UIPluginManager  } from "./UIPlugin";
//
// import ActionHandle from "./Redux-middeware/actionhandle/action";
import { ActionHandle,CreateReduxcer,combineTypes } from "./Redux-middeware/actionhandle/ActionHandle";
import { connectDispatch } from "./Redux-saga/Connect";

export {
    ModuleBase,
    RypModule,
    ModuleRouter,
    RypYo,AppType,
    DevModule,
    DevModuleManager,
    NavigationInitRouterHandle,
    // connect,
    createActionCreator,
    createActionCreators,
    createActionTypes,
    PutPromise,
    getReduxStore,

    //saga 工具
    deboune,reset,takeSwitch,

    // reducer action 处理
    ActionHandle,CreateReduxcer,combineTypes,

    connectDispatch,


    UIPlugin,UIPluginManager
}