import { connect } from 'react-redux';
import RypYo from "../RypYo";
/**
 * 配合Redux-sage-thunk 让 dispatch() 返回Promise
 * @param {*} mapStateToProps 
 * @param {*} mapDispatchToProps 
 * @param {*} mergeProps 
 * @param {*} options 
 * 以及被下面ConnectDiapatch替换
 * 内部以及替换
 */
export default function (mapStateToProps, mapDispatchToProps, mergeProps, options) {
    return connect(mapStateToProps, function (dispatch) {
        return {
            ...mapDispatchToProps(dispatch),
            dispatch: function (action) {
                if (action instanceof Promise || typeof action == "function") { return dispatch(action) }
                let promise = dispatch({
                    ...action,
                    meta: { thunk: true }
                })
                if (promise.then && typeof promise.then == "function") {
                    return promise.then(res => res)
                }
                return promise
            }
        }
    }, mergeProps, options);
}

/**
 * 让dispactch  Promise then 在更新Redux之后回调
 */
export const ConnectDiapatch = function (dispatch) {
    return function (action, ...args) {
        if (action instanceof Promise || typeof action == "function") { return dispatch(action) }
        let _action = (action.meta && action.meta.thunk != null) ? action : { ...action, meta: { thunk: true } };
        let promise = dispatch(_action, ...args);
        if (promise.then && typeof promise.then == "function") { return promise.then(res => res) }
        return promise;
    }
}

function _dispatchAndAsync(business, store) {
    if (business && store) {
        let keys = Object.getOwnPropertyNames(business).concat(Object.getOwnPropertyNames(business.__proto__)).filter((one) => {
            if (one == "constructor") {
                return false
            }
            let index = one.indexOf("_");
            if (index == -1) return true
            if (index == 0) return false
            return true
        })
        delete keys["constructor"]
        for (var key of keys) {
            if (key && typeof business[key] == "function") {
                let source = business[key]
                business[key] = function (...args) {
                    return new Promise((resolve, reject) => {
                        source.bind(business)(...args, resolve, reject)
                    })
                }.bind(business)
            }
        }
        business.dispatch = store.dispatch
    }
}

function ConnectDispatch() {
    return function (business) {
        let Store = RypYo.getStore()
        if (Store == null) {
            RypYo._addReduxInitListenr((_Store) => {
                _dispatchAndAsync(business, _Store)
            })
        } else {
            _dispatchAndAsync(business, _Store)
        }

        return business
    }
}
export const connectDispatch = ConnectDispatch();