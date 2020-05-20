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


// return {
//     "NativeBase.ViewNB": {
//         backgroundColor: "yellow",
//         "NativeBase.ViewNB": {
//             borderColor: "red",
//             borderWidth: 2,
//             "NativeBase.Button": {
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: "#00ffff",
//                 "NativeBase.Button": {
//                     "NativeBase.Text": {
//                         fontSize: 12,
//                         ".select": {
//                             fontSize: 19
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }