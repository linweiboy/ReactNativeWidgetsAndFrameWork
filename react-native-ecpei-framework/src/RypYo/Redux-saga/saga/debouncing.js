

import { call, take, put, fork, cancel, takeEvery } from 'redux-saga/effects';
import { delay } from "redux-saga";
import { isGenerator } from "./generator";



function* DebouneG(action, func, time) {
    yield delay(time)
    yield fork(func, action)
}

export const deboune = (pattern, func, time = 500) => fork(function* () {
    if (!isGenerator(func)) {
        throw new Error("deboune 第二个参数必须是Generator 函数")
        return
    }
    let task;
    while (true) {
        let action = yield take(typeof pattern == "string" ? pattern : pattern.type)
        if (task != null) {
            yield cancel(task)
        }
        task = yield fork(DebouneG, action, func, time)
    }
})

