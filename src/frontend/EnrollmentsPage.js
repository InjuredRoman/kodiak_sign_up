import React, { Component, Fragment } from "react";
import {Table, Header, Grid, Segment, Icon} from 'semantic-ui-react';
// import ReactTable from 'react-table';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';
import ReactLoading from 'react-loading';

import { unstable_Box as Box } from '@material-ui/core/Box';
import {
  fetch_all_enrollments
} from '../middleend/fetchers';

export default class EnrollmentsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      enrollments: [],
      loaded: false,
      placeholder: "Loading...",
      enrollment_type: "pending"
    };
  
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  async componentDidMount() {
    // const res = await fetch('http://127.0.0.1:8000/api/enrollments/');
    // const todos = await res.json();
    // console.log(todos);
    // this.setState({ enrollments: todos, loaded: true });
    fetch_all_enrollments(
      response => { this.setState({ enrollments: response, loaded: true }, () => console.log(this.state.enrollments)); },
      error    => { this.setState({ loaded: false, placeholder: "Something went wrong." }); },
    )
  }

  renderEnrollment(p) {
    // const url = "/project" + p.id;
    const style = {
      margin: '20px', 
      display:'inline-block',
      width: '20em',
    };
    return (
        {/* <Link to={ url }>
          <Block
            title={ "Project" + p.id }
            description="would be in a list"
           />
          </Link> */}
          // <React.Fragment>
          //   <Table.Row>
          //     <Table.Cell>
          //       {p.activity.title}
          //     </Table.Cell>
          //     <Table.Cell>
          //       {p.child.last_name}
          //     </Table.Cell>
          //     <Table.Cell>
          //       {p.confirmed ? "Enrolled" : "Pending Approval"}
          //     </Table.Cell>
          //   </Table.Row>
          // </React.Fragment>
    )
  }
  createTable() {
    let table = []

    // Outer loop to create parent
    console.log(this.state);
    for (let i = 0; i < this.state['enrollments'].length; i++) {
      let e = this.state['enrollments'][i];
      console.log(e);
      let row = [];
      row.push(
        <Table.Cell>
          {e.activity.title}
        </Table.Cell>
      );
      row.push(
        <Table.Cell>
          {e.child.last_name}
        </Table.Cell>
      );
      row.push(
        <Table.Cell>
          {e.confirmed ? "Enrolled" : "Pending Approval"}
        </Table.Cell>
      );
      //Create the parent and add the children
      // table.push(<tr>{children}</tr>)
      table.push(<Table.Row key={i} children={row} />)
    }
    return table
  }

  filterByStatus(L, enrollment_status) {
    var result = L.filter(enrollment => enrollment.confirmed === enrollment_status);
    result = result.map((e, i) => {
      return { activity_title: e.activity.title,
        child_last_name: e.child.last_name,
        child_name: e.child.first_name + " " + e.child.last_name
      };
    });
    return result;
  }

  render() {
    const confirmed_enrollments = this.state.loaded ? this.filterByStatus(this.state.enrollments, true) : [];
    const pending_enrollments = this.state.loaded ? this.filterByStatus(this.state.enrollments, false) : [];
    var loading = <ReactLoading type="spinningBubbles" />
    const columns = [
      {
        title: 'Activity',
        field: 'activity_title'
      },
      {
        title: 'Child',
        field: 'child_name' // String-based value accessors!
      },
      // {
      //   Header: 'Status',
      //   accessor: 'confirmed', // String-based value accessors!
      //   Cell: props =>
      // },
    ];

    return (
      <Fragment>

      <Tabs value={this.state.value} onChange={this.handleChange} textColor="secondary">
        <Tab component='a' style={{'text-decoration':'none'}}label="Pending Enrollments"></Tab>
        <Tab component='a'style={{'text-decoration':'none'}}label="Confirmed Enrollments"></Tab>
      </Tabs>
      {
        this.state.value===0 &&
          <Fragment>
            {/* <Header as='h2'color='green'>
              <Icon name='checkmark' />
              <Header.Content>
                Confirmed 
                <Header.Subheader>Manage Confirmed Enrollments</Header.Subheader>
              </Header.Content>
            </Header> */}
            <MaterialTable title="Pending" columns={columns} isLoading={!this.state.loaded} data={pending_enrollments}  />

          </Fragment>
      }
      {this.state.value===1 &&
          <Fragment>
            {/* <Header as='h2'color='orange'>
              <Icon name='exclamation' />
              <Header.Content>
                Pending 
                <Header.Subheader>Manage Pending Enrollments</Header.Subheader>
              </Header.Content>
            </Header> */}
            <MaterialTable title="Confirmed" isLoading={!this.state.loaded} data={confirmed_enrollments} columns={columns} />
          </Fragment>
      }
      </Fragment>
    );
  }
}