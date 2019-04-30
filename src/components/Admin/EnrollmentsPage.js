import React, { Component, Fragment } from 'react';
import { Table, Header, Grid, Segment, Icon } from 'semantic-ui-react';
// import ReactTable from 'react-table';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import MaterialTable, {} from 'material-table';

import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';


import CubeGridSpinner from 'components/utils/Spinners';

import { fetch_all_enrollments } from '../../middleend/fetchers';
import { withStyles } from '@material-ui/core';
import theme from 'index.js';
const styles = theme => ({
    main: {
        width: 'auto',
        position: 'relative',
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
    spinner: {
        // position: 'absolute',
        // margin-left: 200px;
        // /* position: sticky; */
        // margin-right: -185px;
        // marginLeft: theme.spacing.unit * 25,
        // marginRight: -theme.spacing.unit * 25,
    },
    paper: {
        // marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        // padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
            // 3}px ${theme.spacing.unit * 3}px`,
    },
    root: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing.unit,
    },
});

class EnrollmentsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            enrollments: [],
            loaded: false,
            placeholder: 'Loading...',
            enrollment_type: 'pending',
        };

        this.filterByStatus = this.filterByStatus.bind(this);
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    async componentDidMount() {
        fetch_all_enrollments(
            response => {
                this.setState({ enrollments: response, loaded: true }, () =>
                    console.log(this.state.enrollments)
                );
            },
            error => {
                this.setState({
                    loaded: false,
                    placeholder: 'Something went wrong.',
                });
            }
        );
    }

    filterByStatus(L, enrollment_status) {
        if (L == null) {
            return [];
        }
        var result = L.filter(
            enrollment => enrollment.confirmed === enrollment_status
        );
        result = result.map((e, i) => {
            return {
                activity_title: e.activity.title,
                child_last_name: e.child.last_name,
                child_name: e.child.first_name + ' ' + e.child.last_name,
            };
        });
        return result;
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
        // components = {
        //     ...components,
        //     Paper: props => {
        //         <Paper square {...props} />
        //     }
        // };
        const confirmed_enrollments = this.state.loaded
            ? this.filterByStatus(this.state.enrollments, true)
            : [];
        const pending_enrollments = this.state.loaded
            ? this.filterByStatus(this.state.enrollments, false)
            : [];
        const columns = [
            {
                title: 'Activity',
                field: 'activity_title',
            },
            {
                title: 'Child',
                field: 'child_name',
            },
        ];

        return (
            <div className={classes.main}>
                {/* <Paper className={classes.paper}> */}
                <GridContainer justify="center">
                <GridItem xs={12}>
                <Paper square className={classes.paper}>

                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    textColor="secondary"
                >
                    <Tab component="a" label="Pending Enrollments" />
                    <Tab component="a" label="Confirmed Enrollments" />
                </Tabs>
                </Paper>
                {this.state.value === 0 && (
                    <Paper square>
                        <MaterialTable
                            // square
                            title="Pending"
                            columns={columns}
                            components={components}
                            // isLoading={!this.state.loaded}
                            data={pending_enrollments}
                        />
                    </Paper>
                )}
                {this.state.value === 1 && (
                    <Paper square>
                        <MaterialTable
                            title="Confirmed"
                            // isLoading={!this.state.loaded}
                            components={components}
                            data={confirmed_enrollments}
                            columns={columns}
                        />
                    </Paper>
                )}
            </GridItem>
            </GridContainer>
            </div>
        );
    }
}

export default withStyles(styles)(EnrollmentsPage);
