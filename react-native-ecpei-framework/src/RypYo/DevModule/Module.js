export class DevModule {
    isRun = false
    configName = "";
    constructor(devname){
        this.configName = devname;
    }
    run(isEnv,config){}
}

class _DevModuleManager {
    isEnv = false
    modules = []
    config = {}
    constructor() {
        if (process && process.env) {
            this.isEnv = process.env.NODE_ENV == "development" && __DEV__
        }
    }
    setConfig(config){
        this.config = config || {};
    }
    addModule(module) {
        if (module instanceof DevModule) {
            this.modules.push(module)
            if (!module.isRun) {
                module.run && module.run.call && module.run(this.isEnv,this.config[module.configName])
                module.isRun = true
            }

        }
    }
    // removeModule(module) {
    //     index = this.modules.indexOf(module)
    //     this.modules.splice(index, 1)
    // }
}

export default DevModuleManager = new _DevModuleManager()


