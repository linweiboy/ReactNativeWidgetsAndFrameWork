import { BaseInput } from "./BaseInput";
import { TextInput } from "./TextInput";
import { TimerTextInput } from "./business/TimerTextInput";
import { isNumber, isEnglish, isChinese,isMaxLength } from "./utils/verification";
import { SecureInput } from "./business/SecureInput";

export {
    BaseInput,
    TextInput,
    TimerTextInput,
    isNumber, isEnglish, isChinese,isMaxLength,
    SecureInput
}


/**
 * 
 * 
 * TextInput(系统)-->BaseInput->TextInput(对外)
 */