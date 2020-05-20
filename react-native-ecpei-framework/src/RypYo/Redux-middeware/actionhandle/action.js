


export const ActionTypes = {
    REQUEST: "REQUEST",
    PENDING: "PENDING",
    FAILURE: "FAILURE",
    SUCCESS: "SUCCESS",
    RESET: "RESET"
}

export default class _AHandle {
    type = null;
    _handle = null;
    constructor(type, handle) {
        this.type = type;
        if (typeof handle == "function") {
            this._handle = handle(ActionTypes);
        } else {
            this._handle = handle;
        }
        this.map = {}
        Object.keys(this._handle).map((key) => {
            let han = this._handle[key];
            if (key.indexOf("_|_") >= 0) {
                let _keys = key.split("_|_");
                _keys.map((__key) => {
                    this.map[__key] = han;
                })
            } else {
                this.map[key] = han;
            }
        })

    }
    handle(state, action) {
        let tyH = this.map[action.type.split("_")[1]];
        return typeof tyH == "function" ? tyH(state, action) : (tyH ? tyH : state);
    }
}