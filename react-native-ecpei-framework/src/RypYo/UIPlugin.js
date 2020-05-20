import { Assets } from "./Assets";

export class UIPlugin {
    name = "UIPlugin"
    // state = null;
    props = null;
    component = null
    constructor(ops) {
        if (!!ops == false) return
        this.name = ops.name || "UIPlugin";
        // this.state = ops.state;
        this.props = ops.props;
        this.component = ops.component;
    }
    getComponent() {
        return this.component;
    }
}


class _UIPluginManager {
    container = null;
    plugins = {}
    addPlugin(plugin) {
        Assets(plugin instanceof UIPlugin, `${plugin} shoudle be is a UIPlugin instance`);
        this.plugins[plugin.name] = plugin;
        this.updateContainer();
    }
    /**
     *  需要强制刷新容器
     */
    updateContainer() {
        this.container && this.container.setState && this.container.setState({})
    }
    removePlugin(plugin) {
        Assets(plugin instanceof UIPlugin, `${plugin} shoudle be is a UIPlugin instance`);
        let plugins = Object.values(this.plugins);
        let index = plugins.indexOf(plugin);
        if (index >= 0) {
            let name = plugins[index].name;
            delete this.plugins[name];
            this.updateContainer();
        }
    }
    setPluginContainer(container) {
        Assets(container !== null, `${container} 不能为空`);
        this.container = container;
    }
    getPluginInstance(name) {
        return this.container.refs[name]
    }
    emitEvent(pluginOrName, data) {
        let plugin = pluginOrName;
        if (typeof pluginOrName == "string") {
            plugin = this.plugins[pluginOrName];
        }
        if (!plugin) return
        let noUpate = plugin.emit(data);
        !noUpate && this.updateContainer()
    }
}

export const UIPluginManager = new _UIPluginManager();