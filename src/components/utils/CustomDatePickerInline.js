// Remember to choose a correct theme package
import React from 'react';
import connectField from 'uniforms/connectField';
import DatePickerInline from "material-ui-pickers/DatePicker/DatePickerInline";

const CustomDPI = ({fieldType,errorMessage,validating,showInlineError,changedMap,findValue,findError,findField,changed,submitting,myOnChange,...others}) => {
    // This way we don't care about unhandled cases - we use default
    // AutoField as a fallback component.
    return (
        <DatePickerInline 
            // initialFocusedDate={new Date()}
            // onChange={(e) =>{ console.log(e); others.onChange(e); }}
            {...others} 
        />
    );
};
const CustomDatePickerInline = connectField(CustomDPI, {
    ensureValue:    false,
    includeInChain: true,
    initialValue:   false

});

export default CustomDatePickerInline;