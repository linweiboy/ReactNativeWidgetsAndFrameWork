import color from 'color';
import { Platform, Dimensions, PixelRatio,StatusBar } from 'react-native';
import { scaleSize, setSpText } from './appScreen';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;
const platformStyle = undefined;

const isIOS = Platform.OS === 'ios';
const isIphoneX = Platform.OS === 'ios' && deviceHeight===812 && deviceWidth===375;
const isAndroid = Platform.OS === 'android';

export default {
  platformStyle,
  platform,
  // AndroidRipple
  androidRipple: true,
  androidRippleColor: 'rgba(256, 256, 256, 0.3)',
  androidRippleColorDark: 'rgba(0, 0, 0, 0.15)',

  // Badge
  badgeBg: '#ED1727',
  badgeColor: '#fff',
  // New Variable
  badgePadding: (platform === 'ios') ? 3 : 0,

  // Button
  btnFontFamily: (platform === 'ios') ? 'System' : 'Roboto_medium',
  btnDisabledBg: '#b5b5b5',
  btnDisabledClr: '#f1f1f1',

  // CheckBox
  CheckboxRadius: (platform === 'ios') ? 13 : 0,
  CheckboxBorderWidth: (platform === 'ios') ? 1 : 1,
  CheckboxPaddingLeft: (platform === 'ios') ? 4 : 0,
  CheckboxPaddingBottom: (platform === 'ios') ? 0 : 0,
  CheckboxIconSize: (platform === 'ios') ? 21 : 10,
  CheckboxIconMarginTop: (platform === 'ios') ? undefined : -2,
  CheckboxFontSize: (platform === 'ios') ? (23 / 0.9) : 14,
  DefaultFontSize: 13,
  checkboxBgColor: '#039BE5',
  checkboxSize: 13,
  checkboxTickColor: '#fff',

  // Segment
  segmentBackgroundColor: (platform === 'ios') ? '#F8F8F8' : '#3F51B5',
  segmentActiveBackgroundColor: (platform === 'ios') ? '#007aff' : '#fff',
  segmentTextColor: (platform === 'ios') ? '#007aff' : '#fff',
  segmentActiveTextColor: (platform === 'ios') ? '#fff' : '#3F51B5',
  segmentBorderColor: (platform === 'ios') ? '#007aff' : '#fff',
  segmentBorderColorMain: (platform === 'ios') ? '#a7a6ab' : '#3F51B5',

  //Statusbar

  statusBarHeight:(platform === 'ios') ? 20 : StatusBar.currentHeight,

    //NavigationBar 相关高度
    isIOS:isIOS,
    isAndroid:isAndroid,
    isIphoneX:isIphoneX,
    navStatusBarHeight:isIOS ? isIphoneX ? 44:20:StatusBar.currentHeight,
    navHeight:isIOS ? isIphoneX ? 88:64:StatusBar.currentHeight+40,



  // New Variable
  get defaultTextColor() {
    return this.textColor;
  },


  get btnPrimaryBg() {
    return this.brandPrimary;
  },
  get btnPrimaryColor() {
    return this.inverseTextColor;
  },
  get btnInfoBg() {
    return this.brandInfo;
  },
  get btnInfoColor() {
    return this.inverseTextColor;
  },
  get btnSuccessBg() {
    return this.brandSuccess;
  },
  get btnSuccessColor() {
    return this.inverseTextColor;
  },
  get btnDangerBg() {
    return this.brandDanger;
  },
  get btnDangerColor() {
    return this.inverseTextColor;
  },
  get btnWarningBg() {
    return this.brandWarning;
  },
  get btnWarningColor() {
    return this.inverseTextColor;
  },
  get btnTextSize() {
    return (platform === 'ios') ? this.fontSizeBase * 1.1 :
      this.fontSizeBase - 1;
  },
  get btnTextSizeLarge() {
    return this.fontSizeBase * 1.5;
  },
  get btnTextSizeSmall() {
    return this.fontSizeBase * 0.8;
  },
  get borderRadiusLarge() {
    return this.fontSizeBase * 3.8;
  },

  buttonPadding: 6,

  get iconSizeLarge() {
    return this.iconFontSize * 1.5;
  },
  get iconSizeSmall() {
    return this.iconFontSize * 0.6;
  },


  // Card
  cardDefaultBg: '#fff',


  // Color
  brandPrimary: (platform === 'ios') ? '#007aff' : '#3F51B5',
  brandInfo: '#62B1F6',
  brandSuccess: '#5cb85c',
  brandDanger: '#d9534f',
  brandWarning: '#f0ad4e',
  brandSidebar: '#252932',


  // Font
  fontFamily: (platform === 'ios') ? 'System' : 'Roboto',
  fontSizeBase: 15,

  get fontSizeH1() {
    return this.fontSizeBase * 1.8;
  },
  get fontSizeH2() {
    return this.fontSizeBase * 1.6;
  },
  get fontSizeH3() {
    return this.fontSizeBase * 1.4;
  },


  // Footer
  footerHeight: 55,
  footerDefaultBg: (platform === 'ios') ? '#F8F8F8' : '#4179F7',


  // FooterTab
  tabBarTextColor: (platform === 'ios') ? '#6b6b6b' : '#b3c7f9',
  tabBarTextSize: (platform === 'ios') ? 14 : 11,
  activeTab: (platform === 'ios') ? '#007aff' : '#fff',
  sTabBarActiveTextColor: '#007aff',
  tabBarActiveTextColor: (platform === 'ios') ? '#007aff' : '#fff',
  tabActiveBgColor: (platform === 'ios') ? '#cde1f9' : '#3F51B5',

  // Tab
  tabDefaultBg: (platform === 'ios') ? '#F8F8F8' : '#3F51B5',
  topTabBarTextColor: (platform === 'ios') ? '#6b6b6b' : '#b3c7f9',
  topTabBarActiveTextColor: (platform === 'ios') ? '#007aff' : '#fff',
  topTabActiveBgColor: (platform === 'ios') ? '#cde1f9' : undefined,
  topTabBarBorderColor: (platform === 'ios') ? '#a7a6ab' : '#fff',
  topTabBarActiveBorderColor: (platform === 'ios') ? '#007aff' : '#fff',


  // Header
  toolbarBtnColor: (platform === 'ios') ? '#007aff' : '#fff',
  toolbarDefaultBg: (platform === 'ios') ? '#F8F8F8' : '#3F51B5',
  toolbarHeight: (platform === 'ios') ? 64 : 56,
  toolbarIconSize: (platform === 'ios') ? 20 : 22,
  toolbarSearchIconSize: (platform === 'ios') ? 20 : 23,
  toolbarInputColor: (platform === 'ios') ? '#CECDD2' : '#fff',
  searchBarHeight: (platform === 'ios') ? 30 : 40,
  toolbarInverseBg: '#222',
  toolbarTextColor: (platform === 'ios') ? '#000' : '#fff',
  toolbarDefaultBorder: (platform === 'ios') ? '#a7a6ab' : '#3F51B5',
  iosStatusbar: (platform === 'ios') ? 'dark-content' : 'light-content',
  get statusBarColor() {
    return color(this.toolbarDefaultBg).darken(0.2).hexString();
  },


  // Icon
  iconFamily: 'Ionicons',
  iconFontSize: (platform === 'ios') ? 30 : 28,
  iconMargin: 7,
  iconHeaderSize: (platform === 'ios') ? 33 : 24,


  // InputGroup
  inputFontSize: 17,
  inputBorderColor: '#D9D5DC',
  inputSuccessBorderColor: '#2b8339',
  inputErrorBorderColor: '#ed2f2f',

  get inputColor() {
    return this.textColor;
  },
  get inputColorPlaceholder() {
    return '#575757';
  },

  inputGroupMarginBottom: 10,
  inputHeightBase: 50,
  inputPaddingLeft: 5,

  get inputPaddingLeftIcon() {
    return this.inputPaddingLeft * 8;
  },


  // Line Height
  btnLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 22,
  iconLineHeight: (platform === 'ios') ? 37 : 30,
  lineHeight: (platform === 'ios') ? 20 : 24,


  // List
  listBorderColor: '#c9c9c9',
  listDividerBg: '#f4f4f4',
  listItemHeight: 45,
  listBtnUnderlayColor: '#DDD',

  // Card
  cardBorderColor: '#ccc',

  // Changed Variable
  listItemPadding: (platform === 'ios') ? 10 : 12,

  listNoteColor: '#808080',
  listNoteSize: 13,


  // Progress Bar
  defaultProgressColor: '#E4202D',
  inverseProgressColor: '#1A191B',


  // Radio Button
  radioBtnSize: (platform === 'ios') ? 25 : 23,
  radioSelectedColorAndroid: '#3F51B5',

  // New Variable
  radioBtnLineHeight: (platform === 'ios') ? 29 : 24,

  radioColor: '#7e7e7e',

  get radioSelectedColor() {
    return color(this.radioColor).darken(0.2).hexString();
  },


  // Spinner
  defaultSpinnerColor: '#45D56E',
  inverseSpinnerColor: '#1A191B',


  // Tabs
  tabBgColor: '#F8F8F8',
  tabFontSize: 15,
  tabTextColor: '#222222',


  // Text
  textColor: '#000',
  inverseTextColor: '#fff',
  noteFontSize: 14,


  // Title
  titleFontfamily: (platform === 'ios') ? 'System' : 'Roboto_medium',
  titleFontSize: (platform === 'ios') ? 17 : 19,
  subTitleFontSize: (platform === 'ios') ? 12 : 14,
  subtitleColor: (platform === 'ios') ? '#8e8e93' : '#FFF',

  // New Variable
  titleFontColor: (platform === 'ios') ? '#000' : '#FFF',


  // Other
  borderRadiusBase: (platform === 'ios') ? 5 : 2,
  borderWidth: (1 / PixelRatio.getPixelSizeForLayoutSize(1)),
  contentPadding: 10,

  get darkenHeader() {
    return color(this.tabBgColor).darken(0.03).hexString();
  },

  dropdownBg: '#000',
  dropdownLinkColor: '#414142',
  inputLineHeight: 24,
  jumbotronBg: '#C9C9CE',
  jumbotronPadding: 30,


  deviceWidth,
  deviceHeight,
  // New Variable
  inputGroupRoundedBorderRadius: 30,

 /**
  * app文字字体类型 颜色 大小整理归类
  */
    
    mediumFontFamily:'PingFangSC-Medium',  
    regularFontFamily:'PingFangSC-Regular',
    semiboldFontFamily:'PingFangSC-Semibold',
    microsoftYaHeiFamily:(platform === 'ios') ? 'PingFangSC-Medium' : 'MicrosoftYaHei',


    //分割线的颜色和高度
    spaceLineColor:'#EFEFF4',
    spaceLineHeight:0.8,

    //app主色调颜色
    appMainColor:'#2473D5',

    //快捷点击入口文字
    imageButFontColor:'#7E8186',
    imageButFontSize:scaleSize(26),

    //分组的标题和副标题
    titleColor:'#5C5C60',
    titleFontFamilySize:16,
    titleLabelColor:'#B4B5B6',
    titleLabelFontSize:scaleSize(26),
  
    //热门车系和推荐品牌
    titelCarColor:'#4f4f53',
    titelCarFontSize:scaleSize(22),

    //商户中心文字颜色和大小 #B4B5B6 #7E8186
    titleStoreColor:'#2B76D3',
    titleStoreFontSize:scaleSize(32),
    accountColor:'#B4B5B6',
    accountFontSize:scaleSize(24),
    orderTypeColor:'#4F4F53',
    orderTypeFontSize:scaleSize(26),
     
    //app规范颜色值
    service_b3:'#07BFA7',
    primary_b2:'#274DE7',
    blue_1:'#2879F4',
    blue_2:'#3F50F3',
    service:'#09CAB1',
    FC8F80 :'#FC8F80 ',
    Owners:'#17CAD9',
    wholesale:'#FFC24C',
    news:'#EE3943', 
    gray_darker:'#2D2D2D', 
    gray_medium:'#4B4B4B', 
    gray:'#757575',  
    gray_1:'#8C8C8C', 
    gray_light:'#949494',
    hover_gray:'#B7B7B7', 
    gray_2:'#E5E5E5', 
    bg_1:'#F6F9FB ',  
    bg_2:'#EFEFF4', 
    bg_3:'#FFFFFF', 

    mallStartColor:'#332BBA',
    admissionAgreementHeaderColor:'#F6F9FB',

    blankStatusText:{
      fontSize:setSpText(26),
      fontFamily:'PingFangSC-Regular',
      color:"#7E8186",
      marginTop:25,
    }
    ,
    //采购中心
    lineSpaceViewHeight:8,
    searchViewHeight:scaleSize(88),
};