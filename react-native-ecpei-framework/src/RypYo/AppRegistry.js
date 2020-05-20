import React, { Component } from 'react';
import { AppRegistry, View, TouchableOpacity } from 'react-native';
import { StyleProvider } from 'native-base';
import { Provider } from 'react-redux';
import { isNgModule } from "./NgTool";
import RypYo, { OnlyLoading, OnlyToast, OnlyPopup, OnlyDialog } from './RypYo';
// import { Loading, NormalToast, Toast, PopupContainer, PopupDialog } from "react-native-ecpei-widgets";
import { DevView } from "./DevModule/Fabs/index";
import { EventEmitterCenter, EventTypeCenter } from "react-native-ecpei-common";
import { UIPluginManager } from "./UIPlugin";

if (!AppRegistry.registerComponentOld) {
  AppRegistry.registerComponentOld = AppRegistry.registerComponent;
  AppRegistry.registerComponent = function (appKey, ngModuleOrProvider) {
    componentProvider = null
    ngModule = {};
    if (isNgModule(ngModuleOrProvider)) {
      if (ngModuleOrProvider.prototype != null && ngModuleOrProvider.__proto__ == null) {
        componentProvider = ngModuleOrProvider.prototype.componentProvider
      } else {
        ngModule = new ngModuleOrProvider()
        componentProvider = ngModule.componentProvider
      }
    } else {
      componentProvider = ngModuleOrProvider
    }

    class RootElement extends Component {
      constructor(ops) {
        super(ops)
        this.state = {
          Component: componentProvider.bind(ngModule)(),
          showLoading: false,
          option: {},
        }
      }
      componentDidUpdate() {
        return false
      }
      /**
       * 渲染 UI插件
       */
      _renderUIPlugins = () => {
        return Object.values(UIPluginManager.plugins).map((item, index) => {
          // const key = item.key;
          const name = item.name;
          const props = item.props;
          const state = item.state;
          const UiComponent = item.component;
          return (
            <UiComponent key={name} ref={name} {...props}></UiComponent>
          )
        })
      }
      /**
       * 更新插件state
       */
      updateOptions() {
        // let options = {  }
        // Object.values(UIPluginManager.plugins).map((item, index) => {
        //   const key = item.key;
        //   options[key] = item.state;
        // })
        // this.setState({ UIPluginOptions: options });
      }
      componentDidMount() {
        UIPluginManager.setPluginContainer(this);
        this.updateOptions();
        // let keys = Object.keys(UIPluginManager.plugins);
        // this.EventSub = EventEmitterCenter.registerReceivers(EventTypeCenter.registerEvents(keys), ({ type, data = {} }) => {
        //   try {
        //     UIPluginManager.emitEvent(type, data)
        //   } catch (error) {
        //   }
        // })
      }
      componentWillUnmount() {
        // this.EventSub && this.EventSub.remove();
        // this.loading && this.loading.remove();
        // this.toastEvent && this.toastEvent.remove();
        // this.popupEvent && this.popupEvent.remove();
        // this.popupDialogEvent && this.popupDialogEvent.remove();
      }
      render() {
        if (RypYo.appConfig && RypYo.appConfig.reducerData) {
          let appConfig = RypYo.appConfig;
          let getTheme = appConfig.getTheme;
          let theme = appConfig.theme;
          return (
            <View style={{ flex: 1, position: "relative" }}>
              <StyleProvider style={getTheme(theme)}>
                <Provider store={RypYo.getStore()}>
                  <this.state.Component {...this.props} />

                </Provider>
              </StyleProvider>
              {
                this._renderUIPlugins()
              }
            </View>
          );
        }
        return (
          <this.state.Component {...this.props} />
        )
      }
    }

    return AppRegistry.registerComponentOld(appKey, () => RootElement);
  }
}

