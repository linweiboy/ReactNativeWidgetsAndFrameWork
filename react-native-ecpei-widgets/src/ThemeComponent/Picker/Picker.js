import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    FlatList, ViewPropTypes, TextStyle
} from 'react-native';
import PropTypes from 'prop-types';
import { View, Text } from "native-base";
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../utils/Screen";
import { ModalContainer } from "../BaseModal";
import { ScrollPicker } from "./ScrollPicker";

import { RypTheme } from "../../RypTheme";

const STYLES = StyleSheet.create({
    TopViewCus: {
        width: SCALE_SIZE(88),
        height: SCALE_SIZE(88),
        justifyContent: 'center',
        alignItems: 'center',
    },
})
/**
 * ios 原生PickerView 样式
 */
class PickerView extends React.PureComponent {
    static contextTypes = {
        theme: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            data: this.props.data,
            showTopView: this.props.showTopView,
            showBottomView: this.props.showBottomView,
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.show != this.state.show || nextProps.data != this.state.data)
            this.setState({
                show: nextProps.show,
                data: nextProps.data
            });
    }

    _bottomView = () => {
        if (!this.state.showBottomView) return null;
        if (this.props.bottomView) return this.props.bottomView();
        return null;
    }
    _topView = () => {
        if (!this.state.showTopView) return null;
        if (this.props.topView) return this.props.topView();
        let variables = ((this.context.theme && this.context.theme["@@shoutem.theme/themeStyle"] && this.context.theme["@@shoutem.theme/themeStyle"].variables) || {}).rypVariables

        return (
            <View topView>
                <TouchableOpacityThrottle style={STYLES.TopViewCus} onPress={() => this._onPress(0)}>
                    <Text style={{ color: variables.PickerView_Top_Left_Text_Color }}>
                        {this.props.topTitles[0] || variables.PickerView_Top_Left_Text}
                    </Text>
                </TouchableOpacityThrottle>
                <TouchableOpacityThrottle style={STYLES.TopViewCus} onPress={() => this._onPress(1)}>
                    <Text style={{ color: variables.PickerView_Top_Right_Text_Color }}>
                        {this.props.topTitles[1] || variables.PickerView_Top_Right_Text}
                    </Text>
                </TouchableOpacityThrottle>
            </View>
        )
    }
    _renderItem = (item, index, isSelected) => {
        let variables = ((this.context.theme && this.context.theme["@@shoutem.theme/themeStyle"] && this.context.theme["@@shoutem.theme/themeStyle"].variables) || {}).rypVariables
        return (
            <View>
                <Text style={variables.Picker_Center_Item_Select_Text_Style}>{item.title}</Text>
            </View>
        )
    }
    _onPress = (index) => {
        let value = null;
        if (index == 1) value = this.sp.getSelected();
        this.props.onPress && this.props.onPress({ index, value })
    }
    scrollToIndex = (index) => {
        this.sp.scrollToIndex(2)
    }

    render() {
        let variables = ((this.context.theme && this.context.theme["@@shoutem.theme/themeStyle"] && this.context.theme["@@shoutem.theme/themeStyle"].variables) || {}).rypVariables
        return (
            <ModalContainer showModal={this.state.show} backgroundColor={"rgba(100,100,100,0.4)"}>
                <TouchableOpacityThrottle style={{ flex: 1 }}></TouchableOpacityThrottle>
                <View {...this.props}>
                    {
                        this._topView()
                    }
                    <View center style={{ height: variables.PickerView_Center_Height }}>
                        <ScrollPicker
                            ref={(sp) => { this.sp = sp }}
                            dataSource={this.state.data}
                            selectedIndex={this.props.selectedIndex}
                            itemHeight={variables.PickerView_Center_Item_Height}
                            wrapperHeight={variables.PickerView_Center_Height}
                            highlightColor={variables.PickerView_Center_Item_Hight_Color}
                            renderItem={this._renderItem}
                        />
                    </View>
                    {
                        this._bottomView()
                    }
                </View>
            </ModalContainer>
        )
    }
}
PickerView.defaultProps = {
    show: false,
    data: [
        {
            title: "1111",
        },
        {
            title: "2222",
        }
    ],
    showTopView: true,
    topTitles: ["取消", "确定"],
    showBottomView: true,
    selectedIndex: 0,
}
PickerView.propTypes = {
    showTopView: PropTypes.bool,//是否显示顶部制图
    topTitles: PropTypes.array,
    topView: PropTypes.func, //自定义顶部视图

    showBottomView: PropTypes.bool,//是否显示底部制图
    bottomView: PropTypes.func, //底部视图


    onPress: PropTypes.func,//点击事件 仅仅为默认顶部 底部视图 {index,value} 0:取消 1:确认 

    show: PropTypes.bool,//是否显示
    //默认选择的
    selectedIndex: PropTypes.number,
    data: PropTypes.any,//[{title}]
}
const ThemePickerView = RypTheme.registerComponent("NativeBase.RypPickerView", PickerView);

export {
    ThemePickerView as PickerView
}