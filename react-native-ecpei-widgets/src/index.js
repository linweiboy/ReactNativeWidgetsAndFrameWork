/**
 * Created by tanlinwei
 *
 * Description:
 */
'use strict';
import { } from 'native-base';
import BadgeView from './basic/BadgeView';
import { Button } from './basic/Buttons'
import { CheckBox } from './basic/CheckBox';
import { IconTop } from './basic/ImageText';
import { InputRoundIcon, InputSecretRound, TextInputC ,VerifyCodeInput} from './basic/Input';
import { NavigationMainBar, Header } from './basic/NavigationBar';
import { InputPopup, UpgradePopup, RootModalBox } from './basic/popupBox';
import { HeaderBase ,NavigationBar,NavigationHeight} from "./ThemeComponent/NavigationBar";
import Toast from "./basic/Toast/Toast";
import NormalToast from './basic/Toast/NormalToast';
import {  Container } from './basic/Views';
import Loading from './basic/loader/Loading';
import ProgressBar from "./basic/loader/ProgressBar";
import { FormRowTwoView } from './basic/FormViews';
import HIcon from './library/HIcon'; 
import Alert from './components/base/Alert';
import DrawerRight from './basic/Drawer/DrawerRight';



import {
    RypTheme,
    ServiceTheme,
    SupplierTheme,
    SupplierVariables,
    ServiceVariables
} from "./RypTheme";
import RootBase from "./ThemeComponent/RootBase";
import { SegTabs,SelectTabs,StatusTabs,SegCollection} from "./ThemeComponent/SegTabs";
import { ItemsPicker } from "./ThemeComponent/ItemsPicker";
import { PickerView,ScrollPicker,MultistagePicker,StaffPicker} from "./ThemeComponent/Picker";
import { AddressPicker } from "./ThemeComponent/Address";
import {
    BaseInput,
    TextInput,
    TimerTextInput,
    isNumber, isEnglish, isChinese, isMaxLength, SecureInput
} from "./ThemeComponent/Input";
import { ModalContainer,ModalHeader,UnitModal,ValidModal,CertifyModal } from "./ThemeComponent/BaseModal";
import { PopupContainer, PopupType,MenuType,StatusPopupType,StatusPopupOptions,MenuPopup } from "./ThemeComponent/Popup";
import { PhoneCodeStyle } from "./ThemeComponent/Popup/business/PhoneCodePopup";
import { DropPockerHeader, DropPickerContent } from "./ThemeComponent/DropPicker";
import { Segments } from "./ThemeComponent/Segments";
import { PopupDialog } from "./ThemeComponent/PopupDialog";
import { KeyBoard } from "./ThemeComponent/KeyBoard";
import { VinCorpView } from "./ThemeComponent/CropView";
import { RefreshHeader, RefreshType } from "./ThemeComponent/Refresh";
// import { MessageType, LocalMessage, TEXTMessage, IMAGEMessage,MessageListView,ChatInputView ,MessageStatusInfo,User} from "./ThemeComponent/Chat";
import { TouchableHighlightThrottle, TouchableNativeFeedbackThrottle, TouchableType, TouchableOpacityThrottle, TouchableWithoutFeedbackThrottle } from './ThemeComponent/Button/TouchableThrottle';
import { Calculator } from "./ThemeComponent/Calculator";
import { FlatList,SectionList } from "./ThemeComponent/List";
export {
    Button,
    BadgeView,
    CheckBox,
    IconTop,
    InputRoundIcon,
    InputSecretRound,
    VerifyCodeInput,
    TextInputC,

    NavigationMainBar,//可以去掉
    Header,//可以去掉
    InputPopup, //弹出带有输入框的视图 使用 PopupType.TYPE4替代
    UpgradePopup,
    RootModalBox, 

    Toast,
    NormalToast,
    Container,
    Alert,
    Loading,
    ProgressBar,
    FormRowTwoView,
    HIcon,
    DrawerRight,
    




    RypTheme,
    ServiceTheme,
    SupplierTheme,
    SupplierVariables,
    ServiceVariables,
    RootBase,
    SegTabs,SelectTabs,StatusTabs,
    ItemsPicker,
    PickerView,MultistagePicker,StaffPicker,ScrollPicker,
    AddressPicker,
    ModalContainer,ModalHeader,
    UnitModal,
    ValidModal,
    CertifyModal,
    // BaseInput,
    TextInput,
    SecureInput,
    TimerTextInput, isNumber, isEnglish, isChinese, isMaxLength,
    PopupContainer, PopupType,MenuType,MenuPopup,StatusPopupType,StatusPopupOptions,PhoneCodeStyle,
    DropPockerHeader, DropPickerContent,
    Segments,
    SegCollection,
    PopupDialog,
    KeyBoard,
    //聊天
    // MessageType, LocalMessage, TEXTMessage, IMAGEMessage,MessageListView,ChatInputView,MessageStatusInfo,User,
    //新的导航栏
    HeaderBase,NavigationBar,NavigationHeight,
    //Vin 图片裁剪
    VinCorpView,
    TouchableHighlightThrottle,
    TouchableNativeFeedbackThrottle,
    TouchableType,
    TouchableOpacityThrottle,
    TouchableWithoutFeedbackThrottle,

    RefreshHeader,
    RefreshType,

    Calculator,//数量加减器

    FlatList,SectionList
}

