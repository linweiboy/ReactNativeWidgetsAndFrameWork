import { WebView, Platform } from 'react-native';
import { DevModule } from "../../Module";
// import {  } from "./WebViewFetch";
/**
 *  RN => (ios android)
 *  Web => h5
 *  拦截所有网络请求
 */
export default class AjaxIntercept extends DevModule {
    ws = ""
    logWeb = null;
    //接受网页的信息
    OnMessage = (e) => {
        try {
            let _target = e.nativeEvent.data;
            _target = JSON.parse(_target ? _target : "{}");
            let _params = _target.data ? _target.data : {};
            switch (_target.event) {
                case "NetWork":
                    this.logResult(_target.data)
                    break
            }
        } catch (error) { }
    }

    webinject = () => {
        let __this = this
        const oldComponent = WebView.prototype.componentDidMount
        WebView.prototype.componentDidMount = function (...args) {
            const OonMessage = Platform.OS == "ios" ? this._onMessage : this.onMessage
            if (Platform.OS == "ios") {
                this._onMessage = function (..._args) {
                    __this.OnMessage(..._args);
                    return OonMessage.bind(this)(..._args)
                }.bind(this)
            } else {
                this.onMessage = function (..._args) {
                    __this.OnMessage(..._args);
                    return OonMessage.bind(this)(..._args)
                }.bind(this)
            }


            const OonLoadingFinish = Platform.OS == "ios" ? this._onLoadingFinish : this.onLoadingFinish
            XMLHttpRequest
            jss = `
            !function(t){function r(i){if(n[i])return n[i].exports;var e=n[i]={exports:{},id:i,loaded:!1};return t[i].call(e.exports,e,e.exports,r),e.loaded=!0,e.exports}var n={};return r.m=t,r.c=n,r.p="",r(0)}([function(t,r,n){n(1)(window)},function(t,r){t.exports=function(t){t.hookAjax=function(t){function r(r){return function(){var n=this.hasOwnProperty(r+"_")?this[r+"_"]:this.xhr[r],i=(t[r]||{}).getter;return i&&i(n,this)||n}}function n(r){return function(n){var i=this.xhr,e=this,o=t[r];if("function"==typeof o)i[r]=function(){t[r](e)||n.apply(i,arguments)};else{var h=(o||{}).setter;n=h&&h(n,e)||n;try{i[r]=n}catch(t){this[r+"_"]=n}}}}function i(r){return function(){var n=[].slice.call(arguments);if(!t[r]||!t[r].call(this,n,this.xhr))return this.xhr[r].apply(this.xhr,n)}}return window._ahrealxhr=window._ahrealxhr||XMLHttpRequest,XMLHttpRequest=function(){this.xhr=new window._ahrealxhr;for(var t in this.xhr){var e="";try{e=typeof this.xhr[t]}catch(t){}"function"===e?this[t]=i(t):Object.defineProperty(this,t,{get:r(t),set:n(t)})}},window._ahrealxhr},t.unHookAjax=function(){window._ahrealxhr&&(XMLHttpRequest=window._ahrealxhr),window._ahrealxhr=void 0},t.default=t}}]);
            hookAjax(
                {
                    onreadystatechange: function (xhr) {
                        if(xhr.readyState == 4){
                            if(xhr.Result==null)xhr.Result={header:{}};
                            xhr.Result.end = new Date().getTime();
                            var contentType = xhr.getResponseHeader("content-type")||"";
                            if(contentType.toLocaleLowerCase().indexOf("json")!==-1){
                                xhr.Result.result=JSON.parse(xhr.responseText);
                            }else{
                                xhr.Result.result = xhr.responseText;
                            }
                            window.sendMessage('NetWork',JSON.stringify(xhr.Result));
                        }
                    },
                    onload: function (xhr) {
                        if(xhr.xhr.Result==null)xhr.xhr.Result={header:{}};
                        xhr.xhr.Result.end = new Date().getTime();
                        var contentType = xhr.xhr.getResponseHeader("content-type")||"";
                        if(contentType.toLocaleLowerCase().indexOf("json")!==-1){
                            xhr.xhr.Result.result=JSON.parse(xhr.xhr.responseText);
                        }else{
                            xhr.xhr.Result.result = xhr.xhr.responseText;
                        }
                        window.sendMessage('NetWork',JSON.stringify(xhr.xhr.Result));
                    },
                    open: function (arg, xhr) {
                        if(xhr.Result==null)xhr.Result={header:{},source:"H5"};
                        xhr.Result.medthod = arg[0];
                        xhr.Result.url = arg[1];
                    },
                    send: function (arg, xhr) {
                        if(xhr.Result==null)xhr.Result={header:{}};
                        data = arg[0];
                        if(data && typeof data == "string"){
                            res = data.split("&");
                            result = {};
                            res.map((item)=>{as = item.split("=");result[as[0]]=as[1]});
                            xhr.Result.sendData=result;
                        }else{
                            xhr.Result.sendData=arg[0];
                        }
                        
                        xhr.Result.start = new Date().getTime();
                    },
                    setRequestHeader: function (arg, xhr) {
                        if(xhr.Result==null)xhr.Result={header:{}};
                        xhr.Result.header[arg[0]] = arg[1];
                    },
                    timeout: {
                        setter: function (v, xhr) {
                            if(xhr.Result==null)xhr.Result={header:{}};
                            xhr.Result.timeout = timeout;
                            timeout = Math.max(v, 1000);
                            return timeout;
                        }
                    }
                }
            );                       
    `
            if (Platform.OS == "ios") {
                this._onLoadingFinish = function (..._args) {
                    this.injectJavaScript(jss)
                    return OonLoadingFinish.bind(this)(..._args)
                }.bind(this)
            } else {
                this.onLoadingFinish = function (..._args) {
                    this.injectJavaScript(jss);
                    return OonLoadingFinish.bind(this)(..._args)
                }.bind(this)
            }
            return oldComponent.bind(this)(...args)
            //onLoadEnd
        }

    }
    run = (isEnv, WebLog = {}) => {
        if (!isEnv) return;
        if (WebLog.disable == true) { return }
        this.ws = WebLog.websocket || "ws://172.18.0.128:8888"
        this.linkWebSocket();
        this.webinject();
        this.rnFetchinject();
        // this._rnFetchinject()
    }
    _rnFetchinject = () => {
        //看该文件执行时机
        // if(global.Response){}
    }
    rnFetchinject = () => {
        const _fetch = fetch.bind(this)
        global.fetch = (...args) => {
            let _start = new Date().getTime()
            return new Promise((resolve, reject) => {
                let url = args[0];
                let ops = args[1];
                _fetch(...args).then((response) => {
                    let _end = new Date().getTime()
                    let data = response.json();
                    data.then((data) => {
                        let __params = {
                            url: response.url,
                            ...ops,
                            result: data,
                            source: "RN",
                            start: _start,
                            end: _end
                        }
                        this.logResult(__params)
                    })
                    resolve({
                        headers: response.headers,
                        ok: response.ok,
                        status: response.status,
                        type: response.type,
                        url: response.url,
                        statusText: response.statusText,
                        json: () => { return data },
                        text: () => new Promise((resolve, reject) => { data.then(_data => { resolve(JSON.stringify(_data)) }) }),
                        blob: response.blob
                    })
                }).catch((error) => {
                    reject(new TypeError('Network request failed'))
                })
            })
        }
    }
    linkWebSocket = () => {
        this.logWeb = new WebSocket(this.ws)
        this.logWeb.onopen = function (e) { }
        this.logWeb.onerror = function (e) { }
        this.logWeb.onclose = function (e) { }
    }
    logResult = (result) => {
        try {
            this.logWeb.send(JSON.stringify(result))
        } catch (error) { }
    }
}