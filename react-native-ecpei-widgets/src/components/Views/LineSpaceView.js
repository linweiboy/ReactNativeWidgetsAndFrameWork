import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

export default class LineSpaceView extends Component {
    render() {
        return (
            <View  style={[styles.lineStyle,this.props.style]}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    lineStyle:{
        backgroundColor:'#EFEFF4',
        height: 1,
    }
});

