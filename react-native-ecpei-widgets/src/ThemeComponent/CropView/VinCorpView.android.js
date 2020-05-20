
import React, { Component,/**PropTypes*/ } from 'react';
import PropTypes from 'prop-types';
import { processColor, ColorPropType, StyleSheet } from 'react-native';
import { requireNativeComponent, NativeModules, findNodeHandle } from 'react-native';
const SourceView = requireNativeComponent("HCropView", VinCorpView);
const { UIManager } = NativeModules;
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
        UIManager.dispatchViewManagerCommand(findNodeHandle(this.refs['SourceViews']), 100, [270]);
    }
    getCropImage() {
        UIManager.dispatchViewManagerCommand(findNodeHandle(this.refs['SourceViews']), 101, null);
    }

    render() {
        return (
            <SourceView ref="SourceViews"
                style={[STYLES.container,this.props.style]}
                cropSize={this.props.cropSize}
                setImageValue ={ this.props.sourceAndroid || "" }
                lineColor={this.props.lineColor}
                cropLineSize={ this.props.cropLineSize }
            >
            </SourceView>
        )
    }

}

VinCorpView.defaultProps = {
    //裁剪的大小 
    //居中
    cropSize: { width: SCALE_SIZE(600), height: SCALE_SIZE(150) },
    //裁剪框四角线的颜色
    lineColor: "red",
    //裁剪框四角线的Size
    cropLineSize: { width: SCALE_SIZE(47), height: SCALE_SIZE(10) }
}