import _ from 'lodash';
import { Platform } from 'react-native';

export default (variables) => {
    let rypVariables = variables.rypVariables || variables;
    return {
        "NativeBase.ViewNB": {
            "NativeBase.ViewNB": {
                position: "absolute",
                width: rypVariables.PopupDialog_Container_Width,
                "NativeBase.ViewNB": {
                    flex: 1,
                    backgroundColor: rypVariables.PopupDialog_Container_BkColor,
                    ".container": {
                        borderRadius: rypVariables.PopupDialog_border_Radius,
                        overflow: 'hidden',
                        "NativeBase.ViewNB": {
                            "NativeBase.Text": {
                                color: rypVariables.PopupDialog_Item_Text_Color,
                                fontSize: rypVariables.PopupDialog_Item_Text_Size,
                                fontFamily: rypVariables.PopupDialog_Item_Text_Family,
                            },
                            "NativeBase.ViewNB": {
                                position: "absolute",
                                bottom: 0,
                                height: rypVariables.PopupDialog_Item_Line_Height,
                                backgroundColor: rypVariables.PopupDialog_Item_Line_BkColor
                            }
                        },
                    },
                    ".down": {
                        position: "absolute",
                        backgroundColor: rypVariables.PopupDialog_Container_BkColor,
                        height: rypVariables.PopupDialog_Arrow_WH,
                        width: rypVariables.PopupDialog_Arrow_WH,
                    }
                }

            }
        }
    }
}