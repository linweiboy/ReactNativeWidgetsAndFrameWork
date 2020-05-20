
import { Platform, Dimensions, PixelRatio, StatusBar } from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const isIOS = Platform.OS === 'ios';
const isIphoneX = Platform.OS === 'ios' && deviceHeight === 812 && deviceWidth === 375;
const isAndroid = Platform.OS === 'android';
import { scaleSize } from "../../../utils/Screen";
import Colors from "./commonColor";

export default {
    /**
     * app 字体
     */
    mediumFontFamily: 'PingFangSC-Medium',
    regularFontFamily: 'PingFangSC-Regular',
    semiboldFontFamily: 'PingFangSC-Medium',

    /**
     * SegTabs配置
     */
    SegTabs_normal_FontSize: scaleSize(28),
    SegTabs_normal_FontColor: "#000000",
    SegTabs_select_FontSize: scaleSize(44),
    SegTabs_height: scaleSize(104),
    get SegTabs_select_FontColor() { return this.SegTabs_normal_FontColor },

    /**
     * ItemPicker
     */
    ItemPicker_Cancal_Height: scaleSize(88),
    ItemPicker_Cancel_BkColor: "#3F50F3",
    get ItemPicker_Cancel_Text_Famfily() { return this.regularFontFamily },
    ItemPicker_Cancel_Text_Size: scaleSize(34),
    ItemPicker_Cancel_Text_Color: Colors.Color_white,

    ItemPicker_Items_Container_Radius: scaleSize(18),
    ItemPicker_Item_Container_Height: scaleSize(110),
    ItemPicker_Item_BkColor: Colors.Color_white,
    get ItemPicker_Item_Text_Famfily() { return this.regularFontFamily },
    ItemPicker_Item_Text_Size: scaleSize(32),
    ItemPicker_Item_Text_Color: Colors.Color_red,

    /**
     * Picker
     */
    PickerOptions: {
        pickerConfirmBtnText: "完成",
        pickerConfirmBtnColor: "255, 255, 255, 1",
        pickerCancelBtnText: "取消",
        pickerCancelBtnColor: "255, 255, 255, 1",
        //tool背景颜色
        pickerToolBarBg: "63, 80, 243, 1",
        //背景颜色
        pickerBg: "255, 255, 255, 1",
        //tool字体大小
        pickerToolBarFontSize: scaleSize(30),
        //picker字体大小
        pickerFontSize: scaleSize(36),
        pickerFontColor: "0, 0, 0, 1",
        pickerRowHeight: scaleSize(88),
    },
    /***
     * AddressPicker
     */
    Address_Picker_Container_Height: scaleSize(1070),
    Address_Picker_Container_BkColor: Colors.Color_white,
    Address_Picker_Container_Radius: scaleSize(24),
    Address_Picker_Title_Container_Height: scaleSize(124),
    get Address_Picker_Title_Font_Famfily() { return this.mediumFontFamily },
    Address_Picker_Title_Font_Size: scaleSize(32),
    Address_Picker_Title_Font_Color: Colors.Color_black,
    Address_Picker_Tool_Height: scaleSize(108),
    Address_Picker_Tool_Padding_Height: scaleSize(28),


    get Address_Picker_Tool_Text_Font_Famfily() { return this.regularFontFamily },
    Address_Picker_Tool_Text_Font_Size: scaleSize(28),
    Address_Picker_Tool_Text_Font_Color: Colors.Color_black,

    Address_Picker_Item_Container_Height: scaleSize(104),
    Address_Picker_Item_Container_Padding_Left: scaleSize(32),

    get Address_Picker_Item_Text_Font_Famfily() { return this.regularFontFamily },
    Address_Picker_Item_Text_Font_Size: scaleSize(28),
    Address_Picker_Item_Text_Font_Color: Colors.Color_black,

    Address_Picker_text_select_Color: Colors.Color_4D78E7,
    Address_Picker_text_Normal_Color: Colors.Color_black,

    //DropPockerHeader
    DropPicker_Header_Height: scaleSize(88),
    DropPicker_Header_Text_Size: scaleSize(28),
    get DropPicker_Header_Text_Font_Family() { return this.regularFontFamily },
    DropPicker_Header_Text_Color: Colors.Color_black,
    DropPicker_Header_Text_NormolColor: Colors.Color_black,
    DropPicker_Header_Text_SelectColor: Colors.Color_FE4B3A,

    //DropPickerContent
    DropPicker_Content_Cell_Heighet: scaleSize(104),
    DropPicker_Content_Cell_Padding_Horizontal: scaleSize(20),
    DropPicker_Content_Cell_Text_Size: scaleSize(30),
    DropPicker_Content_Cell_Text_NormolColor: Colors.Color_black,
    DropPicker_Content_Cell_Text_SelectColor: Colors.Color_FE4B3A,

    get DropPicker_Content_Cell_Text_Font_Family() { return this.regularFontFamily },
    DropPicker_Content_Buttons_Height: scaleSize(88),
    DropPicker_Content_Buttons_Text_Size: scaleSize(28),
    get DropPicker_Content_Buttons_Font_Famfily() { return this.regularFontFamily },


    //AlertPopup
    AlertPopup_Buttons_Font_Size: scaleSize(36),
    get AlertPopup_Buttons_Font_Family() { return this.regularFontFamily },
    AlertPopup_Buttons_Font_Normal_Color: Colors.Color_black,
    AlertPopup_Buttons_Font_Sure_Color: "#4D78E7",
    AlertPopup_Splite_Bk_Color: "#E5E5E5",

    //Color_4D78E7
    Segments_Theme_Color: Colors.Color_4D78E7,
    Segments_Width: scaleSize(588),
    Segments_height: scaleSize(58),
    get Segments_Text_Family() { return this.regularFontFamily },
    Segments_Font_Size: scaleSize(28),

    //SegCollection
    get SegCollection_Select_Font_Family() { return this.regularFontFamily },
    SegCollection_Select_Font_Size: scaleSize(34),
    SegCollection_Select_Font_color: Colors.Color_black,
    get SegCollection_Normal_Font_Family() { return this.regularFontFamily },
    SegCollection_Normal_Font_Size: scaleSize(28),
    SegCollection_Normal_Font_color: Colors.Color_8E8E93,

    //PopupDialog
    PopupDialog_Container_Width: scaleSize(138),
    PopupDialog_Container_BkColor: "rgb(40,40,40)",
    PopupDialog_border_Radius: scaleSize(8),
    PopupDialog_Item_Line_Height: scaleSize(1),
    PopupDialog_Item_Line_BkColor: Colors.Color_8E8E93,
    PopupDialog_Item_Text_Size: scaleSize(26),
    PopupDialog_Item_Text_Color: Colors.Color_white,
    get PopupDialog_Item_Text_Family() { return this.regularFontFamily },
    PopupDialog_Arrow_WH: 6,


    //PickerView
    PickerView_Center_Height: 175,
    PickerView_Top_Height: scaleSize(88),
    PickerView_Top_padding_Horizontal: 10,
    PickerView_Top_Text_Size: scaleSize(30),
    PickerView_Top_Right_Text: "确定",
    PickerView_Top_Right_Text_Color: Colors.Color_4D78E7,
    PickerView_Top_Left_Text: "取消",
    PickerView_Top_Left_Text_Color: Colors.Color_8E8E93,


    get PickerView_Bottom_Height() { return this.PickerView_Top_Height },
    PickerView_Bottom_Text_Size: scaleSize(30),
    PickerView_Bottom_Text: "新增部门",
    PickerView_Bottom_Text_Color: Colors.Color_4D78E7,


    PickerView_Center_Item_Height: 35,
    PickerView_Center_Item_Hight_Color: "#999999",

    Picker_Center_Item_Select_Text_Style: { color: "black", fontSize: scaleSize(40) },
    Picker_Center_Item_norSelect_Text_Style: { color: Colors.Color_8E8E93, fontSize: scaleSize(34) },


    NavigationBar_Left_default_Icon: { color: "#333333", name: "return", size: scaleSize(35) },

    SelectTabs_Container_Height: scaleSize(84),
    SelectTabs_Content_Height: scaleSize(76),
    SelectTabs_Item_sel_Text: {
        fontFamily: "PingFang-SC-Medium",
        fontSize: scaleSize(32),
        color: Colors.Color_4D78E7
    },
    SelectTabs_Item_nor_Text: {
        fontFamily: "PingFang-SC-Medium",
        fontSize: scaleSize(32),
        color: Colors.Color_4A4F66
    },

    StatusTabs_Container_height:scaleSize(70),
    StatusTabs_Line_Width:scaleSize(96),
    StatusTabs_Line_Bk:Colors.Color_FE4B3A,
    StatusTabs_Text_Size:scaleSize(24),
    StatusTabs_Select_Text_Color:Colors.Color_black,
    StatusTabs_Normal_Text_Color:Colors.Color_666666,
}