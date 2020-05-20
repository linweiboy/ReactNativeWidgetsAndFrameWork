/**
 * Created by tanlinwei
 *
 * Description:  进度条
 */

import React, { Component } from 'react';
import { ProgressBarAndroid,ProgressViewIOS,Platform } from 'react-native';

export default class ProgressBar extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        if(Platform.OS === "android"){
            return (
                <ProgressBarAndroid
                  {...this.props}
                  styleAttr="Horizontal"
                  indeterminate={false}
                  progress={this.props.progress ? this.props.progress / 100 : 0.5}
                  color={this.props.color ? this.props.color : '#FFF'}
                />
              );
        }else{
            return (
                <ProgressViewIOS
                  {...this.props}
                  progress={this.props.progress ? this.props.progress / 100 : 0.5}
                  progressTintColor={this.props.color ? this.props.color : '#FFF'}
                  trackTintColor='rgba(255,255,255,0.5)'
                />
              );
        }
      
    }
  
  }
