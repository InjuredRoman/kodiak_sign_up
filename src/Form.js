import React, {Component} from 'react';
import { Label, Container, Divider} from 'semantic-ui-react';
// import {withFormsy} from 'formsy-react';
// import PropTypes from 'prop-types';

/* eslint-disable import/extensions, import/no-unresolved, import/no-extraneous-dependencies */
// import {
//   Checkbox,
//   CheckboxGroup,
//   Input,
//   RadioGroup,
//   Row,
//   Select,
//   File,
//   Textarea,
//   Form,
// } from 'formsy-react-components';
import {
    Form, Input, TextArea, Checkbox, Radio, RadioGroup, Dropdown, Select, 
  } from 'formsy-semantic-ui-react';

export default class SignupForm extends Component{
    validate() {
        return true;
    };

    onSubmit(event) {
        console.log(event);
        this.setState(event, () => console.log(this.state));
    };

    handleSubmit(event) {
        console.log('hello');
        return;
    };

    constructor(props) {
        super(props);
        this.state = {
            'firstName' : '',
            'lastName' : '',
            'parentEmail' : '',
            'activities' : ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.MyForm = this.MyForm.bind(this);
    };
    

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
        var s = this.onSubmit;
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
            <Container>
                <Form
                    ref={ ref => this.form = ref }
                    onSubmit={s}
                    // layout={layoutChoice}
                >
                    <Form.Group widths="equal">
                    {/* First name */}
                    <Form.Input
                        required
                        name="firstName"
                        label="Child's First name"
                        placeholder="First Name"
                        validations="isWords"
                        errorLabel={ <Label color="red" pointing/> }
                        validationErrors={{
                            isWords: 'No numbers or special characters allowed',
                            isDefaultRequiredValue: 'First Name is Required',
                        }}
                    />
                    {/* Last name */}
                    <Form.Input
                        name="lastName"
                        placeholder="Last name"
                        label="Child's Last name"
                        required
                        validations="isWords"
                        errorLabel={ <Label color="red" pointing/> }
                        validationErrors={{
                            isWords: 'No numbers or special characters allowed',
                            isDefaultRequiredValue: 'Last Name is Required',
                        }}
                    />
                    </Form.Group>

                    <Divider/>

                    {/* parent email */}
                    <Form.Input
                        name="parentEmail"
                        placeholder="Email"
                        icon="mail"
                        label="Parent/Guardian Email"
                        required
                        validations="isEmail"
                        validationErrors={{
                            isEmail: 'This is not a valid email',
                            isDefaultRequiredValue: 'Email is Required',
                        }}
                        errorLabel={ <Label color="red" pointing/> }
                        style={ styles.formElement }
                    />
                    <Divider/>
                    <Dropdown
                        name="dropdownMultiple"
                        label="Activities For Enrollment"
                        placeholder="Select Activity"
                        multiple
                        search
                        selection
                        validations={{
                            customValidation: (values, value) => !(!value || value.length < 1),
                        }}
                        validationErrors={{
                            customValidation: 'Please select at least one activity',
                        }}
                        errorLabel={ <Label color="red" pointing/> }
                        options={ options }
                    />
                    <Form.Group>
                        <Form.Button content="Submit" color="green" />
                        <Form.Button type="button" content="Reset" onClick={ () => this.form.reset() }/>
                    </Form.Group>
                </Form>

            </Container>
        );
    }

}

