

export function Assets(ops, message) {
    if (!__DEV__) return;
    if (typeof ops == "boolean") {
        if (ops == false) throw new Error(message);
    } else if (typeof ops == "function") {
        if (ops()) throw new Error(message);
    } else if (!!ops) {
        throw new Error(message);
    }
}