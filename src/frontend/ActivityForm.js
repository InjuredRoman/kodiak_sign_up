import React, {Component} from 'react';
import { Label, Container, Divider} from 'semantic-ui-react';
import {
    Form, Dropdown, 
  } from 'formsy-semantic-ui-react';

import {create_activity} from '../middleend/fetchers';
import {
    // DateInput,
    TimeInput,
    // DateTimeInput,
    DatesRangeInput
  } from 'semantic-ui-calendar-react';

export default class ActivityForm extends Component {
    validate() {
        return true;
    };

    onSubmit(event) {
        console.log(event);
        create_activity(event);
    };

    print_state() {
        console.log(this.state);
    }
    parse_time(t) {
        var time = t.substr(0, t.indexOf(" "));
        var suffix = t.substr(t.indexOf(" ")+1);
        var result;
        if (suffix === "AM") {
            result = time;
        } else if (suffix === "PM") {
            var hour = time.substr(0, time.indexOf(":"));
            var minute = time.substr(time.indexOf(":") + 1);
            hour = (parseInt(hour, 10) + 12).toString();
            result = hour + ":" + minute;
        }
        return result;
    }
    handleSubmit(event) {
        // console.log(event);
        var datesRange = this.state.datesRange;
        this.state.start_date = datesRange.substr(0, datesRange.indexOf("-")).trim() //.replace(/\//g, "-")
        this.state.end_date = datesRange.substr(datesRange.indexOf("-")+1).trim() //.replace(/\//g, "-")
        this.state.start_time = this.parse_time(this.state.start_time);
        this.state.end_time = this.parse_time(this.state.end_time);
        delete this.state.datesRange;
        //TODO: add real days of week field
        this.state.days_of_occurrence=[
            {"id":"1","day":"MON"},
            {"id":"2","day":"TUE"},
            {"id":"5","day":"FRI"}
        ];
        create_activity(this.state);
        this.form.reset();
    };

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
        this.state = {
            'title' : '',
            'youngest_enrolled' : '',
            'oldest_enrolled' : '',
            'start_date' : '',
            'end_date' : '',
            'days_of_occurrence' : '',
            'start_time' : '',
            'end_time' : '',
            'max_enrollment' : '',
            datesRange:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleChange(e, {name, value}) {
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
        var opts = {
            'a' : 'Unlimited Pool and Ice Rink Access (all ages, do not select again if you already have access)',
            'b' : 'Leather Crafting March 11-14 at KBM 3:30 - 5:30 p.m. Heritage Center Ages 6-18',
            'c' : 'KBM Spring Break Rock Climbing Club mornings (10 a.m. to noon) March 11-14 for students age 8-14',
            'd' : 'Spring Arts 2019',
            'd1' : 'Relief Printing with Hailey Davis, 10 a.m. to noon, March 11-15 for ages 8 - 11',
            'd2' : 'Explore Acrylics with Erica Ross, 1 - 3 p.m., March 11-15 for ages 8 - 11',
            'd3' : 'Theatre Games with the ShakesBears 10 a.m. to noon March for ages 9 - 12',
        };
        var options = [
            { text: opts['a'], value: 'a' },
            { text: opts['b'], value: 'b' },
            { text: opts['c'], value: 'c' },
            { text: opts['d'] + " - " + opts['d1'], value: 'd1' },
            { text: opts['d'] + " - " + opts['d2'], value: 'd2' },
            { text: opts['d'] + " - " + opts['d3'], value: 'd3' },
        ];
        var layoutChoice = 'vertical';
        // var s = this.onSubmit;
        var h = this.handleChange;
        var styles = {
            root: {
              marginTop: 18,
              // padding: '0 24px 24px 24px',
            },
          
            customErrorLabel: {
              color: '#f00',
              textAlign: 'center',
            },
          };
        return (
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
            // "id": 5,
            <Container>
                {/* <Form.Field
                    control={DatesRangeInput} */}

                <Form
                    ref={ ref => this.form = ref }
                    onSubmit={this.handleSubmit}
                    // layout={layoutChoice}
                >
                    <Form.Group widths="equal">
                    {/* First name */}
                    <Form.Input
                        onChange={h}
                        required
                        name="title"
                        label="Activity Title"
                        placeholder="Bowstaffing 101"
                        value={this.state.title}
                        validations="isWords"
                        errorLabel={ <Label color="red" pointing/> }
                        validationErrors={{
                            isWords: 'No numbers or special characters allowed',
                            isDefaultRequiredValue: 'Title is Required',
                        }}
                    />
                    {/* Last name */}
                    <Form.Input
                        onChange={h}
                        name="youngest_enrolled"
                        value={this.state.youngest_enrolled}
                        placeholder="10"
                        label="Youngest Allowed Age"
                        required
                        validations="isNumeric"
                        errorLabel={ <Label color="red" pointing/> }
                        validationErrors={{
                            isNumeric: 'Must be a number',
                            isDefaultRequiredValue: 'Age Minimum is Required',
                        }}
                    />
                    </Form.Group>


                    <Form.Input
                        onChange={h}
                        name="oldest_enrolled"
                        value={this.state.oldest_enrolled}
                        placeholder="15"
                        // icon="mail"
                        label="Oldest Allowed Age"
                        // required
                        validations="isNumeric"
                        validationErrors={{
                            isNumeric: 'Must be a number',
                            // isDefaultRequiredValue: 'Email is Required',
                        }}
                        errorLabel={ <Label color="red" pointing/> }
                    />
                    <Form.Field 
                        label="Date Range"
                        control={DatesRangeInput}
                        closable
                        name="datesRange"
                        dateFormat="MM/DD/YYYY"
                        placeholder="Start Date - End Date"
                        value={this.state.datesRange}
                        required
                        validationErrors={{
                            isDefaultRequiredValue: 'Date Range is Required',
                        }}
                        errorLabel={ <Label color="red" pointing/> }
                        iconPosition="left"
                        onChange={h}
                    />
                    <Form.Group widths='equal' >

                    <TimeInput
                        label="Start Time"
                        // control={TimeInput}
                        name="start_time"
                        timeFormat="AMPM"
                        // disableMinute={true}
                        closable
                        placeholder="Start Time"
                        value={this.state.start_time}
                        iconPosition="left"
                        onChange={h}
                        required
                        // validations="isWords"
                        errorLabel={ <Label color="red" pointing/> }
                        validationErrors={{
                            isDefaultRequiredValue: 'Start Time is Required',
                        }}
                    />
                    <Form.Field 
                        label="End Time"
                        required
                        errorLabel={ <Label color="red" pointing/> }
                        control={TimeInput}
                        name="end_time"
                        timeFormat="AMPM"
                        // disableMinute={true}
                        validationErrors={{
                            isDefaultRequiredValue: 'End Time is Required',
                        }}
                        // closable="true"
                        closable
                        placeholder="End Time"
                        value={this.state.end_time}
                        iconPosition="left"
                        onChange={h}
                    />
                    </Form.Group>
                    <Form.Input
                        onChange={h}
                        name="max_enrollment"
                        value={this.state.max_enrollment}
                        placeholder="25"
                        // icon="mail"
                        label="Maximum Enrollment"
                        // required
                        validations="isNumeric"
                        validationErrors={{
                            isNumeric: 'Must be a number',
                            // isDefaultRequiredValue: 'Email is Required',
                        }}
                        errorLabel={ <Label color="red" pointing/> }
                    />
                    <Form.Group>
                        <Form.Button content="Submit" color="green"/>
                        <Form.Button type="button" content="Reset" onClick={ () => this.form.reset() }/>
                    </Form.Group>
                </Form>

            </Container>
        );
    }

}

