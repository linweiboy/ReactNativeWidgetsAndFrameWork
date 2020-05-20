
import React, { Component } from "react";
import { Animated, View, Text, BackHandler } from "react-native";
import PropTypes from 'prop-types';



export const AnimatedType = {
    Fade: "Fade",
    NotAnimate: "NotAnimate"
}

export default class DisplayAnimated extends Component {
    oldIsShow = null;
    animating = false;
    isShowUpdate = false;
    constructor(props) {
        super(props);
        this.state = Object.assign({
            disabled: true,
            opacityValue: new Animated.Value(this.props.isShow ? (this.props.animatedType == AnimatedType.NotAnimate ? 1 : 0) : 0)
        }, { disabled: this.props.isShow });
    }

    static propTypes = {
        isShow: PropTypes.bool,
        animatedType: PropTypes.string,
        fadeInDuration: PropTypes.number,
        fadeOutDuration: PropTypes.number,
        onClosed: PropTypes.func
    }

    static defaultProps = {
        isShow: false,
        animatedType: AnimatedType.NotAnimate,
        fadeInDuration: 500,
        fadeOutDuration: 500,
        onClosed: () => { }
    }

    baseShow() {
        this.setState({ disabled: true });
        this.oldIsShow = true;
    }

    baseHide() {
        this.setState({ disabled: false });
        this.oldIsShow = false;
        this.props.onClosed && this.props.onClosed();
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("ceshi.shouldComponentUpdate1", nextProps.isShow, this.props.isShow);
        if (nextProps.isShow != this.props.isShow) {
            this.isShowUpdate = true;
            // return false;
            // console.log("ceshi.shouldComponentUpdate2", true);
        } else {
            this.isShowUpdate = false;
        }
        return true;
    }

    ShowStatusChange() {
        let that = this;
        // if (that.animating) return;
        // console.log("ceshi.ShowStatusChange1", this.oldIsShow);
        console.log("ceshi.ShowStatusChange1.isShow", this.props.isShow);
        if ((this.props.isShow)) {
            if (that.props.animatedType == AnimatedType.Fade) {
                that.animatedShow();
            } else
                that.baseShow();
        } else if ((!this.props.isShow)) {
            if (that.props.animatedType == AnimatedType.Fade) {
                that.animatedHide();
            } else
                that.baseHide();
        }
    }

    animatedHide() {
        let that = this;
        that.animating = true;
        Animated.timing(that.state.opacityValue, { toValue: 0, duration: that.props.fadeOutDuration }).start(() => {
            that.baseHide();
            that.animating = false;
            // that.destroySibling();
        });
    }

    animatedShow() {
        let that = this;
        that.animating = true;
        that.baseShow();
        Animated.timing(that.state.opacityValue, { toValue: 1, duration: that.props.fadeInDuration }).start(() => {
            console.log("ceshi2", that.oldIsShow);
            that.props.onShowed && that.props.onShowed(that);
            that.animating = false;
        });
    }


    componentWillMount() {
        // console.log("ceshi==========", this.props.isShow);
        this.ShowStatusChange();
        if (this.props.onRequestClose)
            this.listenerBackHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                // alert(this.state.disabled);
                if (!this.state.disabled) return false;
                let _colse = false;
                if (typeof this.props.onRequestClose === "boolean") {
                    _colse = this.props.onRequestClose;
                } else if (typeof this.props.onRequestClose === "function") {
                    _colse = this.props.onRequestClose && this.props.onRequestClose();
                }
                if (_colse == true) {
                    this.animatedHide();
                    return true;
                }
                return false;
            });
    }

    componentWillUnmount() {
        this.listenerBackHandler && this.listenerBackHandler.remove();
    }

    componentDidUpdate() {
        if (this.isShowUpdate) {
            this.ShowStatusChange();
        }
        // console.log("ceshi.componentDidUpdate", this.props.isShow);
    }

    componentWillReceiveProps(props) {
        // console.log("ceshi.componentWillReceiveProps", props.isShow);
        // this.ShowStatusChange();
    }

    render() {
        // console.log("ceshi.render是是是", this.props.disabled);

        return this.state.disabled ? (
            <View pointerEvents={this.props.pointerEvents} style={[{ flex: 1 }, this.props.style]} >
                <Animated.View style={[{ flex: 1 }, { opacity: this.state.opacityValue }]}>
                    {this.props.children && this.props.children}
                </Animated.View>
            </View>
        ) : null
    }

}

