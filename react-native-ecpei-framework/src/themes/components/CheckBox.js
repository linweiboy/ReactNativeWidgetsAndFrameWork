import { Platform } from 'react-native';
import _ from 'lodash';

import variable from './../variables/platform';


export default (variables = variable) => {
  const checkBoxTheme = {
      '.checked': {
        'NativeBase.Icon': {
          color: variables.checkboxTickColor,
          fontSize: 12,
          backgroundColor:"blue"
        },
        'NativeBase.IconNB': {
          color: variables.checkboxTickColor,
          fontSize: 12,
          backgroundColor:"red"
        },
      },
      'NativeBase.Icon': {
        color: 'transparent',
        lineHeight: 12,
        marginTop: -2,
        fontSize: 14,
      },
      'NativeBase.IconNB': {
        color: 'transparent',
        lineHeight: 14,
        marginTop: -2,
        fontSize: 14,
      },
      borderRadius: variables.CheckboxRadius,
      overflow: 'hidden',
      width: 14,
      height: 14,
      borderWidth: 1,
      paddingLeft: 1,
      left: 10,

  };


  return checkBoxTheme;
};
