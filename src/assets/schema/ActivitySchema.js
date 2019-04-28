import SimpleSchema from 'simpl-schema';

export const ActivitySchema = new SimpleSchema({
    title: {
        type: String,
    },
    youngest_enrolled: {
        type: SimpleSchema.Integer,
    },
    oldest_enrolled: {
        type: SimpleSchema.Integer,
    },
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
    },
    days_of_occurrence: {
        type: Array,
    },
    'days_of_occurrence.$': {
        type: String,
        allowedValues: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    },
    start_time: {
        type: String,
    },
    end_time: {
        type: String,
    },
    max_enrollment: SimpleSchema.Integer
});