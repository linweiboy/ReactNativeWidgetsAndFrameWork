import React, { Component, PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Modal, StatusBar, TextInput, Text, View, ScrollView, Image
} from 'react-native';
import PropTypes from 'prop-types';
import { TouchableOpacityThrottle } from "../Button/TouchableThrottle";
import { scaleSize as SCALE_SIZE, ScreenW as SCREEN_W, ScreenH as SCREEN_H } from "../../utils/Screen";
import { RypTheme } from "../../RypTheme";
import { BasePopup } from "./basePopup";
import { AlertPopupView } from "./AlertPopup";
import { MenuPopup, MenuType } from "./MenuPopup";
import { StatusPopup, StatusPopupOptions, StatusPopupType } from "./business/StatusPopup";
import { UIPlugin, UIPluginManager } from "react-native-ecpei-framework";

export class PopupContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            popup: null,
            touchBkHidden: false,
            androidBackHidden: false,
            backgroundColor: this.props.backgroundColor,
            PopupProps: null
        }
    }
    /**
     * 
     * @param {*} PopupProps 
     */
    show(PopupProps = PopupType.Type2, touchBkHidden = false, androidBackHidden = true, props = {}) {
        if (PopupProps._type == "AlertPopupView") {
            this.setState({
                showModal: true,
                touchBkHidden,
                androidBackHidden,
                popup: (
                    <AlertPopupView ref={(_) => this.popup = _} {...PopupProps} onPress={(...args) => {
                        if (PopupProps.onPress) {
                            let result = PopupProps.onPress(...args)
                            if (!result)
                                this.setState({ showModal: false });
                            return result
                        } else {
                            this.setState({ showModal: false })
                        }

                    }}></AlertPopupView>
                ),
                backgroundColor: props.backgroundColor || this.props.backgroundColor,
                PopupProps
            })
        } else if (PopupProps._type == "MenuPopup") {
            this.setState({
                showModal: true,
                touchBkHidden,
                androidBackHidden,
                popup: (
                    <MenuPopup ref={(_) => this.popup = _}  {...PopupProps} onPress={(...args) => {
                        if (PopupProps.onPress) {
                            let result = PopupProps.onPress(...args)
                            if (!result)
                                this.setState({ showModal: false });
                            return result
                        } else {
                            this.setState({ showModal: false })
                        }

                    }}></MenuPopup>
                ),
                backgroundColor: props.backgroundColor || this.props.backgroundColor,
                PopupProps
            })
        } else if (PopupProps._type == StatusPopupOptions._type) {
            this.setState({
                showModal: true,
                touchBkHidden,
                androidBackHidden,
                popup: (
                    <StatusPopup ref={(_) => this.popup = _}  {...PopupProps} onPress={(...args) => {
                        if (PopupProps.onPress) {
                            let result = PopupProps.onPress(...args)
                            if (!result)
                                this.setState({ showModal: false });
                            return result
                        } else {
                            this.setState({ showModal: false })
                        }
                    }}>
                    </StatusPopup>
                ),
                backgroundColor: props.backgroundColor || this.props.backgroundColor,
                PopupProps
            })
        }
    }
    closePopup() {
        this.setState({ showModal: false })
    }
    backClick = () => {
        if (this.state.PopupProps && this.state.PopupProps.bkClick && typeof this.state.PopupProps.bkClick == "function") {
            this.state.PopupProps.bkClick(this.popup)
        }
        if (this.state.touchBkHidden) { this.setState({ showModal: false }); }
    }
    render() {
        if (this.state.showModal)
            return (
                <View >
                    <StatusBar backgroundColor={this.state.backgroundColor}></StatusBar>
                    <Modal
                        animationType={"none"}
                        transparent={true}
                        visible={this.state.showModal}
                        onRequestClose={() => {
                            if (this.state.androidBackHidden)
                                this.setState({ showModal: false });
                        }}
                    >
                        <TouchableOpacityThrottle activeOpacity={1} style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: this.state.backgroundColor,
                        }} onPress={() => this.backClick()}
                        >
                            {
                                this.state.popup
                            }

                        </TouchableOpacityThrottle>
                    </Modal>
                </View>
            )
        {/* <AlertPopupView></AlertPopup> */ }
        return null;
    }
}

PopupContainer.defaultProps = {
    backgroundColor: "rgba(100,100,100,0.4)",
    // touchBkHidden: false
}

PopupContainer.propTypes = {
    backgroundColor: PropTypes.string,
    // touchBkHidden: PropTypes.bool
}

class PopupContainerUIPlugin extends UIPlugin {
    name = "PopupContainerPlugin";
    component = PopupContainer
    constructor() {
        super()
    }
    emit(data) {
        let instance = UIPluginManager.getPluginInstance(this.name);
        if (data.close == true) {
            instance.closePopup()
        } else {
            instance.show(data.options, data.touchBkHidden, data.androidBackHidden, data.props)
        }
        return true
    }
}

UIPluginManager.addPlugin(new PopupContainerUIPlugin())


export const PopupType = {
    Type3: {
        _type: "AlertPopupView",
        Title: "标题",
        TitleStyle: {
            textAlign: 'center',
        },
        style: {
            borderRadius: SCALE_SIZE(24),
            backgroundColor: "white",
            width: SCALE_SIZE(560),
            height: SCALE_SIZE(280),
            overflow: 'hidden',
        },

        buttonOptions: [
            {
                title: "确定",
                containerStyle: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                // titleStyle: {
                //     fontFamily: 'PingFangSC-Regular',
                //     fontSize: SCALE_SIZE(36),
                //     color: "#FE4B3A"
                // }
            },
        ],
        // BottomContainerStyle:{
        //     height: SCALE_SIZE(100),
        //     flexDirection: 'row',
        //     borderTopColor: "#E5E5E5",
        //     borderTopWidth: SCALE_SIZE(1),
        // },
        // topContainerStyle:{ justifyContent: 'center', alignItems: 'center', },
        onPress: null,
    },
    Type2: {
        _type: "AlertPopupView",
        Title: "标题",
        TitleStyle: {
            textAlign: 'center',
        },
        style: {
            borderRadius: SCALE_SIZE(24),
            backgroundColor: "white",
            width: SCALE_SIZE(560),
            height: SCALE_SIZE(280),
            overflow: 'hidden',
        },

        buttonOptions: [
            {
                title: "取消",
                containerStyle: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                // titleStyle: {
                //     fontFamily: 'PingFangSC-Regular',
                //     fontSize: SCALE_SIZE(36),
                // }
            },
            {
                title: "确定",
                containerStyle: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderLeftWidth: SCALE_SIZE(1),
                    borderLeftColor: "#E5E5E5",
                },
                // titleStyle: {
                //     fontFamily: 'PingFangSC-Regular',
                //     fontSize: SCALE_SIZE(36),
                //     color: "#FE4B3A"
                // }
            },
        ],
        // BottomContainerStyle:{
        //     height: SCALE_SIZE(100),
        //     flexDirection: 'row',
        //     borderTopColor: "#E5E5E5",
        //     borderTopWidth: SCALE_SIZE(1),
        // },
        // topContainerStyle:{ justifyContent: 'center', alignItems: 'center', },
        onPress: null,
    },
    Type1: {
        _type: "AlertPopupView",
        Title: "抱歉，您的查询次数已用完!\n分享给朋友可以继续\n免费查询哦！",
        TitleStyle: {
            textAlign: 'center',
            lineHeight: SCALE_SIZE(44),
        },
        style: {
            borderRadius: SCALE_SIZE(24),
            backgroundColor: "white",
            width: SCALE_SIZE(560),
            height: SCALE_SIZE(407),
            overflow: 'hidden',
        },

        buttonOptions: [
            {
                title: "取消",
                containerStyle: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                // titleStyle: {
                //     fontFamily: 'PingFangSC-Regular',
                //     fontSize: SCALE_SIZE(36),
                //     color: "#000000"
                // }
            },
            {
                title: "分享给朋友",
                containerStyle: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderLeftWidth: SCALE_SIZE(1),
                    borderLeftColor: "#E5E5E5",
                    backgroundColor: "#3F50F3"
                },
                // titleStyle: {
                //     fontFamily: 'PingFangSC-Regular',
                //     fontSize: SCALE_SIZE(36),
                //     color: "white"
                // }
            },
        ],
        // BottomContainerStyle:{
        //     height: SCALE_SIZE(100),
        //     flexDirection: 'row',
        //     borderTopColor: "#E5E5E5",
        //     borderTopWidth: SCALE_SIZE(1),
        // },
        // topContainerStyle:{ justifyContent: 'center', alignItems: 'center', },
        onPress: null,
    },
    Type4: {//样式4  带有输入框
        _type: "AlertPopupView",
        Title: "标题",
        TitleStyle: {
            textAlign: 'center',
        },
        buttonOptions: [
            {
                title: "取消",
                containerStyle: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                titleStyle: { color: "#8E8E93" }
            },
            {
                title: "保存",
                containerStyle: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderLeftWidth: SCALE_SIZE(1),
                    borderLeftColor: "#E5E5E5",
                    backgroundColor: "#4D78E7",
                },
                titleStyle: { color: "white" }
            }
        ],
        style: {
            borderRadius: SCALE_SIZE(24),
            backgroundColor: "white",
            width: SCALE_SIZE(550),
            height: SCALE_SIZE(345),
            overflow: 'hidden',
        },
        textInputProps: {
            placeholder: "",
            underlineColorAndroid: "transparent",
            maxLength: 20
        },
        customViews: (target) => {
            let textInputProps = {
                placeholder: "",
                underlineColorAndroid: "transparent",
                maxLength: 20,
                ...target.props.textInputProps
            }
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: SCALE_SIZE(20) }}>
                    <TextInput ref="input" style={{
                        height: SCALE_SIZE(80),
                        paddingHorizontal: SCALE_SIZE(34),
                        borderWidth: 0.5,
                        borderColor: '#abc',
                        fontSize: 15,
                        width: "100%",
                        marginBottom: SCALE_SIZE(40)
                    }}
                        {...textInputProps}
                    />
                </View>
            )
        }
    },
    Type5: {//样式5 内容滚动视图
        _type: "AlertPopupView",
        Title: "品质",
        TitleStyle: {
            textAlign: 'center',
        },
        buttonOptions: [
            {
                title: "我知道了",
                containerStyle: {
                    backgroundColor: "#FFFFFF",
                },
                titleStyle: { color: "#4D78E7" }
            }
        ],
        style: {
            borderRadius: SCALE_SIZE(24),
            backgroundColor: "white",
            width: SCALE_SIZE(560),
            height: SCALE_SIZE(692),
            overflow: 'hidden',
        },
        subViewStyle: {
            titleStyle: {
                fontFamily: "PingFang-SC-Medium",
                fontSize: SCALE_SIZE(28),
                color: "#333333",
                lineHeight: SCALE_SIZE(40)
            },
            subTitleStyle: {
                fontFamily: "PingFang-SC-Regular",
                fontSize: SCALE_SIZE(26),
                color: "#666666",
                lineHeight: SCALE_SIZE(40)
            },
            containerStyle: {

            }
        },
        content: [
            {
                title: "",
                subTitle: "    由主机厂提供或认可，通过4S店的销售渠道，流入到汽配市场的配件，可以使用主机厂商标或其认可的商标，带有4S店包装的配件。"
            },
            {
                title: "",
                subTitle: "    由主机厂提供或认可，通过4S店的销售渠道，流入到汽配市场的配件，可以使用主机厂商标或其认可的商标，带有4S店包装的配件。"
            },
            {
                title: "",
                subTitle: "    由主机厂提供或认可，通过4S店的销售渠道，流入到汽配市场的配件，可以使用主机厂商标或其认可的商标，带有4S店包装的配件。"
            },
            {
                title: "",
                subTitle: "    由主机厂提供或认可，通过4S店的销售渠道，流入到汽配市场的配件，可以使用主机厂商标或其认可的商标，带有4S店包装的配件。"
            },
            {
                title: "",
                subTitle: "    由主机厂提供或认可，通过4S店的销售渠道，流入到汽配市场的配件，可以使用主机厂商标或其认可的商标，带有4S店包装的配件。"
            }
        ],
        customViews: (target) => {
            let styles = target.props.subViewStyle;
            let content = target.props.content;
            return (
                <View style={[{ height: SCALE_SIZE(493), backgroundColor: "white" }, styles.containerStyle]}>
                    <ScrollView style={{ height: SCALE_SIZE(493), paddingHorizontal: SCALE_SIZE(48) }}>
                        <TouchableOpacityThrottle activeOpacity={1}>
                            {
                                content.map((item) => {
                                    return [
                                        (item.title ? <Text key={"title"} style={styles.titleStyle}>{item.title}</Text> : null),
                                        (item.subTitle ? <Text key={"subTitle"} style={styles.subTitleStyle}>{item.subTitle}</Text> : null)
                                    ]
                                })
                            }
                        </TouchableOpacityThrottle>
                    </ScrollView>
                </View>
            )
        }
    },
    Type6: { //带有副标题的
        _type: "AlertPopupView",
        Title: "您提交的资料未审核通过!",
        TitleStyle: {
            textAlign: 'center',
            lineHeight: SCALE_SIZE(44),
            fontSize: SCALE_SIZE(36),

        },
        topContainerStyle: {
            justifyContent: 'flex-end',
        },
        style: {
            borderRadius: SCALE_SIZE(24),
            backgroundColor: "white",
            width: SCALE_SIZE(560),
            height: SCALE_SIZE(290),
            overflow: 'hidden',
        },

        buttonOptions: [
            {
                title: "取消",
            },
            {
                title: "分享给朋友",
            },
        ],
        subTitle: "subTitleAA",
        subTitleStyle: {
            fontFamily: "PingFangSC-Regular",
            fontSize: SCALE_SIZE(30),
            color: "#888888",
        },
        customViews: (target) => {
            let tStyle = [
                // {
                //     fontFamily: "PingFangSC-Regular",
                //     fontSize: SCALE_SIZE(30),
                //     color: "#888888",
                // },
                target.props.subTitleStyle
            ]
            return (
                <View style={{ height: SCALE_SIZE(100), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={tStyle}>
                        {target.props.subTitle}
                    </Text>
                </View>
            )
        },
        onPress: null,
    },
    get Type7() {
        return {
            ...this.Type5,
            style: {
                ...this.Type5.style,
                backgroundColor: "rgba(1,1,1,0)",
                height: SCALE_SIZE(788)
            },
            topContainerStyle: {
                backgroundColor: "white",
            },
            subViewStyle: {
                ...this.Type5.contentTitleStyles,
                containerStyle: {
                    borderBottomLeftRadius: SCALE_SIZE(24),
                    borderBottomRightRadius: SCALE_SIZE(24),
                    overflow: 'hidden',
                    height: SCALE_SIZE(591),
                    paddingBottom: SCALE_SIZE(20),
                }
            },
            BottomContainerStyle: {
                // borderTopColor: "red",
                borderTopWidth: 0,
                backgroundColor: "rgba(1,1,1,0)"
            },
            customBottomView: (target) => {
                return (
                    <View style={{ alignItems: 'center', width: "100%" }}>
                        <TouchableOpacityThrottle style={{ height: "100%" }} onPress={target.props.onPress}>
                            <Image resizeMode={"stretch"} style={{ height: "100%" }} source={require("./business/images/window_close_btn.png")}></Image>
                        </TouchableOpacityThrottle>
                    </View>
                )
            }
        }
    }
}