import React, { Component, Fragment } from 'react';
import { Table, Header, Grid, Segment, Icon } from 'semantic-ui-react';
// import ReactTable from 'react-table';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';

import { unstable_Box as Box } from '@material-ui/core/Box';
import { fetch_all_enrollments } from '../../middleend/fetchers';

export default class EnrollmentsPage extends Component {
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
            <Fragment>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    textColor="secondary"
                >
                    <Tab component="a" label="Pending Enrollments" />
                    <Tab component="a" label="Confirmed Enrollments" />
                </Tabs>
                {this.state.value === 0 && (
                    <Fragment>
                        {/* <Header as='h2'color='green'>
              <Icon name='checkmark' />
              <Header.Content>
                Confirmed
                <Header.Subheader>Manage Confirmed Enrollments</Header.Subheader>
              </Header.Content>
            </Header> */}
                        <MaterialTable
                            title="Pending"
                            columns={columns}
                            isLoading={!this.state.loaded}
                            data={pending_enrollments}
                        />
                    </Fragment>
                )}
                {this.state.value === 1 && (
                    <Fragment>
                        {/* <Header as='h2'color='orange'>
              <Icon name='exclamation' />
              <Header.Content>
                Pending
                <Header.Subheader>Manage Pending Enrollments</Header.Subheader>
              </Header.Content>
            </Header> */}
                        <MaterialTable
                            title="Confirmed"
                            isLoading={!this.state.loaded}
                            data={confirmed_enrollments}
                            columns={columns}
                        />
                    </Fragment>
                )}
            </Fragment>
        );
    }
}
