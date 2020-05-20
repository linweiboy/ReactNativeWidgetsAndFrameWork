import { call, CallEffect, take, put, fork } from 'redux-saga/effects';
import { isGenerator } from './generator';
import { delay } from "redux-saga";
/**
 * 处理
 */

export const reset = (saga, count = 2, errorDelay = 500) => {
    return call(function* () {
        let result;
        while (count > 0) {
            try {
                result = yield call(saga)
                return result
            } catch (error) {
                count -= 1;
                result = {error};
                yield delay(errorDelay)
            }
        }
        return result
    })
}