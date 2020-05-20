import { call, CallEffect, take, put, fork } from 'redux-saga/effects';


export const takeSwitch = (patterns, saga) => fork(function* () {
    if(Object.prototype.toString.call(patterns) != "[object Array]"){throw new Error("takeSwitch 第一个参数必须是数组")}
    return call(function* () {
        let result = {};
        let index = 0;
        let action = {};
        let pattern1 = "";
        while (true) {
            pattern1 = patterns[index];
            action = yield take(pattern1);
            result = yield call(saga, pattern1, action, result)
            index += 1;
            if (index >= patterns.length) { index = 0; }
        }
    })
})