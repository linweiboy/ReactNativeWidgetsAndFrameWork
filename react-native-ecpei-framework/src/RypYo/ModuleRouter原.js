
import React, { Component } from 'react';
import { createStackNavigator, NavigationActions, StackActions, createSwitchNavigator } from "react-navigation";
// import createReactContext from 'create-react-context';
import { ValidateRouterConfig } from "./NgTool";
import { ValidateConfig, isNgModule, isRouter, isRouterContainer } from "./NgTool";

export class ModuleRouter {
    name = ""
    type = null
    routeConfigMap = {}
    stackConfig = {}
    /**
     * 表示该Router 接受子的路由数据
     * 如果
     * A ModuleRouter{
     *      routeConfigMap = {
     *          One:B ModuleRouter
     *      }
     *      acceptRouter:true
     * }
     *   如果(B ModuleRouter的acceptRouter参数为true 那么A 不接受下层路由 又One接受)
     */
    acceptRouter = true
    constructor(config) {
        if (ValidateRouterConfig(config)) {
            this.type = config.type
            this.routeConfigMap = config.routeConfigMap || {}
            this.stackConfig = config.stackConfig || {}
            // this.acceptRouter = config.acceptRouter || true
            this.name = config.name || "OneRouter"
        } else {
            throw new Error("路由配置是不正确的")
        }
    }
    //获取导航对象
    getRouterInstance() { }
    _getRouterContainer(routeConfigMap, target) {
        routeConfigMap = routeConfigMap || this.routeConfigMap
        keys = Object.keys(routeConfigMap)
        _key = keys[keys.length - 1]
        if (_key == null) { return {} }

        temp = {}
        keys.map((key, index) => {
            item = routeConfigMap[key]
            if (isRouter(item)) {
                router = item._getRouterContainer(null, target)
                temp[key] = router
            } else {
                temp[key] = item
            }
        })
        const { type, stackConfig } = this
        Nav = type(temp, stackConfig)
        temp = null;
        return Nav;
    }
}

export class RouterContainer {
    routers = {}
    constructor() { }
    //组合下级路由
    HandleRouter(target, _config) {
        let maps = _config.navRouter.routeConfigMap;
        for (const key in maps) {
            let router = maps[key];
            if (router.mark) {
                router.screen = MarkComponent(_config.navRouter.name)(router.screen)
            }
        }
        // _result = {};
        if (_config.imports && _config.imports.length >= 1) {
            //本导航
            navRouter = _config.navRouter
            let _Sub = {}
            _config.imports.map((item) => {
                Config = item.prototype.moduleConfig
                name = Config.navRouter.name
                reduxStore = Config.reduxStore
                _Sub[name] = item.prototype.moduleConfig.Nav;
            })
            navRouter.routeConfigMap = {
                ...navRouter.routeConfigMap,
                ..._Sub
            }
            const { routeConfigMap } = navRouter
            const __routeConfigMap = {}
            Object.keys(routeConfigMap).map((key) => {
                oneRouter = routeConfigMap[key]
                if (isRouter(oneRouter)) {
                    __routeConfigMap[key] = oneRouter._getRouterContainer(null, target)
                } else {
                    __routeConfigMap[key] = oneRouter
                }
            })
            // debugger
            let Container = navRouter._getRouterContainer(__routeConfigMap, target)
            target.prototype.moduleConfig = {
                ...target.prototype.moduleConfig,
                Nav: Container
            }
        } else {
            if (_config.navRouter && isRouter(_config.navRouter)) {
                let Container = _config.navRouter._getRouterContainer(null, target)
                _config.navRouter._result = null;
                _result = _config.navRouter.routeConfigMap
                target.prototype.moduleConfig = { ..._config, Nav: Container }
            } else {
                throw new Error(`${_config.name}的navRouter 不是ModuleRouter对象`)
            }

        }
        _config.navRouter.getRouterInstance = function () {
            return target.prototype.moduleConfig.Nav
        }
        return [_config.navRouter.routeConfigMap, target.prototype.moduleConfig.Nav]
    }
}
export const RouterBox = new RouterContainer()


export function NavigationInitRouterHandle(ModuleRouter) {
    // const MaindefaultStateAction = ModuleRouter.router.getStateForAction;
    // ModuleRouter.router.getStateForAction = function (action, state) {
    //     let Res = MaindefaultStateAction(action, state)
    //     if (action.type == NavigationActions.INIT && action.params && action.params.initRouter) {
    //         let one = Res.routes[0]
    //         Res.routes = [
    //             {
    //                 ...{
    //                     ...one,
    //                     routeName: action.params.initRouter
    //                 }
    //             }
    //         ]
    //         return Res;
    //     }
    //     return Res;
    // };
}

export function MarkComponent(ModulName) {
    return function (PageComponent) {
        class WrapComponent extends Component {
            constructor(props) {
                super(props);
            }
            getSourceSource() {
                return this.refs.Mark;
            }
            render() {
                return <PageComponent  {...this.props} ModulName={ModulName} ref="Mark"></PageComponent>
            }
        }
        return WrapComponent
    }
}