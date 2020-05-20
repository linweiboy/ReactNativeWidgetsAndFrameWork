import _ from 'lodash';
import { Platform } from 'react-native';
// import {  } from "../.../";

export default (variables) => {
    let rypVariables = variables.rypVariables || variables;

    return {
        "NativeBase.ViewNB": {
            backgroundColor: "white",
            "NativeBase.ViewNB": {
                "NativeBase.Text": {
                    fontSize: rypVariables.SegTabs_normal_FontSize,
                    fontFamily: rypVariables.regularFontFamily,
                    color: rypVariables.SegTabs_normal_FontColor,
                    ".select": {
                        fontSize: rypVariables.SegTabs_select_FontSize,
                        fontFamily: rypVariables.mediumFontFamily,
                        color: rypVariables.SegTabs_select_FontColor,
                    }
                }
            }
        }
    }
}
