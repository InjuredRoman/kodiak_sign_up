import React from 'react';
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from 'components/CustomButtons/Button.jsx';
// import Button from "@material-ui/core/Button";
import Card from 'components/Card/Card.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { fetch_all_activities, create_enrollment } from 'middleend/fetchers';
import SuperSelectField from 'material-ui-superselectfield';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// function CustomInput({...props}) {
//     return (
//         <TextField
//             {...props}
//             variant="outlined"
//         />
//     );
// }
export default class Signup_Redux extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            child_first_name: '',
            child_last_name: '',
            parent_email: '',
            activities: [],
            possible_activities: [],
            possible_activities_states: [],
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.MyForm = this.MyForm.bind(this);
    }
    onSubmit(event) {
        console.log(event);
        this.setState(event);
        create_enrollment(event, response => {
            this.setState(
                {
                    response: response,
                },
                this.form.reset()
            );
        });
    }

    handleChange(e) {
        const { value, name } = e.target;
        this.setState({ [name]: value }, this.print_state);
    }
    handleCheck(values, name) {
        this.setState({ [name]: values });
        // const {value} = e.target;
        // console.log(value);
        // this.setState({
        //     possible_activities_states: this.state.possible_activities_states.map(
        //         (v, j) => {
        //             console.log(this.state.possible_activities[j])
        //             if (this.state.possible_activities[j]["value"] === value) {
        //                 return !v;
        //             } else {
        //                 return v;
        //             }
        //             // return (v);
        //             // value-1===this.state.possible_activities[j].key ? !v : v;
        //         }
        //     )
        // });
        // this.setState({[name]:value}, this.print_state)
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
    organize_options(activities) {
        var possible_activities;
        var possible_activities_states;
        if (activities == null) {
            possible_activities = [];
        } else {
            possible_activities = activities.map((a, index) => ({
                key: index,
                text: a.title,
                value: a.id,
            }));
            possible_activities_states = activities.map((a, index) => false);
            this.setState(
                {
                    possible_activities: possible_activities,
                    possible_activities_states: possible_activities_states,
                },
                console.log(this.state)
            );
        }
    }

    render() {
        var error;
        var possible_activities;
        error =
            this.state.possible_activities_states.filter(v => v).length !== 0;
        possible_activities = this.state.possible_activities.map(
            (activity, i) => {
                return (
                    // <FormControlLabel
                    //     key={i}
                    //     control={
                    //     <Checkbox checked={this.state.possible_activities_states[i]} onChange={this.handleCheck} value={activity.value} />
                    //     }
                    //     label={activity.text}
                    // />
                    <div key={activity.key} value={activity.value}>
                        {activity.text}
                    </div>
                );
            }
        );
        var activity_vals = this.state.activities.map(a => a.value);
        return (
            <MuiThemeProvider>
                <GridContainer
                    justify="center"
                    alignContent="center"
                    spacing={40}
                >
                    <GridItem xs={12} sm={12} md={8}>
                        <Card>
                            <CardHeader color="primary">
                                <h4>Edit Profile</h4>
                                <p>Complete your profile</p>
                            </CardHeader>
                            <CardBody>
                                <Grid container>
                                    <Grid item xs={12} sm={6} md={6}>
                                        <CustomInput
                                            fullWidth
                                            labelText="Email address"
                                            variant="outlined"
                                            id="email-address"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Child's First Name"
                                            id="first-name"
                                            variant="outlined"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Child Last Name"
                                            id="last-name"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <FormControl
                                            required
                                            error={error}
                                            component="fieldset"
                                        >
                                            <FormLabel component="legend">
                                                Pick at least one
                                            </FormLabel>
                                            <FormGroup>
                                                {/* {possible_activities.length === 0 ? 
                            <ReactLoading type={'spin'} color="#fff" />
                            :
                            possible_activities
                        } */}
                                                <SuperSelectField
                                                    name="activities"
                                                    multiple
                                                    checkPosition="left"
                                                    hintText="Select Activities to enroll in"
                                                    onSelect={this.handleCheck}
                                                    // value={activity_vals}
                                                    value={
                                                        this.state.activities
                                                    }
                                                    style={{
                                                        minWidth: 150,
                                                        marginTop: 40,
                                                    }}
                                                >
                                                    {possible_activities}
                                                </SuperSelectField>
                                            </FormGroup>
                                            <FormHelperText>
                                                Select as many as you'd like
                                            </FormHelperText>
                                        </FormControl>
                                        {/* <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel> */}
                                        <CustomInput
                                            labelText="Select Activities Please!"
                                            id="about-me"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                multiline: true,
                                                rows: 5,
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                <Button color="primary">Update Profile</Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
            </MuiThemeProvider>
        );
    }
}
