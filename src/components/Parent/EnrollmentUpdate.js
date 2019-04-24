import React, {Fragment} from 'react';
import {retrieve_enrollments_by_token, update_enrollment, destroy_enrollment} from '../../middleend/fetchers.js';

import { SnackbarProvider, withSnackbar } from 'notistack';
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Modal from '@material-ui/core/Modal';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom'
import DoneOutlineIcon from '@material-ui/icons/Done';

class EnrollmentUpdate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            successful: '',
            response: '',
            loaded: false,
            enrollments: []
        }
        this.inlineStyle = {
            modal : {
            //   display: 'inline-block !important',
            //   marginLeft: 'auto',
            //   marginRight: 'auto'
            }
          };

        this.handleAction = this.handleAction.bind(this);
    }
    componentDidMount() {
        console.log(this.props);
        const token = this.props.match.params.token; // match enrollment_id from 
        retrieve_enrollments_by_token(
            token,
            response => { this.setState({successful: true, enrollments: response["enrollments"].filter((e) => {return e.confirmed === false}), loaded:true }, () => console.log(this.state)); },
            error    => { this.setState({successful: false, response: error, loaded:true }); },
        );

    }

    handleAction(action, enrollment_info) {
        if (action === "confirm") {
            this.confirm(enrollment_info);
        } else if (action ==="cancel") {
            this.cancel(enrollment_info);
        }
    }

    confirm(enrollment_info) {
        var e_id = enrollment_info.e_id;
        var confirm_variant = 'success';
        update_enrollment(
            e_id,
            response => { this.setState({successful: true, response: response, loaded:true }, () => {
                this.props.enqueueSnackbar(enrollment_info.first_name + " has been successfully enrolled into " + enrollment_info.activity_title, {variant:confirm_variant});
                this.setState({enrollments: this.state.enrollments.filter((e) => {return e.id !== e_id})});}
            )},
            error    => { this.setState({successful: false, response: error, loaded:true }); },
        );
    }

    cancel(enrollment_info) {
        var cancel_variant = 'warning';
        var e_id = enrollment_info.e_id;
        destroy_enrollment(
            e_id,
            response => { this.setState({successful: true, response: response, loaded:true }, () =>{
                this.props.enqueueSnackbar(enrollment_info.first_name + " no longer has a pending enrollment in " + enrollment_info.activity_title, {variant: cancel_variant});
                this.setState({enrollments: this.state.enrollments.filter((e) => {return e.id !== e_id})});

            })},
            error    => { this.setState({successful: false, response: error, loaded:true }); },
        );
    }
    render() {
        var enrollment_data;
        if (this.state.loaded) {
            enrollment_data = this.state.enrollments.map((e, i) => {
                return (
                    {
                        name: e.child.first_name + " " + e.child.last_name,
                        activity_title: e.activity.title,
                        first_name: e.child.first_name,
                        e_id: e.id,
                    }
                );
            });
        } else {
            enrollment_data = [];
        }
        return (

            <Grid container
                justify="center"
                direction="column"
                spacing={24}
                alignContent="center"
                style={{ minHeight: '100vh' }}
            >
            {(this.state.loaded && (enrollment_data.length === 0)) ? 
            <Grid item xs={12}>

                <DoneOutlineIcon fontSize="large" color="primary" />
                    <Typography component='h1'>
                        No more pending enrollments in this batch!
                    </Typography>
                    <Fab variant="extended" component={Link} to="/signup">
                        Sign up for more
                    </Fab>
            </Grid>
            :
            <MaterialTable
                columns={[
                    { title: 'Activity', field: 'activity_title' },
                    { title: 'Student Name', field: 'name' },
                ]}
                data={enrollment_data}
                title="Pending Enrollments"
                isLoading={!this.state.loaded}
                options ={{
                    actionsColumnIndex:-1,
                    toolbar: false,
                }}
                actions={[
                    rowData => ({
                        icon: 'done_outline',
                        tooltip: 'Confirm ' + rowData.first_name + "'s enrollment in " + rowData.activity_title,
                        // disabled: rowData.birthYear >= 2000,
                        onClick: (event, rowData) => {
                            this.handleAction('confirm', rowData);
                        },
                        iconProps: {
                            style: {
                            fontSize: 30,
                            color: 'green',
                            },
                        },
                    }),
                    rowData => ({
                        icon: 'cancel',
                        tooltip: 'Cancel ' + rowData.first_name + "'s enrollment in " + rowData.activity_title,
                        onClick: (event, rowData) => {
                            this.handleAction('cancel', rowData);
                        },
                        iconProps: {
                            style: {
                            fontSize: 30,
                            color: 'red',
                            },
                        },
                    }),
                ]}
            />}
            </Grid>
        );
    }
};

const SnackEnrollmentUpdate = withSnackbar(EnrollmentUpdate);
export default SnackEnrollmentUpdate;

function SnackifiedEnrollmentUpdate() {
    return (
      <SnackbarProvider maxSnack={5}>
        <SnackEnrollmentUpdate />
      </SnackbarProvider>
    );
  }
  
//   export default SnackifiedEnrollmentUpdate;