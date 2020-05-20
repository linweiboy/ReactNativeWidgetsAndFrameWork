
import Button from "./component/Button";
import SegTabs from "./component/SegTabs";
import ItemPicker from "./component/ItemPicker";
import Picker from "./component/Picker";
import AddressPicker from "./component/AddressPicker";
import DropPockerHeader from "./component/DropPockerHeader";
import DropPickerContent from "./component/DropPickerContent";
import Segments from "./component/Segments";
import SegCollection from "./component/SegCollection";
import PopupDialog from "./component/PopupDialog";
import AlertPopup from "./component/AlertPopup";
import PickerView from "./component/PickerView";
import NavigationBar from "./component/NavigationBar";
import SelectTabs from "./component/SelectTabs";
export default (variables) => {
    return {
        "NativeBase.Button": {
            ...Button(variables)
        },
        "NativeBase.RypSegTabs": {
            ...SegTabs(variables),
            height: variables.rypVariables.SegTabs_height
        },
        "NativeBase.RypItemPicker": {
            ...ItemPicker(variables)
        },
        "NativeBase.RypPicker": {
            ...Picker(variables)
        },
        "NativeBase.RypAddressPicker": {
            ...AddressPicker(variables)
        },
        "NativeBase.RypDropPockerHeader": {
            ...DropPockerHeader(variables)
        },
        "NativeBase.RypDropPickerContent": {
            ...DropPickerContent(variables)
        },
        "NativeBase.RypAlertPopupView": {
            ...AlertPopup(variables)
        },
        "NativeBase.RypSegments": {
            ...Segments(variables)
        },
        "NativeBase.RypSegCollection": {
            ...SegCollection(variables)
        },
        "NativeBase.RypPopupDialog": {
            ...PopupDialog(variables)
        },
        "NativeBase.RypPickerView": {
            ...PickerView(variables)
        },
        "NativeBase.RypNavigationBar": {
            ...NavigationBar(variables)
        },
        "NativeBase.RypSelectTabs":{
            ...SelectTabs(variables)
        }
    }
}