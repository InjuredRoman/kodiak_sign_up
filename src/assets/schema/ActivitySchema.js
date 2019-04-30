import SimpleSchema from 'simpl-schema';

export const ActivitySchema = new SimpleSchema({
    title: {
        type: String,
    },
    group_code: {
        type: String,
        max: 15,
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
        type: Date,
    },
    end_time: {
        type: Date,
    },
    max_enrollment: SimpleSchema.Integer
});