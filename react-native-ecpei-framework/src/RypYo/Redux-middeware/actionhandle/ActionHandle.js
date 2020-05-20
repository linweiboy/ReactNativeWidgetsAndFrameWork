
import _AHandle from "./action";


export function combineTypes(...types) { return types.join("_|_") }

export function ActionHandle(ActionType, handle) {
    return new _AHandle(ActionType, handle)
}


export function CreateReduxcer(typeHandles, initState) {
    const Map = {}
    function SearchHandleBy(type) {
        _type = type.split("_")[0];
        let handle = Map[_type];
        if (handle) return handle;
        handle = typeHandles.filter((hanle) => {
            return hanle.type.REQUEST.indexOf(_type) == 0
        }).pop()
        if (handle) Map[_type] = handle;
        return handle;
    }

    return function (state = initState, action) {
        if (action.type && action.type.indexOf("_") >= 0) {
            let Ahandle = SearchHandleBy(action.type);
            return Ahandle ? (Ahandle.handle(state, action) || state) : state
        } else {
            return state
        }
    }
}


