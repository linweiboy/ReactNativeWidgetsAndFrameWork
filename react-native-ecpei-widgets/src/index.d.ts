import * as React from "react";
import * as ReactNative from "react-native";
import {
    TouchableHighlightProperties,
    TouchableNativeFeedbackProperties,
    TouchableOpacityProperties,
    TouchableWithoutFeedbackProps
} from "react-native";
import { LargeList, LargeListPropType } from "react-native-largelist-v3";
import { SpringScrollViewPropType } from "react-native-spring-scrollview";
declare module "react-native-ecpei-widgets" {

    export interface CalculatorProps extends ReactNative.ViewProperties {
        /**
         * 初始数量
         */
        initCount: number;
        /**
         * 最小的数量
         */
        minCount: number;
        /***
        * 是否成倍数增加
        */
        doubly: Boolean;
        /**
         * 最大的数量
         */
        maxCount: number;

        /**
         * 点击减少按钮触发
         * args: 当前数量
         */
        onReduce?: (value: Number) => void;
        /**
         * 点击增加按钮触发
         * args: 当前数量
         */
        onIncrease?: (value: Number) => void;
    }
    //数量加减器
    export class Calculator extends React.Component<CalculatorProps, any> { }

    /**
     * 节流类型
     *  Throttle基于时间
     *  Debounce基于事件
     */
    export enum TouchableType {
        Throttle = "Throttle",
        Debounce = "Debounce"
    }
    /**
     * 节流基础Props
     */
    export interface ThrottleProps {
        /**
         * 节流参数 时间
         */
        throttleTime: number;
        /**
         * 类型参数
         * Throttle
         */
        type: TouchableType;
        /**
         * 是否开启节流
         */
        isThrottle: boolean;
        /**
         * 关于全局节流参数
         * default:false
         */
        startAppThrottle: boolean
    }
    export interface TouchableHighlightThrottleProps extends ThrottleProps, TouchableHighlightProperties { }
    export interface TouchableNativeFeedbackThrottleProps extends ThrottleProps, TouchableNativeFeedbackProperties { }
    export interface TouchableOpacityThrottleProps extends ThrottleProps, TouchableOpacityProperties { }
    export interface TouchableWithoutFeedbackThrottleProps extends ThrottleProps, TouchableWithoutFeedbackProps { }

    export interface TouchableHighlightThrottle extends ReactNative.TouchableHighlight<TouchableHighlightThrottleProps, Any> { }
    export interface TouchableNativeFeedbackThrottle extends ReactNative.TouchableNativeFeedback<TouchableNativeFeedbackThrottleProps, Any> { }
    export interface TouchableOpacityThrottle extends ReactNative.TouchableOpacity<TouchableOpacityThrottleProps, Any> { }
    export interface TouchableWithoutFeedbackThrottle extends ReactNative.TouchableWithoutFeedback<TouchableWithoutFeedbackThrottleProps, Any> { }




    export interface FlatData { }
    export interface FlatLayout {
        cellHeight: number,
        sepHeight: number
    }
    export type FlatGetItemLayout = (data: Array<FlatData>, row: Number) => FlatLayout;

    /***
     * 该组件适用于每一项高度固定 或者提前知道的情况下
     * 可以提交首屏加载速度，快速滚动没有白屏现象
     * 自定义Header | Footer
     * 上拉加载 | 下拉刷新
     * 自定义下拉 | 上拉刷新组件
     * doc:[url] https://bolan9999.github.io/react-native-largelist/#/zh-cn/V3/Refresh
     */
    export interface FlatListProps extends LargeListPropType {
        /***
         * 渲染cell ({index,item,section})=>UI
         * 替换 LargeListPropType.renderIndexPath
         */
        renderItem?: ({ index: number, item: FlatData, section: number }) => React.Component<any>;
        /**
         * 渲染的数据
         * [{},{},{}]
         * 替换 LargeListPropType.data 
         */
        data: Array<FlatData>;
        /***
         * 指定空列表时展现的组件 
         * 替换 LargeListPropType.renderEmpty
         */
        ListEmptyComponent?: React.Component<any>;
        /**
         * 单元格Separator
         * 需要在getItemLayout中指定高度
         */
        ItemSeparatorComponent?: React.Component<any>;

        /**
         * 指定 Header Cell 的高度
         * 必须
         * ()=>{
         *      cellHeight:11,
         *      sepHeight:2
         * }
         */
        getItemLayout: FlatGetItemLayout;

        /***
         * 渲染Header 
         * 替换 LargeListPropType.renderHeader
         */
        ListHeaderComponent?: React.Component<any>;
        /***
         * 渲染Footer
         * 替换 LargeListPropType.renderFooter
         */
        ListFooterComponent?: React.Component<any>;
        /***
         * 控制刷新时间
         */
        updateTimeInterval: Number;

        /**
         * 
         * 下拉加载
         */
        onRefresh?: Function;
        /**
         * 下拉刷新组件
         */
        refreshHeader?: React.Component;

        /**
         * 上拉加载组件
         */
        loadingFooter?: React.Component;
        /***
         * 数据是否加载完成。
         */
        allLoaded?: Boolean;
        /**
         * 触发上拉回调
         */
        onLoading?: Function
    }

    export class FlatList extends React.PureComponent<FlatListProps, any>{
        /**
         * 得到LargeList
         */
        getListRef: () => LargeList;
        /***
         * 滚动到指定位置
         */
        scrollToOffset: (offset: Number, animated?: Boolean) => Promise<void>;
        /**
         * 滚动到对应位置
         */
        scrollToItem: (params: { animated?: Boolean, item: FlatData }) => Promise<void>;
        /**
         * 滚动到对应index
         */
        scrollToIndex: (params: { index: Number, animated?: Boolean }) => Promise<void>;
        /***
         * 滚动到底部
         */
        scrollToEnd: (animated?: Boolean) => void;

        recordInteraction = () => { }
        flashScrollIndicators = () => { }

        /***
         * 关闭下拉加载
         */
        endRefresh: () => void;
        /**
         * 关闭上拉加载
         */
        endLoading: () => void;
    }


    export interface SectionItem { }
    export type RenderItemFac = ({ index: Number, item: SectionItem, section: Number }) => React.Component
    export interface SectionData {
        data: Array<SectionItem>,
        renderItem?: RenderItemFac
    }
    export interface SectionLayout extends FlatLayout {
        headerHeight: Number
    }
    export interface SectionListProps extends LargeListPropType {
        /***
     * 渲染cell ({index,item,section})=>UI
     */
        renderItem: RenderItemFac;
        /**
         * 渲染的数据
         * [{
         *  data:[],
         *  ...
         *  },{
         * 
         *  },{
         * 
         * }]
         */
        sections: Array<SectionData>;

        /***
         * 暂时没有
         */
        // SectionSeparatorComponent:
        // renderSectionFooter
        /***
         * 指定空列表时展现的组件 
         */
        ListEmptyComponent: React.Component;
        /**
         * 单元格Separator
         * 需要在getItemLayout中指定高度
         */
        ItemSeparatorComponent: React.Component;

        /**
         * 指定 Header Cell 的高度
         * 必须
         * ()=>{
         *      cellHeight:11,
         *      sepHeight:2,
         *      headerHeight:11
         * }
         * (data section row?)
         */
        getItemLayout: ({ data: SectionData, section: Number, row: Number }) => SectionLayout;

        /**
         * 渲染组头
         * (SectionData,section)=>UI
         */
        renderSectionHeader: (data: SectionData, section: Number) => React.Component;

        /***
         * 渲染Header 
         */
        ListHeaderComponent: React.Component;
        /***
         * 渲染Footer
         */
        ListFooterComponent: React.Component;

        /**
         * 
         * 下拉加载
         */
        onRefresh: () => void;
        /**
         * 下拉刷新组件
         */
        refreshHeader: React.Component;

        /**
         * 上拉加载组件
         */
        loadingFooter: React.Component;
        /***
         * 数据是否加载完成。
         */
        allLoaded: Boolean;
        /**
         * 触发上拉回调
         */
        onLoading: () => void;
    }
    /***
     * 该组件适用于每一项高度固定 或者提前知道的情况下
     * 可以提交首屏加载速度，快速滚动没有白屏现象
     * 自定义Header | Footer
     * 上拉加载 | 下拉刷新
     * 自定义下拉 | 上拉刷新组件
     * doc:[url] https://bolan9999.github.io/react-native-largelist/#/zh-cn/V3/Refresh
     */
    export class SectionList extends React.PureComponent<SectionListProps, any>{
        /**
     * 获取列表组件对象
     */
        getListRef: () => LargeList;
        /***
         * 滚动到指定位置
         */
        scrollToLocation: ({ animated: Boolean, itemIndex: Number, sectionIndex: Number }) => void;
        recordInteraction: Function;
        flashScrollIndicators: Function;

        /***
         * 关闭下拉加载
         */
        endRefresh: () => Promise<void>;
        /**
         * 关闭上拉加载
         */
        endLoading: () => Promise<void>;
    }
    export type Variables = any;
    export type Theme = (Variables) => any
    export class RypThemeClass {
        /***
         * 注册主题组件
         */
        registerComponent: (key: String, component: React.Component) => React.Component
        /***
         * 将 native-base Variables  与 自定义Variables 进行合并
         */
        integrationVariables: (nativeBase: Variables, ryp: Variables) => Variables;

        /**
         * 
         * @param baseTheme native-base主题
         * @param rytTheme 自定义的主题
         */
        integrationTheme(baseTheme: Theme, rytTheme: Theme): Theme
    }
    export const RypTheme: RypThemeClass;

    /***
     * 供应商 服务商 
     * Variables
     */
    export const SupplierVariables: Variables;
    export const ServiceVariables: Variables;
    /**
     * 供应商  服务商
     * Theme
     */
    export const ServiceTheme: Theme;
    export const SupplierTheme: Theme;


    export class ThemeComponnet<P, S> extends React.Component<P, S> { }

    export interface District {
        name: String;
        value: Number;
        parent: Number;
        code: String;
        grade: Number;
    }
    export interface City {
        name: String;
        value: Number;
        code: Number;
        grade: Number;
        parent: Number;
        children: District[]
    }
    export interface Province {
        name: String;
        value: Number;
        parent: Number;
        code: String;
        children: City[]
    }
    export interface AddressPickerProps extends ReactNative.ViewProperties {
        /***
         * 标题
         */
        Title?: String;
        /**
         * 底部容器样式
         */
        containerStyle?: Object | number;
        /***
         * 顶部 标题容器样式
         */
        titleContainerStyle?: Object | number;
        /**
         * 顶部 标题样式
         */
        titleStyle?: Object | number;
        /**
         * tool 栏容器样式
         */
        resultContainerStyle?: Object | number;
        /***
         * tool 选择结果样式 
         */
        resultTextStyle?: Object | number;
        /**
         * tool 默认文字
         */
        toolDefaultText?: String;
        /***
         * tool栏 当前选择的文字颜色
         */
        selectTextColor?: String;
        normalTextColor?: String;
        /**
         * 省份  城市 市区  选择容器样式
         */
        itemContainerStyle?: Object | number;
        /**
         * 省份  城市 市区  选择文字样式
         */
        itemTextStyle?: Object | number;
        /***
         * 点击背景隐藏
         */
        clickBkHidden?: Boolean;
        /**
         * 结果返回函数
         */
        onFinishSelect?: Function;
        /**
         * 全国数据
         */
        regions: Province[];
    }
    export class AddressPicker<AddressPickerProps, P> extends ThemeComponnet<AddressPickerProps, P>{ 
        show():void;
        close():void;
    }

    export interface IconProps {
        name: String;
        icon: String;
        size: Number;
    }
    export interface TextProps {
        title: String;
        style: Object | number;
    }
    export interface NavigationBarProps extends ReactNative.StatusBarProps {
        containerStyle?: Object | number;
        leftIconProps?: String | IconProps;
        leftTextProps?: String | TextProps;
        leftView?: () => React.Component

        centerView?: () => React.Component
        centerProps?: String | TextProps;

        rightTextProps?: String | TextProps;
        rightIconProps?: String | IconProps;
        rightView?: () => React.Component;
        /***
         * 点击 事件
         * 
         * 
         * 返回键 return true 阻止默认返回事件
         * 
         * 右侧 。。。
         */
        onNavBarPress?: ({ isRight: Boolean, tag: String }) => void | Boolean;
        //底部线条
        showShadow: any;
    }
    export class NavigationBar<NavigationBarProps, T> extends ThemeComponnet<NavigationBarProps, T>{ }
    export const NavigationHeight: Number;
}
