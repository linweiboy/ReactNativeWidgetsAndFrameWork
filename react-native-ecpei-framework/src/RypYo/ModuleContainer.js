import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import hoistNonReactStatics from "hoist-non-react-statics";
import { isReduxStore } from './NgTool';

export function CreateRootContainer(config = {}) {
    return function (WComponent) {
        return WComponent;
        // class Container extends Component {
        //     constructor(ops) {
        //         super(ops)
        //     }
        //     render() {
        //         Store = config.reduxStore
        //         if (config.reduxStore && config.reduxStore.call) { Store = config.reduxStore() }
        //         return (
        //             <View style={{ flex: 1 }}>
        //                 {
        //                     isReduxStore(Store) ?
        //                         <Provider store={Store} >
        //                             <WComponent {...this.props} ></WComponent>
        //                         </Provider>
        //                         :
        //                         <WComponent {...this.props} ></WComponent>
        //                 }
        //             </View>
        //         )
        //     }
        // }
        // Container.WrappedComponent = WComponent
        // Container.displayName = `CreateContainer-${WComponent.displayName}`
        // return hoistNonReactStatics(Container, WComponent)
    }
}

export function CreateModuleContainer(Config = {}) {
    /**
     *  最初是想通过NavigationContainer 在外层包装一个组件  然后最初Redux的
     * 
     *  但是这样就会<NavigationContainer></NavigationContainer> reacy-navigation是不容许这么做的  多次实例化NavigationContainer
     * 
     *  仅仅容许一次实例化 通过导航进入NavigationContainer页面
     */
    // return function (WComponent) {
    //     class ModuleContainer extends Component {
    //         constructor(props) {
    //             super(props);
    //         }
    //         render() {
    //             Store = Config.reduxStore
    //             if (Config.reduxStore && Config.reduxStore.call) { Store = Config.reduxStore() }
    //             return (
    //                 <View style={{ flex: 1 }}>
    //                     {
    //                         isReduxStore(Store) ?
    //                             <Provider store={Store}>
    //                                 <WComponent ></WComponent>
    //                             </Provider>
    //                             :
    //                             <WComponent ></WComponent>
    //                     }
    //                 </View>
    //             )
    //         }
    //     }
    //     ModuleContainer.WrappedComponent = WComponent
    //     ModuleContainer.displayName = `CreateModuleContainer-NavigationContainer-${WComponent.displayName}`
    //     return hoistNonReactStatics(ModuleContainer, WComponent)
    // }
}