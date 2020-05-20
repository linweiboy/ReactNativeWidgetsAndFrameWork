

class _DropManager {
    DropSection = {}

    /**
     * 
     * @param {*} type  1 = 头部  2 = 内容
     * @param {*} key 一组 key
     * @param {*} ref 组件实例
     */
    addPart(type, key, ref) {
        if (type == 1) {
            let Section = this.DropSection[key] || {};
            Section["header"] = ref
            this.DropSection[key] = Section
        } else if (type == 2) {
            let Section = this.DropSection[key] || {};
            Section["content"] = ref
            this.DropSection[key] = Section
        }
    }
    /**
     * 
     * @param {*} type 1 = 头部  2 = 内容
     * @param {*} key 一组 key
     */
    removePart(type, key) {
        if (type == 1) {
            let Section = this.DropSection[key]
            if (Section) Section["header"] = null;
        } else if (type == 2) {
            let Section = this.DropSection[key]
            if (Section) Section["content"] = null
        }
    }
    toggleContent(key, toggle, layout, options) {
        let Section = this.DropSection[key]
        if (Section) {
            let Content = Section["content"];
            Content && Content.toggleContent(toggle, layout, options)
        }
    }
    HandleResult(key,result){
        let Section = this.DropSection[key]
        if (Section) {
            let Content = Section["header"];
            Content && Content.HandleResult(result)
        }
    }
}

export const DropManager = new _DropManager();