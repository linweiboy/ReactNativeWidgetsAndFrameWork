import React, { Component, PureComponent } from "react";
import { View, StyleSheet } from "react-native";
// import { LargeList } from "react-native-largelist-v3";
import PropTypes from 'prop-types';

const STYLES = StyleSheet.create({
    container: {
        flex: 1
    }
})
/***
 * 默认cell高度
 */
const CELLHEIGHT = 44;

export class FlatList extends PureComponent {
    _list = null;
    constructor(props) {
        super(props)
        this.state = {
            dataSource: this._handelDataSource(this.props.data)
        }
    }
    componentWillReceiveProps(nextP) {
        if (nextP.data !== this.props.data) {
            this.setState({ dataSource: this._handelDataSource(nextP.data) })
        }
    }
    /**
     * 将数据转为 LargeList需要的数据结构
     */
    _handelDataSource = (data) => {
        return [{
            items: data
        }]
    }
    /*
    * 渲染 单元视图
    */
    _renderItem = (indexPath) => {
        if (__DEV__) {
            if (this.props.renderItem == null || typeof this.props.renderItem !== "function") {
                throw new Error("renderItem 是必须的 ()=>UI")
            }
        }
        let section = indexPath.section;
        let row = indexPath.row;
        let datas = this.state.dataSource[section].items
        let item = datas[row];
        let noShoeSpe = row == datas.length - 1;
        return (
            <View>
                {
                    this.props.renderItem && this.props.renderItem({ index: row, item, section })
                }
                {
                    noShoeSpe ? null : this.props.ItemSeparatorComponent
                }
            </View>
        )
    }
    /**
     * 得到单元格的高度
     */
    _heightForIndexPath = (indexPath) => {
        if (__DEV__) {
            if (this.props.getItemLayout == null || typeof this.props.getItemLayout !== "function") {
                console.warn("getItemLayout 是必须的 并且为函数")
                return CELLHEIGHT;
            }
        }
        let section = indexPath.section;
        let row = indexPath.row;
        let datas = this.state.dataSource[section].items;
        let layout = this.props.getItemLayout(datas, row);
        let cellConHei = layout.cellHeight || CELLHEIGHT;
        if (this.props.ItemSeparatorComponent) {
            return cellConHei + layout.sepHeight
        }
        return cellConHei
    }
    /**
     * 获取列表组件对象
     */
    getListRef = () => this._list;
    /***
     * 滚动到指定位置
     */
    scrollToOffset = (offset, animated) => {
        return this._list.scrollTo({ x: 0, y: offset }, animated)
    }
    /**
     * 滚动到对应位置
     */
    scrollToItem = ({ animated, item }) => {
        let _index = -1;
        for (let index = 0; index < this.state.dataSource.length; index++) {
            let _item = this.state.dataSource[0].items[index];
            if (_item == item) {
                _index = index;
                break;
            }
        }
        return this.scrollToIndex({ index: _index == -1 ? 0 : _index, animated })
    }
    /**
     * 滚动到对应index
     */
    scrollToIndex = ({ index, animated }) => {
        return this._list.scrollToIndexPath({ section: 0, row: index }, animated)
    }
    /***
     * 滚动到底部
     */
    scrollToEnd = (animated) => {
        return this._list.scrollToEnd(animated);
    }
    recordInteraction = () => { }
    flashScrollIndicators = () => { }

    /***
     * 关闭下拉加载
     */
    endRefresh = () => {
        return this._list.endRefresh()
    }
    /**
     * 关闭上拉加载
     */
    endLoading = () => {
        return this._list.endLoading();
    }
    render() {
        return null;
        return (
            <LargeList
                {...this.props}
                ref={ref => this._list = ref}
                style={[STYLES.container, this.props.style]}
                renderIndexPath={this._renderItem}
                renderEmpty={() => this.props.ListEmptyComponent}
                data={this.state.dataSource}
                heightForIndexPath={this._heightForIndexPath}
                renderFooter={() => this.props.ListFooterComponent}
                renderHeader={() => this.props.ListHeaderComponent}
                updateTimeInterval={this.props.updateTimeInterval}


                onRefresh={this.props.onRefresh}
                refreshHeader={this.props.refreshHeader}

                loadingFooter={this.props.loadingFooter}
                allLoaded={this.props.allLoaded}
                onLoading={this.props.onLoading}
            >

            </LargeList>
        )
    }

}
FlatList.defaultProps = {
    updateTimeInterval: 150,
    data: []
}
FlatList.propTypes = {
    /***
     * 渲染cell ({index,item,section})=>UI
     */
    renderItem: PropTypes.func,
    /**
     * 渲染的数据
     * [{},{},{}]
     */
    data: PropTypes.array.isRequired,
    /***
     * 指定空列表时展现的组件 
     */
    ListEmptyComponent: PropTypes.element,
    /**
     * 单元格Separator
     * 需要在getItemLayout中指定高度
     */
    ItemSeparatorComponent: PropTypes.element,

    /**
     * 指定 Header Cell 的高度
     * 必须
     * ()=>{
     *      cellHeight:11,
     *      sepHeight:2
     * }
     */
    getItemLayout: PropTypes.func.isRequired,

    /***
     * 渲染Header 
     */
    ListHeaderComponent: PropTypes.element,
    /***
     * 渲染Footer
     */
    ListFooterComponent: PropTypes.element,
    /***
     * 控制刷新时间
     */
    updateTimeInterval: PropTypes.number,

    /**
     * 
     * 下拉加载
     */
    onRefresh: PropTypes.func,
    /**
     * 下拉刷新组件
     */
    refreshHeader: PropTypes.any,

    /**
     * 上拉加载组件
     */
    loadingFooter: PropTypes.element,
    /***
     * 数据是否加载完成。
     */
    allLoaded: PropTypes.bool,
    /**
     * 触发上拉回调
     */
    onLoading: PropTypes.func
}