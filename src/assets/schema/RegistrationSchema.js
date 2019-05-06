import SimpleSchema from 'simpl-schema';
// SimpleSchema.messageBox.messages({
//     en: {
//       passwordMismatch: 'Passwords do not match',
//     },
// });

export const RegistrationSchema = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.EmailWithTLD
    },
    password: {
        type: String,
        label: "Enter a password",
        min: 8
    },
    password2: {
        type: String,
        label: "Confirm password",
        min: 8,
        custom() {
            if (this.value !== this.field('password').value) {
              return "passwordMismatch";
            }
        },
    },
});
