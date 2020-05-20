import _ from 'lodash';
import { Platform } from 'react-native';

export default (variables) => {
    let rypVariables = variables.rypVariables || variables;
    const ItemPicker = {
        // borderWidth: 2,
        // borderColor: "red",
        "NativeBase.ViewNB": {
            //底部一整块样式
            "NativeBase.ViewNB": {
                //Items 整块容器样式
                ".pickertop": {
                    // borderWidth: 2,
                    // borderColor: "yellow",
                    borderTopRightRadius: rypVariables.ItemPicker_Items_Container_Radius,
                    borderTopLeftRadius: rypVariables.ItemPicker_Items_Container_Radius,
                    "NativeBase.ViewNB": {
                        // borderColor:"red",
                        // borderWidth:4,
                        height: rypVariables.ItemPicker_Item_Container_Height,
                        backgroundColor: rypVariables.ItemPicker_Item_BkColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                        "NativeBase.Text":{
                            color:variables.ItemPicker_Item_Text_Color,
                            fontSize: variables.ItemPicker_Item_Text_Size,
                            fontFamily: variables.ItemPicker_Item_Text_Famfily,
                        }
                    }
                },
                ".pickerbottom": {
                    //取消按钮
                    height: rypVariables.ItemPicker_Cancal_Height,
                    backgroundColor: rypVariables.ItemPicker_Cancel_BkColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    "NativeBase.Text": {
                        fontSize: rypVariables.ItemPicker_Cancel_Text_Size,
                        fontFamily: rypVariables.ItemPicker_Cancel_Text_Famfily,
                        color: rypVariables.ItemPicker_Cancel_Text_Color
                    }
                }
            }
        },
        "NativeBase.Text": {

        }
    };
    return ItemPicker;
}