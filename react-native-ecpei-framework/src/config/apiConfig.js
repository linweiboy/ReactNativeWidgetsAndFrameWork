
// import type, { Action } from '../actions/types';
// import { APP_CHECK_VERSION } from '../actions/appInfo';
import { appConfig, AppVersionType } from "./appConfig";

export type State = {
    api: object
}


var api = {
    beta: {
        gUrl: "https://g-api-test-" + appConfig.serverApi.mode + ".ecpei.cn",
        oUrl: "https://o-api-test-" + appConfig.serverApi.mode + ".ecpei.cn",
        uUrl: "https://u-api-test-" + appConfig.serverApi.mode + ".ecpei.cn",
        msgUrl: "https://message-api-test-" + appConfig.serverApi.mode + ".ecpei.cn",
        vinUrl: "https://vin-api-test-" + appConfig.serverApi.mode + ".ecpei.cn",
        mUrl: "https://m-test-1-0-1.ecpei.cn/",
        registerUrl: "https://u-api-test.ecpei.cn",
        sUrl: "https://s-api-test-" + appConfig.serverApi.mode + ".ecpei.cn",
        wxUrl: "https://api-test.ecpei.cn",
    },
    release: {
        gUrl: "https://g-api.ecpei.cn",
        oUrl: "https://o-api.ecpei.cn",
        uUrl: "https://u-api.ecpei.cn",
        msgUrl: "https://message-api.ecpei.cn",
        vinUrl: "https://vin-api.ecpei.cn",
        mUrl: "https://m-test-1-0-1.ecpei.cn/",
        registerUrl: "https://u-api-test.ecpei.cn",
        sUrl: "https://s-api.ecpei.cn",
        wxUrl: "https://api.ecpei.cn",
    },
    current: {
        gUrl: "",
        oUrl: "",
        uUrl: "",
        msgUrl: "",
        vinUrl: "",
        mUrl: "",
        registerUrl: "",
        sUrl: "",
        wxUrl: "",
    }
}

const initialState = {
    api: api
};

export default function (state: State = initialState, action): State {
    return state;
}

// export const str = 'hello world'
if (appConfig.mode == "beta") {

    api.current = api.beta;
} else {
    api.current = api.release;
}
// alert(api.current);
export const apiConfig = api


// module.exports = { apiConfig }