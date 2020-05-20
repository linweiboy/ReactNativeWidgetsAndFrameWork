import _ from 'lodash';
import { Platform } from 'react-native';

export default (variables) => {
    let rypVariables = variables.rypVariables || variables;
    return {
        "NativeBase.ViewNB": {
            "NativeBase.ViewNB": {
                ".center": {
                    height: rypVariables.PickerView_Center_Height
                },
                ".topView": {
                    height: rypVariables.PickerView_Top_Height,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: rypVariables.PickerView_Top_padding_Horizontal,
                    backgroundColor: "white",

                    "NativeBase.Text": {
                        fontSize: rypVariables.PickerView_Top_Text_Size,
                    }
                },
                ".bottomView": {
                    height: rypVariables.PickerView_Bottom_Height,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: "white",

                    "NativeBase.Text": {
                        fontSize: rypVariables.PickerView_Bottom_Text_Size,
                        color: rypVariables.PickerView_Bottom_Text_Color,
                        paddingLeft: 5,
                    }
                }
            }
        }
    }
}