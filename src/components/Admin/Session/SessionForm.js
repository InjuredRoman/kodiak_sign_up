import React, { Component } from 'react';

import { ActivitySchema } from 'assets/schema/ActivitySchema';

import { create_activity } from 'middleend/fetchers';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import CustomTimePickerInline from 'components/utils/CustomTimePickerInline';
import CustomDatePickerInline from 'components/utils/CustomDatePickerInline';
import {withSnackbar} from 'notistack';

import format from 'date-fns/format';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import SuperSelectField from 'material-ui-superselectfield';

import AutoForm from 'uniforms-material/AutoForm';
import AutoField from 'uniforms-material/AutoField';
import TextField from 'uniforms-material/TextField';
import DateField from 'uniforms-material/DateField';
import SelectField from 'uniforms-material/SelectField';
import SubmitField from 'uniforms-material/SubmitField';
import NumField from 'uniforms-material/NumField';
import ErrorsField from 'uniforms-material/ErrorsField';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        // [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        //     width: 400,
        //     marginLeft: 'auto',
        //     marginRight: 'auto',
        // },
    },
    cardHeader: {
        backgroundColor: theme.palette.primary.main,
        fontColor: theme.palette.common.white
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
            3}px ${theme.spacing.unit * 3}px`,
    },
    root: {
      flexGrow: 1,
    },
    cssFocused: {},
    // notchedOutline: {
    //     // backgroundColor: '#FFFFFF',
    // },
    // cssOutlinedInput: {
    //     '&$cssFocused $notchedOutline': {
        //   borderColor: "purple",
    //     },
    // },
    // paper: {
    //   padding: theme.spacing.unit * 2,
    //   textAlign: 'center',
    //   color: theme.palette.text.secondary,
    // },
    field: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    menuItem: {
        '&:focus': {
          backgroundColor: theme.palette.primary.main,
          '& $primary, & $icon': {
            color: theme.palette.common.white,
          },
        },
    },
    submit: {
        backgroundColor: theme.palette.secondary.main,
        marginTop: theme.spacing.unit * 3,
        // fontColor: "#FFFFFF",
    },
  });


class SessionForm extends Component {
    validate() {
        return true;
    }

    onSubmit(event) {
        // console.log(event);
        create_activity(event);
    }
    successSnackbar() {
        this.props.enqueueSnackbar(
                'Successfully created activity!',
                { variant: 'success' }
        );
    }

    failSnackbar() {
        this.props.enqueueSnackbar(
                'Sorry, something seems to have gone wrong.',
                { variant: 'error' }
        );
    }

    handleSubmit(form_info) {
        // console.log(form_info);
        form_info.start_date = format(new Date(form_info.start_date), 'MM/dd/yyyy');
        form_info.end_date = format(new Date(form_info.end_date), 'MM/dd/yyyy');
        form_info.start_time = format(new Date(form_info.start_time), 'HH:mm:ss.SSS');
        form_info.end_time = format(new Date(form_info.end_time), 'HH:mm:ss.SSS');
        // console.log(form_info);
        create_activity(form_info, (data) => (this.successSnackbar()), (err) => (this.failSnackbar()));
    }

    constructor(props) {
        super(props);
        // "title": "Activity 4",
        // "youngest_enrolled": 2
        // "oldest_enrolled": 2,
        // "start_date": "2019-04-04",
        // "end_date": "2019-04-04",
        // "days_of_occurrence": [],
        // "start_time": "18:38:04.950703",
        // "end_time": "18:38:04.950727",
        // "max_enrollment": 2,
        // "enrolled_students": [
        //     5,
        //     5,
        //     10,
        //     10
        // ],
        const now = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate()+14);
        this.state = {
            title: '',
            youngest_enrolled: '',
            oldest_enrolled: '',
            start_date: now,
            end_date: nextWeek,
            days_of_occurrence: '',
            start_time: "2018-01-01T20:00:00.000Z",
            end_time: "2018-01-01T00:00:00.000Z",
            max_enrollment: '',
            datesRange: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e, { name, value }) {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
        console.log(name, value);
        // this.setState({[name]:value}, this.print_state)
    }

    render() {
        const dayOptions = [
            {
                key: 0,
                label: 'Monday',
                value: 'MON',
            },
            {
                key: 1,
                label: 'Tuesday',
                value: 'TUE',
            },
            {
                key: 2,
                label: 'Wednesday',
                value: 'WED',
            },
            {
                key: 3,
                label: 'Thursday',
                value: 'THU',
            },
            {
                key: 4,
                label: 'Friday',
                value: 'FRI',
            },
            {
                key: 5,
                label: 'Saturday',
                value: 'SAT',
            },
            {
                key: 6,
                label: 'Sunday',
                value: 'SUN',
            },
        ];
        var valueToLabelMap = {};
        dayOptions.map((day) => {
            valueToLabelMap[day.value] = day.label;
            return;
        });
        var layoutChoice = 'vertical';
        // var s = this.onSubmit;
        var h = this.handleChange;
        const {classes} = this.props;
        const loginForm =
            <AutoForm
                schema={ActivitySchema}
                onSubmit={data=> this.handleSubmit(data)}
                onChange={(key, value) => console.log(key, value)}
            >
            <GridContainer justify="center">

               <GridItem xs={9}>
                    <TextField
                        className={classes.field}
                        name="title"
                        label="Session Title"
                        // variant="outlined"
                        fullWidth
                        showInlineError={true}
                    />
               </GridItem>
               <GridItem xs={3}>
                    <TextField
                        className={classes.field}
                        name="group_code"
                        label="Group Code"
                        // variant="outlined"
                        fullWidth
                        showInlineError={true}
                    />
               </GridItem>
               <GridItem xs={9}>
                    <NumField
                        className={classes.field}
                        name="max_enrollment"
                        label="Maximum Allowed Enrolled"
                        variant="outlined"
                        fullWidth
                        showInlineError={true}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
               </GridItem>
               <GridItem xs={5}>
                    <NumField
                        className={classes.field}
                        name="youngest_enrolled"
                        label="Youngest to Enroll"
                        variant="outlined"
                        fullWidth
                        showInlineError={true}

                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </GridItem>
               <GridItem xs={5}>
                    <NumField
                        showInlineError={true}
                        className={classes.field}
                        name="oldest_enrolled"
                        label="Oldest to Enroll"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </GridItem>
               <GridItem xs={5}>
                    <CustomDatePickerInline
                        keyboard
                        className={classes.field}
                        name="start_date"
                        label="Start Date"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
               </GridItem>
               <GridItem xs={5}>
                    <CustomDatePickerInline
                        keyboard
                        // showInlineError={true}
                        className={classes.field}
                        name="end_date"
                        label="End Date"
                        variant="outlined"
                        fullWidth
                    />
               </GridItem>
               <GridItem xs={5}>
                    <CustomTimePickerInline
                        keyboard
                        keyboardIcon={<AccessTimeOutlinedIcon/>}
                        showInlineError={true}
                        className={classes.field}
                        name="start_time"
                        label="Start Time"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    /> 
               </GridItem>
               <GridItem xs={5}>
                    <CustomTimePickerInline
                        keyboard
                        keyboardIcon={<AccessTimeOutlinedIcon/>}
                        showInlineError={true}
                        className={classes.field}
                        name="end_time"
                        label="End Time"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
               </GridItem>
               <GridItem xs={9}>
                    <SelectField
                        showInlineError={true}
                        name="days_of_occurrence"
                        options={dayOptions}
                    />
               </GridItem>
               <GridItem xs={4} style={{fontColor:"#FFFFFF"}}>
                <SubmitField
                    fullWidth
                    value="Create Activity"
                    className={classes.submit}
                />
                <ErrorsField />
               </GridItem>

            </GridContainer>

            </AutoForm>
        return (
        <div className={classes.main}>
        <Paper className={classes.paper}>
                <Typography variant="h2" gutterBottom>
                    New Session
                </Typography>
                {loginForm}

        </Paper>
        </div>
        );
    }
}
export default withStyles(styles)(withSnackbar(SessionForm));