
export type State = {
    mode: object,
    setting: object,
    serverApi: object
}

export const AppVersionType = {
    Beta: "beta",
    Release: "release",
}

var initialState = {
    mode: AppVersionType.Beta,
    serverApi: {
        version: "1.0.3",//接口服务当前使用的版本号
        mode: "1-0-3" //接口服务域名版本，测试接口需要。
    },
    setting: {
        
    }
};

export default function (state: State = initialState, action): State {
    return state;
}

export var appConfig = initialState;


export function setInitAppConfig(initAppConfig) {
    initialState = Object.assign(initialState, initAppConfig);
    return appConfig = initialState;
}


// module.exports = { appConfig }