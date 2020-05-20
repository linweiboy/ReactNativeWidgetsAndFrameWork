import _ from 'lodash';
import { Platform } from 'react-native';

export default (variables) => {
    let rypVariables = variables.rypVariables || variables;
    const platform = variables.platform;
    return {
        "NativeBase.ViewNB": {
            height: rypVariables.DropPicker_Header_Height,
            "NativeBase.ViewNB": {
                flexDirection: 'row',
                height: "100%",
                "NativeBase.ViewNB": {
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "row",
                    "NativeBase.Text":{
                        paddingRight: 0,
                        fontFamily: rypVariables.DropPicker_Header_Text_Font_Family,
                        fontSize:rypVariables.DropPicker_Header_Text_Size,
                        color:rypVariables.DropPicker_Header_Text_Color
                    }
                }
            }
        }
    }
}