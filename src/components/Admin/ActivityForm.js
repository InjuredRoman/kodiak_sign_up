import React, { Component } from 'react';

import { ActivitySchema } from 'assets/schema/ActivitySchema';
// import { Label, Container, Divider } from 'semantic-ui-react';
// import { Form, Dropdown } from 'formsy-semantic-ui-react';

import { create_activity } from 'middleend/fetchers';
// import {
//     // DateInput,
//     TimeInput,
//     // DateTimeInput,
//     DatesRangeInput,
// } from 'semantic-ui-calendar-react';
// import Card from 'components/Card/Card.jsx';
// import CardHeader from 'components/Card/CardHeader.jsx';
// import CardBody from 'components/Card/CardBody.jsx';
// import CardFooter from 'components/Card/CardFooter.jsx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import CustomTimePickerInline from 'components/utils/CustomTimePickerInline';
import CustomDatePickerInline from 'components/utils/CustomDatePickerInline';

import format from 'date-fns/format';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import DatePickerInline from "material-ui-pickers/DatePicker/DatePickerInline";
import TimePickerInline from "material-ui-pickers/TimePicker/TimePickerInline";
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


class ActivityForm extends Component {
    validate() {
        return true;
    }

    onSubmit(event) {
        console.log(event);
        create_activity(event);
    }

    print_state() {
        console.log(this.state);
    }
    parse_time(t) {
        var time = t.substr(0, t.indexOf(' '));
        var suffix = t.substr(t.indexOf(' ') + 1);
        var result;
        if (suffix === 'AM') {
            result = time;
        } else if (suffix === 'PM') {
            var hour = time.substr(0, time.indexOf(':'));
            var minute = time.substr(time.indexOf(':') + 1);
            hour = (parseInt(hour, 10) + 12).toString();
            result = hour + ':' + minute;
        }
        return result;
    }
    handleSubmit(form_info) {
        // console.log(form_info);
        form_info.start_date = format(new Date(form_info.start_date), 'MM/dd/yyyy');
        form_info.end_date = format(new Date(form_info.end_date), 'MM/dd/yyyy');
        form_info.start_time = format(new Date(form_info.start_time), 'HH:mm:ss.SSS');
        form_info.end_time = format(new Date(form_info.end_time), 'HH:mm:ss.SSS');
        console.log(form_info);
        // console.log(event);
        // var datesRange = this.state.datesRange;
        // this.state.start_date = datesRange
        //     .substr(0, datesRange.indexOf('-'))
        //     .trim(); //.replace(/\//g, "-")
        // this.state.end_date = datesRange
        //     .substr(datesRange.indexOf('-') + 1)
        //     .trim(); //.replace(/\//g, "-")
        // this.state.start_time = this.parse_time(this.state.start_time);
        // this.state.end_time = this.parse_time(this.state.end_time);
        // delete this.state.datesRange;
        create_activity(form_info,
            (data)=>console.log(data));
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
    // handleChange = (event, {name, value}) => {
    //     if (this.state.hasOwnProperty(name)) {
    //         this.setState({ [name]: value });
    //         console.log(name, value);
    //     }
    // }

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
                        // InputProps={{
                        //     classes: {
                        //         root: classes.cssOutlinedInput,
                        //         focused: classes.cssFocused,
                        //         notchedOutline: classes.notchedOutline,
                        //     },
                        // }}
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
                        // InputProps={{
                        //     classes: {
                        //         root: classes.cssOutlinedInput,
                        //         focused: classes.cssFocused,
                        //         notchedOutline: classes.notchedOutline,
                        //     },
                        // }}
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
                        // showInlineError={true}
                        className={classes.field}
                        name="start_date"
                        // maxDate={this.state.end_date} 
                        // value={this.state.start_date} 
                        // myOnChange={(e) => this.setState({a: "eeeee"}, () => console.log("aaaa"))}
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
                        // minDate={this.state.start_date} 
                        // value={this.state.end_date} 
                        // myOnChange={end => this.setState({end_date: end})} 
                        label="End Date"
                        variant="outlined"
                        fullWidth
                        // InputLabelProps={{
                        //     shrink: true,
                        // }}
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
                        // value={this.state.start_time}
                        // onChange={start => this.setState({start_time: start})} 
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
                        // value={this.state.end_time}
                        // onChange={end => this.setState({end_time: end})} 
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
            // </CardHeader>
            // <CardBody>
            //         {loginForm}
            // {/* </CardBody>
            // <CardFooter>
            // </CardFooter>
        // </Card> */}
            // <Container>
            //     <Form
            //         ref={ref => (this.form = ref)}
            //         onSubmit={this.handleSubmit}
            //     >
            //         <Form.Group widths="equal">
            //             <Form.Input
            //                 onChange={h}
            //                 required
            //                 name="title"
            //                 label="Activity Title"
            //                 placeholder="Bowstaffing 101"
            //                 value={this.state.title}
            //                 validations="isWords"
            //                 errorLabel={<Label color="red" pointing />}
            //                 validationErrors={{
            //                     isWords:
            //                         'No numbers or special characters allowed',
            //                     isDefaultRequiredValue: 'Title is Required',
            //                 }}
            //             />
            //             {/* Last name */}
            //             <Form.Input
            //                 onChange={h}
            //                 name="youngest_enrolled"
            //                 value={this.state.youngest_enrolled}
            //                 placeholder="10"
            //                 label="Youngest Allowed Age"
            //                 required
            //                 validations="isNumeric"
            //                 errorLabel={<Label color="red" pointing />}
            //                 validationErrors={{
            //                     isNumeric: 'Must be a number',
            //                     isDefaultRequiredValue:
            //                         'Age Minimum is Required',
            //                 }}
            //             />
            //         </Form.Group>

            //         <Form.Input
            //             onChange={h}
            //             name="oldest_enrolled"
            //             value={this.state.oldest_enrolled}
            //             placeholder="15"
            //             // icon="mail"
            //             label="Oldest Allowed Age"
            //             // required
            //             validations="isNumeric"
            //             validationErrors={{
            //                 isNumeric: 'Must be a number',
            //                 // isDefaultRequiredValue: 'Email is Required',
            //             }}
            //             errorLabel={<Label color="red" pointing />}
            //         />
            //         <Form.Group widths="equal">
            //             <Form.Field
            //                 label="Date Range"
            //                 control={DatesRangeInput}
            //                 closable
            //                 name="datesRange"
            //                 dateFormat="MM/DD/YYYY"
            //                 placeholder="Start Date - End Date"
            //                 value={this.state.datesRange}
            //                 required
            //                 validationErrors={{
            //                     isDefaultRequiredValue:
            //                         'Date Range is Required',
            //                 }}
            //                 errorLabel={<Label color="red" pointing />}
            //                 iconPosition="left"
            //                 onChange={h}
            //             />
            //             <Form.Dropdown
            //                 label="Days of Week"
            //                 name="days_of_occurrence"
            //                 placeholder="Days Activity Occurs"
            //                 fluid
            //                 multiple
            //                 search
            //                 selection
            //                 options={dayOptions}
            //                 onChange={h}
            //                 value={this.state.days_of_occurrence}
            //             />
            //         </Form.Group>
            //         <Form.Group widths="equal">
            //             <TimeInput
            //                 label="Start Time"
            //                 // control={TimeInput}
            //                 name="start_time"
            //                 timeFormat="AMPM"
            //                 // disableMinute={true}
            //                 closable
            //                 placeholder="Start Time"
            //                 value={this.state.start_time}
            //                 iconPosition="left"
            //                 onChange={h}
            //                 required
            //                 // validations="isWords"
            //                 errorLabel={<Label color="red" pointing />}
            //                 validationErrors={{
            //                     isDefaultRequiredValue:
            //                         'Start Time is Required',
            //                 }}
            //             />
            //             <Form.Field
            //                 label="End Time"
            //                 required
            //                 errorLabel={<Label color="red" pointing />}
            //                 control={TimeInput}
            //                 name="end_time"
            //                 timeFormat="AMPM"
            //                 // disableMinute={true}
            //                 validationErrors={{
            //                     isDefaultRequiredValue: 'End Time is Required',
            //                 }}
            //                 // closable="true"
            //                 closable
            //                 placeholder="End Time"
            //                 value={this.state.end_time}
            //                 iconPosition="left"
            //                 onChange={h}
            //             />
            //         </Form.Group>
            //         <Form.Input
            //             onChange={h}
            //             name="max_enrollment"
            //             value={this.state.max_enrollment}
            //             placeholder="25"
            //             // icon="mail"
            //             label="Maximum Enrollment"
            //             // required
            //             validations="isNumeric"
            //             validationErrors={{
            //                 isNumeric: 'Must be a number',
            //                 // isDefaultRequiredValue: 'Email is Required',
            //             }}
            //             errorLabel={<Label color="red" pointing />}
            //         />
            //         <Form.Group>
            //             <Form.Button content="Submit" color="green" />
            //             <Form.Button
            //                 type="button"
            //                 content="Reset"
            //                 onClick={() => this.form.reset()}
            //             />
            //         </Form.Group>
            //     </Form>
            // </Container>
        );
    }
}
export default withStyles(styles)(ActivityForm);