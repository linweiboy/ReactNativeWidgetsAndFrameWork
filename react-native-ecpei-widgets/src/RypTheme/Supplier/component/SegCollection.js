import _ from 'lodash';
import { Platform } from 'react-native';

export default (variables) => {
    const platformStyle = variables.platformStyle;
    const platform = variables.platform;
    return {
        "NativeBase.ViewNB":{
            // borderWidth: 2,
            // borderColor: "red",
            height: 55,
            flexDirection: 'row',
            "NativeBase.ViewNB":{
                flex:1
            }
        }
    }
}