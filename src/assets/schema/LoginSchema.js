import SimpleSchema from 'simpl-schema';

export const LoginSchema = new SimpleSchema({
    username: {
        type: String,
        regEx: SimpleSchema.RegEx.EmailWithTLD,
    },
    password: {
        type: String,
    },
});
