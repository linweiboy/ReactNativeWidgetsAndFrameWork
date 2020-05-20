import { } from "./AppRegistry";
import { ValidateConfig, isNgModule, isRouter, isReduxStore } from "./NgTool";
import { RouterBox } from "./ModuleRouter";

export class ModuleConfig {
    key = "ModuleId"
    /**
     * 设置Redux Store
     * imports 中的子模块 接受上级模块的影响
     *  子模块中没有设置 接受上级的值 
     *  子模块设置了 无任何影响
     * 
     */
    // reduxStore = null
    /**
     * Module Component
     */
    bootstrap = null
    imports = []
    navRouter = null //路由
    constructor(config) {
        // this.reduxStore = config.reduxStore
        this.theme = config.theme
        this.bootstrap = config.bootstrap
        this.imports = config.imports
        this.navRouter = config.navRouter
        this.key = config.key
        this.action = config.action
    }
}
export class ModuleBase {
    /**
     * 解析配置
     */
    ConfigStart() { }
    /**路由解析完成 */
    RouterHandleAfter(config, Container) { }
    /**Redux注入 */
    // ReduxInto(isIn, redux) { }
    _AppContainerHandle() {
        debugger
    }
}

export function RypModule(config = {}) {
    _config = new ModuleConfig(config)
    if (__DEV__ && !ValidateConfig(_config)) {
        throw new Error("config 验证不通过")
    }
    return function (target) {
        target.prototype.ConfigStart && target.prototype.ConfigStart.call && target.prototype.ConfigStart()
        target.prototype.componentProvider = function () {
            return this.moduleConfig.bootstrap;
        }
        target.prototype.moduleConfig = _config;
        //redux 注入
        // target.prototype.reduxStoreIn = function (redux) {
        //     // debugger
        //     if (this.moduleConfig.reduxStore == null || !isReduxStore(this.moduleConfig.reduxStore)) {
        //         this.moduleConfig.reduxStore = redux;
        //         (this.moduleConfig.imports || []).map((module) => {
        //             module.prototype.reduxStoreIn && module.prototype.reduxStoreIn.call && module.prototype.reduxStoreIn(redux)
        //         })
        //     }
        //     name = this.moduleConfig.navRouter.name
        //     ReduxBox.addStore(name, this.moduleConfig.reduxStore)
        // }
        // if (target.prototype.moduleConfig.reduxStore && (target.prototype.moduleConfig.imports && target.prototype.moduleConfig.imports.length >= 1)) {
        //     target.prototype.moduleConfig.imports.map((module) => {
        //         module.prototype.reduxStoreIn && module.prototype.reduxStoreIn.call && module.prototype.reduxStoreIn(target.prototype.moduleConfig.reduxStore)
        //     })
        //     name = target.prototype.moduleConfig.navRouter.name
        //     ReduxBox.addStore(name, target.prototype.moduleConfig.reduxStore)
        // }

        //路由解析
        let result = RouterBox.HandleRouter(target, _config);
        target.prototype.RouterHandleAfter && target.prototype.RouterHandleAfter.call && target.prototype.RouterHandleAfter(...result)
        return target
    }
}

