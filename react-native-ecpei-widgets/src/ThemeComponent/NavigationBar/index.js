import { HeaderBase } from "./HeaderBase";
import { NavigationBar } from "./NavigationBar";
import Theme from "../../library/base-theme";
const NavigationHeight = Theme.navHeight;

export {
    HeaderBase,
    NavigationBar,
    NavigationHeight
}
/***
 * routeType === 'stack' ?
                        <Header
                            leftIcon
                            title={"发布求购"}
                            borderBottomWidth={0}
                            leftIconProps={{ name: 'return', color: '#333333', size: SCALE_SIZE(35) }}
                            titleStyle={{ fontSize: SCALE_SIZE(32), color: "#1D1D1D", fontFamily: AppTheme.regularFontFamily }}
                            leftOnPress={() => { navigation.pop() }} /> :
                        <NavigationMainBar
                            title=''
                            leftTitle={"发布求购"}
                            leftTitleStyle={{
                                fontSize: SCALE_SIZE(44),
                                color: "#000",
                            }}
                            rightTitle={null}
                            IsRightIcon={false}
                            borderBottomWidth={0}
                            backgroundColor={"#fff"}
                            IsLeftIcon={false}
                        />
 * 
 * 修改为
 * 
 * routeType === 'stack' ?
                        <NavigationBar centerProps={"发布求购"}></NavigationBar>
                        :
                        <NavigationBar
                            leftTextProps={{ title: "发布求购", style: { fontSize: SCALE_SIZE(44), color: "#000" } }}
                        ></NavigationBar>
 */