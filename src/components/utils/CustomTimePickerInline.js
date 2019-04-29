// Remember to choose a correct theme package
import React from 'react';
import connectField from 'uniforms/connectField';
import TimePickerInline from "material-ui-pickers/TimePicker/TimePickerInline";

const CustomTPI = ({fieldType,errorMessage,validating,showInlineError,changedMap,findValue,findError,findField,changed,submitting, ...others}) => {
    // This way we don't care about unhandled cases - we use default
    // AutoField as a fallback component.
    return (
        <TimePickerInline 
            // initialFocusedDate={new Date()}
            clearable
            minutesStep={5}
            {...others} 
        />
    );
};
const CustomTimePickerInline = connectField(CustomTPI, {
    ensureValue:    false,
    includeInChain: true,
    initialValue:   false

});

export default CustomTimePickerInline;