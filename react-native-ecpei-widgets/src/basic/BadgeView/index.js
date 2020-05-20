/**
 * Created by tanlinwei
 *
 * Description:
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'native-base';
import { Text, View } from 'react-native';

export default class BadgeView extends React.Component {

    render() {
        const { fontSize, height, background, borderRadius, paddingHorizontal, textStr } = this.props;
        return (
            <View style={{ backgroundColor: background, height: height, borderRadius: borderRadius, paddingHorizontal: paddingHorizontal, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: fontSize, color: "white" }}>{textStr}</Text>
            </View>
        )
    }
}

BadgeView.defaultProps = {
    textStr: '22',
    background: 'white',
    fontSize: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    // height:30,
};

//标签，可以根据文本内容自动伸缩，定好标签高度，会自动切角
BadgeView.propTypes = {
    textStr: PropTypes.string.isRequired, //标签文字
    background: PropTypes.string.isRequired, //标签背景
    fontSize: PropTypes.number, //字体大小
    height: PropTypes.number, // 标签高度
}; 