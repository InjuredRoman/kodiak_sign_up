import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';

import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import {withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button'; 
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import CubeGridSpinner from 'components/utils/Spinners';

import { fetch_all_activities } from 'middleend/fetchers';
const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 5,
        marginRight: theme.spacing.unit * 5,
        marginTop: theme.spacing.unit * 8,
        // [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        //     width: 400,
        //     marginLeft: 'auto',
        //     marginRight: 'auto',
        // },
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
    button: {
      margin: theme.spacing.unit,
    },
  });

class SessionsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            loaded: false,
            placeholder: 'Loading...',
        };
        this.createNew = this.createNew.bind(this);
    }

    async componentDidMount() {
        // const res = await fetch('http://127.0.0.1:8000/api/enrollments/');
        // const todos = await res.json();
        // console.log(todos);
        // this.setState({ enrollments: todos, loaded: true });
        fetch_all_activities(
            response => {
                this.setState({ activities: response, loaded: true })
            },
            error => {
                this.setState({ placeholder: 'Something went wrong.' });
            }
        );
        // this.createTable();
    }

    createNew() {
        this.props.history.push("/admin/new_session");
    }

    render() {
        const {classes} = this.props;
        var components=(!this.state.loaded) ? {
            Header: props => (
                <Fragment></Fragment>
            ),
            Body: props => (
                <Fragment>
                {/* <MTableBody {...props} /> */}
                <CubeGridSpinner foreground="#f50057" background="white"/>

                </Fragment>
            )
        } : {};
        // const confirmed_enrollments = this.filterByStatus(this.state.enrollments, true);
        const activities = this.state.activities;
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
        return (
            <div className={classes.main}>
                {/* <Paper className={classes.paper}> */}
                <GridContainer justify="center">
                <GridItem xs={12}>
                    <MaterialTable
                        title="Sessions List"
                        columns={columns}
                        components={components}
                        // isLoading={!this.state.loaded}
                        data={activities}
                    />
                </GridItem>
                <GridItem xs={5}>
                    <Button fullWidth onClick={this.createNew} variant="contained" color="secondary" className={classes.button}>
                        Create New Session
                    </Button>
                </GridItem>
                </GridContainer>
                {/* </Paper> */}
            </div>
        );
    }
}
export default withRouter(withStyles(styles)(SessionsPage));
