
import mapPropsToStyleNames from "../utils/mapPropsToStyleNames";
import { connectStyle } from "native-base-shoutem-theme";
import { variables } from "native-base";
import _ from 'lodash';

class _RypTheme {
    registerComponent(key, Component) {
        return connectStyle(
            key, {},
            mapPropsToStyleNames
        )(Component);
    }
    _cssifyTheme(grandparent, parent, parentKey) {
        _.forEach(parent, (style, styleName) => {
            if (styleName.indexOf('.') === 0 && parentKey && parentKey.indexOf('.') === 0) {
                if (grandparent) {
                    if (!grandparent[styleName]) {
                        grandparent[styleName] = {};
                    } else {
                        grandparent[styleName][parentKey] = style;
                    }
                }
            }
            if (style && typeof style === 'object') {
                this._cssifyTheme(parent, style, styleName);
            }
        });
    };
    /**
     *  整合（native-base  和 RypUI ）Variables一起使用
     * @param {*} nativeBaseVariables 
     * @param {*} rypVariables 
     */
    integrationVariables(nativeBaseVariables, rypVariables) {
        return {
            ...nativeBaseVariables,
            rypVariables
        }
    }
    /**
     * 
     * @param {*} baseTheme 
     * @param {*} projectTheme 
     */
    integrationTheme(baseTheme, projectTheme) {
        if (typeof baseTheme != "function" || typeof projectTheme != "function") {
            throw new Error("baseTheme 和 projectTheme必须是函数");
        }
        return (_variables = variables) => {
            let _Theme0 = baseTheme(_variables);
            let _Theme1 = projectTheme(_variables);
            this._cssifyTheme(null, _Theme1, null);
            return {
                ..._Theme0,
                ..._Theme1
            }
        }
    }
}
export default new _RypTheme();