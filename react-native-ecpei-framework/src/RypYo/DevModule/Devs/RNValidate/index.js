
import { DevModule } from "../../Module";
/**
 *  改造 
 *     error(1,2,3,4,5,"Desc")
 *     [1-5] 取 && 为false 弹出Desc 错误提示 
 *  Validate(true,false,true,"验证不通过")
 */
export default class RNValidate extends DevModule {
    run = (isEnv,config) => {
        if (isEnv && (config && config.disable != true)) {
            global.Validate = function (...args) {
                desc = args.pop()
                if (!args.reduce((one, two) => { return (one && two) }, true)) {
                    throw new Error("Validate 验证不通过 :" + desc)
                    return
                }
            }
        } else {
            global.Validate = function () { };
        }

    }
}
