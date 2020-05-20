import React, { Component } from 'react';
import { RefreshControl, ScrollView } from "react-native";
import { SwRefreshScrollView, RefreshStatus } from "./ScrollView/SwRefreshScrollView";

export const RefreshType = {
    SystemType: 1000,
    CustomType: 9999
}

const Defaultoption = {
    //必须all
    type: RefreshType.SystemType,
    //指定下拉后刷新的方法 all
    onRefresh: "onRefresh",
    //all 为ScrollView指定属性 组件对象this.
    scrollViewProps: "ContainerScrollProps",

    //SystemType RefreshControl
    refreshControlProps: "refreshControlProps"
}

export function RefreshHeader(option) {
    return function (t, n, descriptor) {
        option = Object.assign(Defaultoption, option || {})
        const original = descriptor.value;
        if (typeof original === 'function' && n == "render") {
            descriptor.value = function () {
                const { onRefresh, type, scrollViewProps } = option;
                let Source = {
                    source: null,
                    end: null,
                    start: null
                }
                let _onRefresh = this[onRefresh]

                //ScrollView 的其他Props
                let _scrollViewProps = this[scrollViewProps] || {}
                //指定
                this.RefreshTarget = Source;
                switch (type) {
                    case RefreshType.CustomType:
                        if (!(_onRefresh && typeof _onRefresh == "function")) {
                            _onRefresh = function (end) {
                                console.warn("需要指定 onRefresh 回调方法。")
                                end && end()
                            }
                        }
                        //结束下拉组件
                        let cusOnRefresh = function (end) {
                            Source.end = end;
                            _onRefresh.bind(this)(end)
                        }.bind(this)

                        //自定义下拉
                        const { customRefresh } = option;
                        let cusRefOps = this[customRefresh]
                        let customHeader = cusRefOps || {}
                        return (
                            <SwRefreshScrollView style={{ flex: 1 }} {..._scrollViewProps} {...customHeader} onRefresh={cusOnRefresh}
                                ref={(_ref) => {
                                    if (_ref) {
                                        Source.source = _ref; Source.start = _ref.beginRefresh.bind(_ref);
                                    }
                                }}
                            >
                                {
                                    original.apply(this)
                                }
                            </SwRefreshScrollView>
                        )
                        break
                    case RefreshType.SystemType:
                        if (typeof this.state.__refreshing != "boolean") {
                            this.state = Object.assign({
                                __refreshing: false
                            }, this.state)
                        }
                        Source.start = () => {
                            this.setState({ __refreshing: true })
                            _onRefresh.bind(this)()
                        }
                        Source.end = () => {
                            this.setState({ __refreshing: false })
                        }

                        if (!(_onRefresh && typeof _onRefresh == "function")) {
                            _onRefresh = function () { }
                        }

                        let sysOnRefresh = function () {
                            this.setState({ __refreshing: true })
                            _onRefresh.bind(this)()
                        }.bind(this)
                        const { refreshControlProps } = option;
                        return (
                            <ScrollView style={{ flex: 1 }} {..._scrollViewProps} refreshControl={
                                <RefreshControl {...(this[refreshControlProps] || {})} onRefresh={sysOnRefresh} refreshing={this.state.__refreshing} >

                                </RefreshControl>
                            } ref={(_ref) => {
                                Source.source = _ref
                            }}>
                                {
                                    original.apply(this)
                                }
                            </ScrollView>
                        )
                }
                return original.apply(this)
            }
        } else {
            console.warn(`RefreshHeader 只能用来修饰来标识 组件render方法。`)
        }
        return descriptor
    }
}
/**
 * 用于修饰组件render方法;
 * 为该组件增加下拉组件
 * 原理
 *   增加ScrollView为容器,增加下拉刷新组件。
 *   修饰组件的ContainerScrollProps 设置ScrollView配置  (this.ContainerScrollProps)
 * 
 * @param {*} Refresh 为增加的下拉刷新组件
 *              接受的参数为  
 *                  refreshing  
 *                  onRefresh 
 *                  组件refreshProps属性 (this.refreshProps)
 * 
 * @param {*} refreshing  该组件state的属性 指定是否刷新,状态的属性名称 
 * @param {*} onRefresh 该组件的某一方法 为触发下拉之后调用的方法
 */