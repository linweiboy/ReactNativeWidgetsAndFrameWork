import _ from 'lodash';
import { Platform } from 'react-native';

export default (variables) => {
    let rypVariables = variables.rypVariables || variables;

    return {
        "NativeBase.ViewNB": {
            height: rypVariables.SelectTabs_Container_Height,
            backgroundColor: "#4D78E7",
            "NativeBase.ViewNB": {
                ".bk": {
                    height: rypVariables.SelectTabs_Content_Height,
                    marginTop: rypVariables.SelectTabs_Container_Height - rypVariables.SelectTabs_Content_Height,
                    backgroundColor: "#E5EEFF",

                },
                ".content": {
                    position: "absolute", left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'row',
                    "NativeBase.ViewNB": {
                        flex: 1,
                        paddingTop: rypVariables.SelectTabs_Container_Height - rypVariables.SelectTabs_Content_Height,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                }
            }
        }
    }
}
