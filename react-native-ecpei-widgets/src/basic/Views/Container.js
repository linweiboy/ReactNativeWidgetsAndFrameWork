/**
 * Created by tanlinwei
 *
 * Description:  统一背景视图（最底层的background）
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { screenH, screenW } from '../../library/appScreen';
import { Container as ContainerView } from 'native-base';
import SafeAreaView from "react-native-safe-area-view";
export default class Container extends Component {
    render() {
        return (
            <ContainerView style={[styles.container]} >
                <SafeAreaView style={[styles.SafeAreaView, this.props.style]} forceInset={{ top: 'never', bottom: "always" }}>
                    <View style={[styles.container,this.props.contentStyle]}>
                        {this.props.children}
                    </View>
                </SafeAreaView>
            </ContainerView>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
        flex: 1,
    },
    SafeAreaView: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0)"
    }
});
