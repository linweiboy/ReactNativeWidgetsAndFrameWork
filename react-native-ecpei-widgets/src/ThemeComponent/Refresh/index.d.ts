
import React, { Component } from 'react';


export class RefreshTarget {
    /**
     * ScrollView容器组件实例
     */
    source: React.Component
    /**
     * 手动开启刷新
     */
    start: Function
    /**
     * 关闭刷新
     */
    end: Function
}

export enum RefreshType {
    CustomType = 999,
    SystemType = 1000
}
/**
 * refresStatus:0 下拉以刷新 1 松开以刷新 2 刷新中
 * offsetY:下拉的距离 用于自定义刷新
 */
export declare type CreateRefreshView = (refresStatus: number, offsetY: number) => React.Component

/**
 * 自定义下拉组件
 */
export interface CustomHeaderProps {
    customRefreshView: CreateRefreshView
    customRefreshViewHeight: number
}

export interface RefreshOption {
    /**
     * 指定使用的是哪种类型
     */
    type?: RefreshType,
    /***
     * 指定下拉刷新后 调用的方法
     * 组件对象上的方法 默认为onRefresh(){}
     */
    onRefresh?: string,
    /**
     * 指定ScrollView 的props
     * 组件对象的某个属性
     */
    scrollViewProps?: string,
    /**
     * 针对type:SystemType
     * 针对下拉组件的props (RefreshControl)
     * 组件对象的某个属性 
     */
    refreshControlProps?: string,

    /***
     * 针对type CustomType 且需要自定义下拉组件
     * 
     * 指定组件的某个对象  （CustomHeaderProps）
     */
    customRefresh?: string
}

/**
Dome:
    class Page extends Component {
        constructor(ops) {
            super(ops)
            this.state = {}
            this.customRefresh = {
                customRefreshView:(refresStatus,offsetY)=>{
                    return (
                        <View style={{height:30,justifyContent:"center",alignItems:"center"}}>
                            <Text style  = {{height:30}}>
                                {offsetY}---{refresStatus}
                            </Text>
                        </View>
                    )
                },
                customRefreshViewHeight:30
            }
            //手动启动
            setTimeout(()=>{
                this.RefreshTarget.start()
            },10000)
        }
        onRefresh(){
            setTimeout(()=>{
                this.RefreshTarget.end()
            },10000)
        }
        @RefreshHeader({
            type:RefreshType.CustomType
        })
        //@RefreshHeader()
        @RefreshHeader({
            type:RefreshType.CustomType,
            customRefresh:"customRefresh"
        })
        render(){
            return (
                <View>
                    <Text></Text>
                </View>
            )
        }
    }
 */


/**
 * 修饰组件render方法
 * 会为组件增加下拉功能
 * 并未为该组件增加 RefreshTarget组件
 */
export declare type RefreshHeader = (option: RefreshOption) => Function