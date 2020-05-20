import _ from 'lodash';
import { Platform } from 'react-native';

export default (variables) => {
    let rypVariables = variables.rypVariables || variables;
    return {
        "NativeBase.ViewNB": {
            "NativeBase.ViewNB": {
                flex:1,
                backgroundColor: rypVariables.Address_Picker_Container_BkColor,
                borderTopRightRadius: rypVariables.Address_Picker_Container_Radius,
                borderTopLeftRadius: rypVariables.Address_Picker_Container_Radius,
                "NativeBase.ViewNB": {
                    ".titleView": {
                        height: rypVariables.Address_Picker_Title_Container_Height,
                        justifyContent: 'center',
                        alignItems: 'center',
                        "NativeBase.Text": {
                            color: rypVariables.Address_Picker_Title_Font_Color,
                            fontFamily: rypVariables.Address_Picker_Title_Font_Famfily,
                            fontSize: rypVariables.Address_Picker_Title_Font_Size,
                        }
                    },
                    ".toolView": {
                        height: rypVariables.Address_Picker_Tool_Height,
                        flexDirection: 'row',
                        "NativeBase.ViewNB": {
                            justifyContent: 'center',
                            alignItems: "center",
                            height: "100%",
                            paddingHorizontal: rypVariables.Address_Picker_Tool_Padding_Height,
                            "NativeBase.Text": {
                                fontFamily: rypVariables.Address_Picker_Tool_Text_Font_Famfily,
                                fontSize: rypVariables.Address_Picker_Tool_Text_Font_Size,
                                color: rypVariables.Address_Picker_Tool_Text_Font_Color
                            }
                        }

                    },
                    ".listView": {
                        "NativeBase.ViewNB": {
                            justifyContent: "center",
                            paddingLeft: rypVariables.Address_Picker_Item_Container_Padding_Left,
                            height: rypVariables.Address_Picker_Item_Container_Height,
                            "NativeBase.Text": {
                                fontFamily: rypVariables.Address_Picker_Item_Text_Font_Famfily,
                                fontSize: rypVariables.Address_Picker_Item_Text_Font_Size,
                                color: rypVariables.Address_Picker_Item_Text_Font_Color
                            }
                        }
                    }
                }
            }
        }
    }
}
