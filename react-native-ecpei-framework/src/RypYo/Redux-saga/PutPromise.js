import { put } from 'redux-saga/effects';
/**
 * 
 * @param {*} action 
 */
export const PutPromise = (action, type, payload) => {
    if (type.indexOf("_SUCCESS") >= 1 || type.indexOf("_FAILURE") >= 1) {
        payload = {
            ...payload,
            redux_type: type
        }
    }
    return put.resolve({ ...action, type, payload })
}