
import React, { Component } from 'react';
import { StyleSheet, DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
var GLOBAL = typeof window === 'undefined' ? global : window;

var setter = function (_setter, _clearer, array) {
    return function (callback, delta) {
        var id = _setter(function () {
            _clearer.call(this, id);
            callback.apply(this, arguments);
        }.bind(this), delta);

        if (!this[array]) {
            this[array] = [id];
        } else {
            this[array].push(id);
        }
        return id;
    };
};

var clearer = function (_clearer, array) {
    return function (id) {
        if (this[array]) {
            var index = this[array].indexOf(id);
            if (index !== -1) {
                this[array].splice(index, 1);
            }
        }
        _clearer(id);
    };
};

var _timeouts = 'TimerMixin_timeouts';
var _clearTimeout = clearer(GLOBAL.clearTimeout, _timeouts);
var _setTimeout = setter(GLOBAL.setTimeout, _clearTimeout, _timeouts);

var _intervals = 'TimerMixin_intervals';
var _clearInterval = clearer(GLOBAL.clearInterval, _intervals);
var _setInterval = setter(GLOBAL.setInterval, function () {/* noop */ }, _intervals);

var _immediates = 'TimerMixin_immediates';
var _clearImmediate = clearer(GLOBAL.clearImmediate, _immediates);
var _setImmediate = setter(GLOBAL.setImmediate, _clearImmediate, _immediates);

var _rafs = 'TimerMixin_rafs';
var _cancelAnimationFrame = clearer(GLOBAL.cancelAnimationFrame, _rafs);
var _requestAnimationFrame = setter(GLOBAL.requestAnimationFrame, _cancelAnimationFrame, _rafs);



var _addListenerKey = "TimerMixin_addListener";
var _AddListener = function (key, handle) {
    let oneKeyH = DeviceEventEmitter.addListener(key, handle.bind(this));
    if (!this[_addListenerKey]) {
        this[_addListenerKey] = [oneKeyH]
    } else {
        this[_addListenerKey].push(oneKeyH);
    }
}
var _ClearLisener = function () {
    this[_addListenerKey] && this[_addListenerKey].forEach((LHandle) => LHandle.remove())
}
/**
 * 
 * 增加 定时器 setInterval  setImmediate DeviceEventEmitter监听 方法
 * 在componentWillUnmount同一销毁
 * 
 * 如果覆盖了componentWillUnmount 需要调用super.componentWillUnmount()进行资源销毁
 */
export default class RypBase extends Component {
    constructor(props) {
        super(props)

        /**
         * 增加定时器  在componentWillUnmount
         */
        this.setTimeout = _setTimeout;
        this.clearTimeout = _clearTimeout;

        this.setInterval = _setInterval;
        this.clearInterval = _clearInterval;

        this.setImmediate = _setImmediate;
        this.clearImmediate = _clearImmediate;

        this.requestAnimationFrame = _requestAnimationFrame;
        this.cancelAnimationFrame = _cancelAnimationFrame;

        /**
         * 增加 DeviceEventEmitter监听
         */
        this.addListener = _AddListener.bind(this);
        this.ClearListener = _ClearLisener.bind(this);

    }

    componentWillUnmount() {
        this[_timeouts] && this[_timeouts].forEach(function (id) {
            GLOBAL.clearTimeout(id);
        });
        this[_timeouts] = null;
        this[_intervals] && this[_intervals].forEach(function (id) {
            GLOBAL.clearInterval(id);
        });
        this[_intervals] = null;
        this[_immediates] && this[_immediates].forEach(function (id) {
            GLOBAL.clearImmediate(id);
        });
        this[_immediates] = null;
        this[_rafs] && this[_rafs].forEach(function (id) {
            GLOBAL.cancelAnimationFrame(id);
        });
        this[_rafs] = null;

        this.ClearListener();
        this[_addListenerKey] = null;
    }
}