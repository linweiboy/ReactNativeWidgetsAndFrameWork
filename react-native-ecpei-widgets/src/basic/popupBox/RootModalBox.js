/*
 * @Creator: TanLinWei 
 * @Date: 2018-11-09 17:03:01 
 * @Last Modified by: TanLinWei
 * @Last Modified time: 2018-11-09 17:11:05
 * @Desc: 
 */

import RootSiblings from 'react-native-root-siblings';

export default class RootModalBox {
    static show(CView, callBack = () => { }) {
        Siblings = new RootSiblings(CView, callBack, getReduxStore())
        Siblings.hidden = Siblings.destroy
        return Siblings
    }
    static hidden(sib, callback = () => { }) {
        return sib,sib.destroy && sib.destroy(callback)
    }
}