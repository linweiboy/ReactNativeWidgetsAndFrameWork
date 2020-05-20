import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Theme from "../../library/base-theme";

const STYLES = StyleSheet.create({
    container: {
        height: Theme.navHeight,
        backgroundColor: "white",
    },
    shadow: {
        borderBottomWidth: 0.5,
        borderColor: "rgb(204, 204, 204)"
    }
})

export class BarContainer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={[STYLES.container, this.props.style, this.props.showShadow === undefined ? {} : STYLES.shadow]}>
                {
                    this.props.children
                }
            </View>
        )
    }
}