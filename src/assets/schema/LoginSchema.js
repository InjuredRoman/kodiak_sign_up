import SimpleSchema from 'simpl-schema';

export const LoginSchema = new SimpleSchema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
});
