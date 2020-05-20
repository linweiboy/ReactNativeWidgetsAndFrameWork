/**
 * 解决saga-thunkPromise Action 关键字payload 与 现有代码 data关键字的冲突
 *  
 * redux-saga-Promise
 *  Action{
 *      type:
 *      payload:{}
 * }
 * 
 * 现有
 *  Action{
 *      type:"",
 *      data:{}
 * }
 * 
 * 让项目迁移保持一定的兼容性
 */

export const SagaThunkHandle = function (_ref) {
    return function (next) {
        return function (action) {
            if (typeof action == "function" || action instanceof Promise)
                return next(action)
            else if (action && action.type && action.data == null && action.payload != null ) {
                if (action.type.indexOf("_SUCCESS") >= 0 || action.type.indexOf("_FAILURE") >= 0) {
                    action.data = action.payload
                    delete action["payload"]
                    if(action.meta){delete action["meta"]}
                    return next(action)
                }
            }
            return next(action)
        }
    }
}