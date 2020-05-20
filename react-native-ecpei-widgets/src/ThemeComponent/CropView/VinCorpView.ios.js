
import React, { Component,/**PropTypes*/ } from 'react';
import PropTypes from 'prop-types';
import { processColor, ColorPropType, StyleSheet } from 'react-native';
import { requireNativeComponent, NativeModules, findNodeHandle } from 'react-native';

const SourceView = requireNativeComponent("HCorpView", VinCorpView);
const { HCorpViewManager, UIManager } = NativeModules;

import { scaleSize as SCALE_SIZE } from "../../utils/Screen";

const STYLES = StyleSheet.create({
    container: { backgroundColor: "black", }
})

export class VinCorpView extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    rotationImage() {
        HCorpViewManager.rotationImage(findNodeHandle(this.refs.SourceView), 90, true)
    }
    getCropImage() {
        return new Promise((resolve, reject) => {
            HCorpViewManager.getCropImage(findNodeHandle(this.refs.SourceView), (res) => {
                resolve(res)
            })
        })

    }
    render() {
        return (
            <SourceView ref="SourceView"
                style={[STYLES.container, this.props.style]}
                cropSize={this.props.cropSize}
                image={this.props.source}
                lineColor={this.props.lineColor}
            >
            </SourceView>
        )
    }

}

VinCorpView.defaultProps = {
    //裁剪的大小 
    //居中
    cropSize: { width: 300, height: 44 },
    //裁剪框四角线的颜色
    lineColor: "red",
    //裁剪框四角线的Size
    cropLineSize: { width: SCALE_SIZE(47), height: SCALE_SIZE(10) }
}