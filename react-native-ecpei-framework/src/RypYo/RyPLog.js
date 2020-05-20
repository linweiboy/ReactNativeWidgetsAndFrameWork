

/**
 * 
 * @param {*} args 
 * 日志打印 在调试模式下
 */
export default function Log(...args){
    if(__DEV__){
        console.log(...args)
    }
}