import React, { Component, Fragment } from 'react';
import { Table, Header, Grid, Segment, Button, Icon } from 'semantic-ui-react';
import ReactTable from 'react-table';
import { Link, withRouter } from 'react-router-dom';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';

import { fetch_all_activities } from '../../middleend/fetchers';

class ActivitiesPage extends Component {
    constructor(props) {
        super(props);
        console.log('here!');
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
                this.setState({ activities: response, loaded: true }, () =>
                    console.log(this.state.enrollments)
                );
            },
            error => {
                this.setState({ placeholder: 'Something went wrong.' });
            }
        );
        // this.createTable();
    }
    createNew() {
        this.props.history.push('/activity');
    }

    render() {
        // const confirmed_enrollments = this.filterByStatus(this.state.enrollments, true);
        const activities = this.state.activities;
        console.log(activities);
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
            <Fragment>
                {/* <Header as='h2'color='green'>
              <Icon name='checkmark' />
              <Header.Content>
                Sessions
              <Header.Subheader>Manage Sessions</Header.Subheader>
              </Header.Content>
            </Header> */}
                <MaterialTable
                    title="Sessions List"
                    columns={columns}
                    isLoading={!this.state.loaded}
                    data={activities}
                />
            </Fragment>
        );
    }
}
export default withRouter(ActivitiesPage);
