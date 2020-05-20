import _ from 'lodash';
import { Platform } from 'react-native';

export default (variables) => {
    let rypVariables = variables.rypVariables || variables;
    return {
        "NativeBase.ViewNB": {
            // borderColor: "red",
            // borderWidth: 2,
            "NativeBase.ViewNB": {
                ".listView": {
                    //下拉列表的Cell 样式
                    height: rypVariables.DropPicker_Content_Cell_Heighet,
                    justifyContent: 'space-between',
                    backgroundColor: "white",
                    alignItems: 'center',
                    flexDirection: "row",
                    paddingHorizontal: rypVariables.DropPicker_Content_Cell_Padding_Horizontal,
                },
                "NativeBase.ViewNB": {
                    "NativeBase.Text": {
                        //下拉列表的Cell Text样式
                        fontFamily: rypVariables.DropPicker_Content_Cell_Text_Font_Family,
                        fontSize: rypVariables.DropPicker_Content_Cell_Text_Size
                    }
                },
                ".buttons": {
                    //底部容器样式
                    height: rypVariables.DropPicker_Content_Buttons_Height,
                    flexDirection: 'row',
                    "NativeBase.ViewNB":{
                        //底部一个选择按钮样式
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "white",
                        flex: 1,
                        //titleStyle 底部选择按钮文字样式
                        "NativeBase.Text": {
                            fontFamily: rypVariables.DropPicker_Content_Buttons_Font_Famfily,
                            fontSize: rypVariables.DropPicker_Content_Buttons_Text_Size,
                        }
                    }
                }
            }
        }
    }
}