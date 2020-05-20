
/**
 * 
 * @param {*} config  验证NgModule 参数
 */
export function ValidateConfig(config) {
    // {
    //     status:false,
    //     error:config.key + "bootstrap 不能为空"
    // }
    if(config.navRouter == null ) return  false
    return true
}
//验证Router参数
export function ValidateRouterConfig(config) {
    return true
}
//验证是否是路由ModuleRouter对象
export function isRouter(router) {
    if(router == null)return false
    /**
     * 
     * {
        AppLoad: {a:{screen:f}},
        RYPLogin: LoginRouter,
        RYPMainHome: HomeRouter,
        RYPAbout: AboutRouter,
        不容许
    },
     */
    return router.routeConfigMap && router.stackConfig
}
//是否是创建好的导航容器对象
export function isRouterContainer(router) {
    func = `${router}`
    start = func.indexOf(" ") + 1
    end = func.indexOf("(")
    return func.substring(start, end) == "NavigationContainer"
}

/**
 * 
 * @param {*} target 是否是Module
 */
export function isNgModule(target) {
    if (target.prototype == null) {
        return target.__proto__.constructor.prototype.moduleConfig != null
    }
    return target.prototype.moduleConfig != null
}
/**
 * 判断是否为Store对象
 */
export function isReduxStore(store) {
    if (store == null) return false
    if (Object.keys(store).length == 0) return false
    return store.getState && store.dispatch && store.subscribe && store.replaceReducer
}

/***
 * 验证是否为数组
 */
export function isArray(target){
    return Object.prototype.toString.call(target) == "[object Array]"
}