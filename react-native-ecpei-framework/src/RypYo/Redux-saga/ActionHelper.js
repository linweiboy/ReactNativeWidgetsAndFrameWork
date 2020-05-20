
/**
 * 生成Action
 * @param {*} type  action类型
 * @param {*} payload 需要传递的数据
 * @param {*} meta 配合redux-saga-thunk 让派发任务返回Promise
 */
const createActionCreator = (type, payload = {}, meta = { thunk: true }) => {
    return {
        type, payload, meta
    }
}
/**
 * 创建任务一组类型
 * @param {*} actionName 
 */
const createActionTypes = (actionName) => ({
    REQUEST: `${actionName}_REQUEST`,
    PENDING: `${actionName}_PENDING`,
    SUCCESS: `${actionName}_SUCCESS`,
    FAILURE: `${actionName}_FAILURE`,
    RESET: `${actionName}_RESET`
})

/**
 * 通过一组任务类型 创建该任务的一组Action
 * @param {} actions 
 * request:任务发起
 * pending:任务进行中
 * success:任务成功完成
 * failure:任务失败
 * reset:任务重启
 */
const createActionCreators = (actionTypes) => ({
    request: (payload) => createActionCreator(actionTypes.REQUEST, payload),
    pending: (payload) => createActionCreator(actionTypes.PENDING, payload),
    success: (payload) => createActionCreator(actionTypes.SUCCESS, payload),
    failure: (payload) => createActionCreator(actionTypes.FAILURE, payload),
    reset: (payload) => createActionCreator(actionTypes.RESET, payload),
});

export {
    createActionTypes,
    createActionCreator,
    createActionCreators
}