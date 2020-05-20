import _ from 'lodash';
import { Platform } from 'react-native';

export default (variables) => {
    let rypVariables = variables.rypVariables || variables;
    return {
        "NativeBase.ViewNB": {
            flexDirection: 'row',
            width: rypVariables.Segments_Width,
            height: rypVariables.Segments_height,
            "NativeBase.Text":{
                fontSize: rypVariables.Segments_Font_Size,
                fontFamily: rypVariables.Segments_Text_Family,
            }
        }
    }
}