import React, { Component } from 'react';
import { Label, Container, Divider } from 'semantic-ui-react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import { fetch_all_activities, create_enrollment } from 'middleend/fetchers';
import { Form, Dropdown } from 'formsy-semantic-ui-react';
import { withStyles } from '@material-ui/core/styles';
import {withSnackbar} from 'notistack';
import MaterialTable from 'material-table';

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
});


class Signup extends Component {
    validate() {
        return true;
    }
    successSnackbar() {
        this.props.enqueueSnackbar(
                'Successfully created enrollment! Be sure to confirm via email!',
                { variant: 'success' }
        );
    }

    failSnackbar() {
        this.props.enqueueSnackbar(
                'Sorry, something seems to have gone wrong. We may have sent you more information through email!',
                { variant: 'error' }
        );
    }

    resetForm() {
        this.form.reset();
        // this.table.state.renderData = this.table.state.renderData.map(d => d.tableData.checked = )
    }

    submitForm() {
        console.log(this.state);
        create_enrollment(this.state, response => {
            this.setState(
                {
                    child_first_name: '',
                    child_last_name: '',

                    parent_email: '',
                    activities: [],
                    rendered_activities: [],
                    response: response,
                },
                () => {this.resetForm(); this.successSnackbar();this.setState({rendered_activities: this.state.possible_activities});}),
            () => {this.resetForm(); this.failSnackbar();}
        }
        );
    }

    onSubmit(event) {
        console.log(this.state);
        // this.setState({activities: this.table.state.renderData.filter(d => d.tableData.checked).map(s => s.id)}, console.log(this.state.activities));
        this.setState(event, this.submitForm());
        // console.log(this.state);
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
            possible_activities: [],
            rendered_activities: []
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.different = this.different.bind(this);
        this.successSnackbar = this.successSnackbar.bind(this);
        this.failSnackbar = this.failSnackbar.bind(this);
        this.resetForm = this.resetForm.bind(this);
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
                var currentActivities = response.filter(
                    activity => (new Date() <= Date.parse(activity.end_date))
                    );
                // this.organize_options(response);
                this.setState({ possible_activities: currentActivities, rendered_activities: currentActivities, loaded: true }, () => console.log(response))
            },
            error => {
                this.setState({ placeholder: 'Something went wrong.' });
            }
        );
    }

    print_state() {
        console.log(this.state);
    }

    // filters activities that appear to the user (rendered_activities) by the age requirements.
    filterActivities(age) {
/*
        // Filter the options list by the age depending on what age is put in
        console.log(age);
        var filteredActivities = this.state.possible_activities.filter(
            activity => activity.youngest_enrolled <= age && activity.oldest_enrolled >= age
            );
        this.setState ({ rendered_activities: filteredActivities }, this.print_state);
*/
        // TODO: Filter the options list by the age depending on what age is put in
        // console.log(age);
        if (age === '') {
            this.setState ({ rendered_activities: this.state.possible_activities });
        } else {
            var filteredActivities = this.state.possible_activities.filter(
            activity => activity.youngest_enrolled <= age && activity.oldest_enrolled >= age
            );
            this.setState({ rendered_activities: filteredActivities });
        }
        // options = getOptions() <- get options from backend/database/???
        // iterate / map through options, get age ranges and filter options that fit the age criteria
    }

    handleChange(e) {
        const { value, name } = e.target;
        this.setState({ [name]: value });
        if (name === 'age') {
            this.filterActivities(value);
        }
    }

    different(e) {
        console.log(e);
    }
    render() {
        // var s = this.onSubmit;
        var h = this.handleChange;
        const {classes} = this.props;
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
        const columns = [
            {
                title: 'Activity',
                field: 'title', // String-based value accessors!
            },
            {
                title: 'Start Date',
                field: 'start_date', // String-based value accessors!
            },
            {
                title: 'End Date',
                field: 'end_date', // String-based value accessors!
            },
            // {
            //   Header: 'Status',
            //   accessor: 'confirmed', // String-based value accessors!
            //   Cell: props =>
            // },
        ];
        const form = 
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
                            value={this.state.child_last_name}
                        />

                        {/* Child Age */}
                        <Form.Input
                            onChange={h}
                            name="age"
                            placeholder="Child Age"
                            label="Child's Age"
                            // required
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
                <Paper className={classes.paper}>
                    <Typography variant="h4" gutterBottom>
                        Activity Descriptions

                    </Typography>

                    <Typography variant="p" gutterBottom>
                        Activity Descriptions Here
                    </Typography>
                </Paper>

                      {/*<Form.TextArea
                          name="about"
                          label="About"
                          placeholder="Tell us more about you..."
                          required
                          errorLabel={ <Label color="red" pointing/> }
                          validationErrors={{
                            isDefaultRequiredValue: 'We need to know more about you',
                          }}
                        />
                    */}


                    <Divider />
                    {/* <Dropdown
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
                    /> */}
                    <MaterialTable
                        title="Available Sessions"
                        tableRef={ref => (this.table = ref)}
                        columns={columns}
                        options={{selection:true, search:false}}
                        // components={components}
                        // isLoading={!this.state.loaded}
                        data={this.state.rendered_activities}
                        onSelectionChange={(rows) => this.setState({},this.setState({activities: this.table.state.renderData.filter(d => d.tableData.checked).map(s => s.id)}, console.log(this.state.activities)))}
                        // console.log(this.table.state.renderData.filter(d => d.tableData.checked).map(s => s.id)))}
                        
                    />

                    <Divider />
                    <Form.Group widths={2}>
                        <Form.Button fluid content="Submit" color="green" />
                        <Form.Button fluid
                            type="button"
                            content="Reset"
                            // width={12}
                            onClick={() => this.form.reset()}
                        />
                    </Form.Group>
                </Form>
            </Container>;

        return (
        <div className={classes.main}>
            <p>Administrator? Login <a href="#/login">here</a></p>
            <Paper className={classes.paper}>
                <Typography variant="h2" gutterBottom>
                    Session Sign Up
                </Typography>
                <GridContainer justify="center">
                    <GridItem xs={10}>
                     {form}
                    </GridItem>
                </GridContainer>
            </Paper>
        </div>
        );
    }
}

export default withStyles(styles)(withSnackbar(Signup));