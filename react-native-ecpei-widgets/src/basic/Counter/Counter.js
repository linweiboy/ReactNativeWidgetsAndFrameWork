/*
 * @Creator: 谭林伟 
 * @Date: 2018-11-28 13:43:39 
 * @Last Modified by: 谭林伟
 * @Last Modified time: 2018-11-28 17:08:59
 * @Desc: 计数器
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import themeable from '../../utils/Themeable';

class Counter extends Component {
    static propTypes = {
        value: PropTypes.number,
        minValue: PropTypes.number,
        maxValue: PropTypes.number,
        defaultValue: PropTypes.number,
        step: PropTypes.number,
        onValueChange: PropTypes.func,
        styles: PropTypes.object,
    }

    static defaultProps = {
        maxValue: Infinity,
        minValue: -Infinity,
        defaultValue: 0,
        step: 1,
        value: undefined,
        styles: {},
        onValueChange: () => { },
    }

    static isValueInRange = ({ value, maxValue, minValue }) => {
        if (value !== undefined && (value > maxValue || value < minValue)) {
            throw Error('Counter: value is out of range')
        }
    }

    constructor(props) {
        super()

        const { defaultValue, value, minValue, maxValue } = props
        const values = [defaultValue, value]
        values.forEach(item => Counter.isValueInRange({ value: item, minValue, maxValue }))

        this.state = {
            count: props.defaultValue,
            isControlled: props.value !== undefined,
        }
    }

    onPress = (step) => {
        const currentValue = this.state.isControlled ? this.props.value : this.state.count
        const count = currentValue + step
        const isValidValue = step > 0 ?
            (count <= this.props.maxValue) :
            (count >= this.props.minValue)

        if (!isValidValue) {
            return false
        }

        if (!this.state.isControlled) {
            this.setState({ count })
        }

        return this.props.onValueChange(count)
    }

    onPressPlus = () => this.onPress(this.props.step)

    onPressMinus = () => this.onPress(-this.props.step)

    render() {
        const { styles } = this.props
        const value = this.state.isControlled ? this.props.value : this.state.count

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.onPressMinus} style={[styles.button, styles.leftButton]}>
                    <Text style={styles.buttonText}>
                        -
            </Text>
                </TouchableOpacity>
                <View style={styles.valueWrapper}>
                    <Text style={styles.value}>
                        {value}
                    </Text>
                </View>
                <TouchableOpacity onPress={this.onPressPlus} style={[styles.button, styles.rightButton]}>
                    <Text style={styles.buttonText}>
                        +
            </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const baseStyles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: 40,
      height: 40,
      borderWidth: 1,
      borderColor: 'gainsboro',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: 'aliceblue',
    },
    leftButton: {
      borderBottomLeftRadius: 3,
      borderTopLeftRadius: 3,
    },
    rightButton: {
      borderBottomRightRadius: 3,
      borderTopRightRadius: 3,
    },
    buttonText: {
      fontSize: 25,
      lineHeight: 25,
      textAlign: 'center',
      marginBottom: Platform.select({
        ios: 0,
        android: 5,
      }),
    },
    valueWrapper: {
      width: 80,
      height: 40,
      borderWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderColor: 'gainsboro',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
    },
    value: {
      fontSize: 25,
      textAlign: 'center',
    },
  })
  
  export default themeable(
    'Counter',
    baseStyles
  )(Counter)