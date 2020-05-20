/**
 * Created by tanlinwei
 *
 * Description:表格组件
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class FormView extends Component {

    constructor(props) {
        super(props);
    }

    formLayout() {
        const { texts } = this.props;
        return (
            texts.map((element,index)=>{
                return(
                <View style={element.style} key={index}>
                <Text style={element.textStyle}>{element.title}</Text>
                    </View>
                )
            })
        );

    }

    render() {
        const { style,texts } = this.props;
        return (
            <View style={[styles.containterStyle, style]}>
            {
                this.formLayout()
            }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containterStyle: {
        flexDirection: 'row',
        borderColor: '#b7b7b7', //边框颜色
        borderWidth: 0.5, //边框宽度
        width:300,
        height:50,
    }
});

FormView.defaultProps = {
    texts: [{
        style: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRightWidth: 0.5,
            borderRightColor: '#b7b7b7',
            flex: 0.25,
        },
        title: '商品规格',
        textStyle: {
            fontSize: 15,
            color: '#000',
        }
    },
    {
        style: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRightWidth: 0.5,
            borderRightColor: '#b7b7b7',
            flex: 0.75,
        },
        title: 'DSGHHBCUUIHDBGFH',
        textStyle: {
            fontSize: 15,
            color: '#000',
        }
    }

    ],

};

FormView.propTypes = {
    style: PropTypes.object,
    texts: PropTypes.array,
};