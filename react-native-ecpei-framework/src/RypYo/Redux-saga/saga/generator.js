


/**
 *  判断是否为Generator函数 function *(){}
 * @param {*} target 
 */
export const isGenerator = function(target){
    return target.constructor.name == "GeneratorFunction"
}