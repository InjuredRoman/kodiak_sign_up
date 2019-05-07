import React, { Component } from 'react';
import { Label, Container, Divider } from 'semantic-ui-react';
import { fetch_all_activities, create_enrollment } from 'middleend/fetchers';
import { Form, Dropdown } from 'formsy-semantic-ui-react';
export default class Signup extends Component {
    validate() {
        return true;
    }

    onSubmit(event) {
        console.log(event);
        this.setState(event);
        create_enrollment(event, response => {
            this.setState(
                {
                    child_first_name: '',
                    child_last_name: '',
                    parent_email: '',
                    activities: '',
                    response: response,
                },
                this.form.reset()
            );
        });
    }

    handleSubmit(event) {
        console.log('hello');
        return;
    }

    constructor(props) {
        super(props);
        this.state = {
            child_first_name: '',
            child_last_name: '',
            parent_email: '',
            activities: '',
            possible_activities: '',
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.different = this.different.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.MyForm = this.MyForm.bind(this);
    }

    organize_options(activities) {
        var possible_activities;
        if (activities == null) {
            possible_activities = [];
        } else {
            possible_activities = activities.map((a, index) => ({
                key: index,
                text: a.title,
                value: a.id,
            }));
            this.setState(
                { possible_activities: possible_activities },
                console.log(this.state)
            );
        }
    }

    componentDidMount() {
        fetch_all_activities(
            response => {
                this.organize_options(response);
            },
            error => {
                this.setState({ placeholder: 'Something went wrong.' });
            }
        );
    }

    print_state() {
        console.log(this.state);
    }

    filterActivities(age) {
        // TODO: Filter the options list by the age depending on what age is put in
        console.log(age);
        // options = getOptions() <- get options from backend/database/???
        // iterate / map through options, get age ranges and filter options that fit the age criteria
        return age
    }

    handleChange(e) {
        const { value, name } = e.target;
        this.setState({ [name]: value }, this.print_state);
        if (name === 'age') {
            this.filterActivities(value);
        }
    }

    different(e) {
        console.log(e);
    }
    render() {
        var opts = {
            a:
                'Unlimited Pool and Ice Rink Access (all ages, do not select again if you already have access)',
            b:
                'Leather Crafting March 11-14 at KBM 3:30 - 5:30 p.m. Heritage Center Ages 6-18',
            c:
                'KBM Spring Break Rock Climbing Club mornings (10 a.m. to noon) March 11-14 for students age 8-14',
            d: 'Spring Arts 2019',
            d1:
                'Relief Printing with Hailey Davis, 10 a.m. to noon, March 11-15 for ages 8 - 11',
            d2:
                'Explore Acrylics with Erica Ross, 1 - 3 p.m., March 11-15 for ages 8 - 11',
            d3:
                'Theatre Games with the ShakesBears 10 a.m. to noon March for ages 9 - 12',
        };
        var options = [
            { text: opts['a'], value: 'a' },
            { text: opts['b'], value: 'b' },
            { text: opts['c'], value: 'c' },
            { text: opts['d'] + ' - ' + opts['d1'], value: 'd1' },
            { text: opts['d'] + ' - ' + opts['d2'], value: 'd2' },
            { text: opts['d'] + ' - ' + opts['d3'], value: 'd3' },
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
            <Container>
                <Form
                    ref={ref => (this.form = ref)}
                    onSubmit={this.onSubmit}
                    // layout={layoutChoice}
                >
                    <Form.Group widths="equal">
                        {/* First name */}
                        <Form.Input
                            onChange={h}
                            required
                            name="child_first_name"
                            label="Child's First name"
                            placeholder="First Name"
                            validations="isWords"
                            errorLabel={<Label color="red" pointing />}
                            validationErrors={{
                                isWords:
                                    'No numbers or special characters allowed',
                                isDefaultRequiredValue:
                                    'First Name is Required',
                            }}
                            value={this.state.child_first_name}
                        />
                        {/* Last name */}
                        <Form.Input
                            onChange={h}
                            value={this.state.child_last_name}
                            name="child_last_name"
                            placeholder="Last name"
                            label="Child's Last name"
                            required
                            validations="isWords"
                            errorLabel={<Label color="red" pointing />}
                            validationErrors={{
                                isWords:
                                    'No numbers or special characters allowed',
                                isDefaultRequiredValue: 'Last Name is Required',
                            }}
                        />

                        {/* Child Age */}
                        <Form.Input
                            onChange={h}
                            name="age"
                            placeholder="Child Age"
                            label="Child's Age"
                            required
                            validations="isInt"
                            errorLabel={<Label color="red" pointing />}
                            validationErrors={{
                                isInt: 'Age must be a number',
                                isDefaultRequiredValue: 'Age is Required',
                            }}
                        />
                    </Form.Group>

                    <Divider />

                    {/* parent email */}
                    <Form.Input
                        onChange={h}
                        name="parent_email"
                        value={this.state.parent_email}
                        placeholder="Email"
                        icon="mail"
                        label="Parent/Guardian Email"
                        required
                        validations="isEmail"
                        validationErrors={{
                            isEmail: 'This is not a valid email',
                            isDefaultRequiredValue: 'Email is Required',
                        }}
                        errorLabel={<Label color="red" pointing />}
                        style={styles.formElement}
                    />
                    <Divider />
                    <Dropdown
                        onChange={this.different}
                        name="activities"
                        value={this.state.activities}
                        label="Activities For Enrollment"
                        placeholder="Select Activity"
                        multiple
                        search
                        selection
                        validations={{
                            customValidation: (values, value) =>
                                !(!value || value.length < 1),
                        }}
                        validationErrors={{
                            customValidation:
                                'Please select at least one activity',
                        }}
                        errorLabel={<Label color="red" pointing />}
                        options={this.state.possible_activities}
                    />
                    <Form.Group>
                        <Form.Button content="Submit" color="green" />
                        <Form.Button
                            type="button"
                            content="Reset"
                            onClick={() => this.form.reset()}
                        />
                    </Form.Group>
                </Form>
            </Container>
        );
    }
}
