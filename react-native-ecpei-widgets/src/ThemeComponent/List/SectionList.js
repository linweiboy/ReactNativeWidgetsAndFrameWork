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
const HEADERHEIGHT = 0;

export class SectionList extends PureComponent {
    _list = null;
    constructor(props) {
        super(props)
        this.state = {
            dataSource: this._handelDataSource(this.props.sections)
        }
    }
    componentWillReceiveProps(nextP) {
        if (nextP.sections !== this.props.sections) {
            this.setState({ dataSource: this._handelDataSource(nextP.sections) })
        }
    }
    /**
     * 将数据转为 LargeList需要的数据结构
     */
    _handelDataSource = (data) => {
        return data.map((item) => {
            let _data = item.data;
            return {
                ...item,
                get items() {
                    return item.data || []
                }
            }
        })
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
        let group = this.state.dataSource[section];
        let datas = group.items;
        let item = datas[row];
        let noShoeSpe = row == datas.length - 1;
        let renderItem = group.renderItem || this.props.renderItem;
        return (
            <View>
                {
                    renderItem && renderItem({ index: row, item, section })
                }
                {
                    noShoeSpe ? null : this.props.ItemSeparatorComponent
                }
            </View>
        )
    }
    /**
     * 渲染组头
     */
    _renderSectionHeader = (section) => {
        if (this.props.renderSectionHeader) {
            return (
                <View>
                    {
                        this.props.renderSectionHeader(this.props.sections[section], section)
                    }
                </View>
            );
        }
        return <View></View>;
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
        let datas = this.props.sections[section];
        let layout = this.props.getItemLayout(datas, section, row);
        let cellConHei = layout.cellHeight || CELLHEIGHT;
        if (this.props.ItemSeparatorComponent) {
            return cellConHei + layout.sepHeight
        }
        return cellConHei
    }
    /***
     * 得到Section Header
     */
    _heightForSection = (section) => {
        if (__DEV__) {
            if (this.props.getItemLayout == null || typeof this.props.getItemLayout !== "function") {
                console.warn("getItemLayout 是必须的 并且为函数")
                return CELLHEIGHT;
            }
        }
        let datas = this.state.dataSource[section].items;
        return this.props.getItemLayout(datas, section).headerHeight || HEADERHEIGHT;
    }
    /**
     * 获取列表组件对象
     */
    getListRef = () => this._list;
    /***
     * 滚动到指定位置
     */
    scrollToLocation = ({ animated, itemIndex, sectionIndex }) => {
        let ht = 0;
        try {
            let sectionCount = sectionIndex < this.props.sections.length ? sectionIndex : this.props.sections.length - 1;
            for (let _sectionIndex = 0; _sectionIndex < sectionCount; _sectionIndex++) {
                let group = this.props.sections[_sectionIndex];
                ht += this.props.getItemLayout(group, _sectionIndex, 0).headerHeight || 0;
                for (let _itemIndex = 0; _itemIndex < group.data.length; _itemIndex++) {
                    let layout = this.props.getItemLayout(group, _sectionIndex, _itemIndex);
                    let cellHeight = layout.cellHeight || 0;
                    let sepHeight = layout.sepHeight || 0;
                    ht += cellHeight;
                    if (_itemIndex != group.data.length - 1) {
                        ht += sepHeight;
                    }
                }
            }
            let group = this.props.sections[sectionCount] || [];
            let itemCount = itemIndex < group.data.length ? itemIndex : group.data.length -1 ;
            for (let _itemIndex = 0; _itemIndex < itemCount; _itemIndex++) {
                let layout = this.props.getItemLayout(group, sectionIndex, _itemIndex);
                let cellHeight = layout.cellHeight || 0;
                let sepHeight = layout.sepHeight || 0;
                ht += cellHeight;
                if (_itemIndex != group.data.length - 1) {
                    ht += sepHeight;
                }
            }
            return this._list.scrollTo({ x: 0, y: ht }, animated);
        } catch (error) {
            console.warn(error)
        }
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

                heightForSection={this._heightForSection}
                renderSection={this._renderSectionHeader}

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
SectionList.defaultProps = {
    sections: []
}
SectionList.propTypes = {
    /***
     * 渲染cell ({index,item,section})=>UI
     */
    renderItem: PropTypes.func,
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
    sections: PropTypes.array.isRequired,

    /***
     * 暂时没有
     */
    // SectionSeparatorComponent:
    // renderSectionFooter
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
     *      sepHeight:2,
     *      headerHeight:11
     * }
     * (data section row?)
     */
    getItemLayout: PropTypes.func.isRequired,

    /**
     * 渲染组头
     * (SectionData,section)=>UI
     */
    renderSectionHeader: PropTypes.func,

    /***
     * 渲染Header 
     */
    ListHeaderComponent: PropTypes.element,
    /***
     * 渲染Footer
     */
    ListFooterComponent: PropTypes.element,

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