import React, { Component } from "react";
import {Table, Header, Grid, Segment, Icon} from 'semantic-ui-react';
import ReactTable from 'react-table';
import {
  fetch_all_enrollments
} from '../middleend/fetchers';

export default class Sessionpage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enrollments: [],
      loaded: false,
      placeholder: "Loading...",
    };
  
  }

  async componentDidMount() {
    // const res = await fetch('http://127.0.0.1:8000/api/enrollments/');
    // const todos = await res.json();
    // console.log(todos);
    // this.setState({ enrollments: todos, loaded: true });
    fetch_all_enrollments(
      response => { this.setState({ enrollments: response, loaded: true }, () => console.log(this.state.enrollments)); },
      error    => { this.setState({ placeholder: "Something went wrong." }); },
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
    return result;
  }

  render() {
    const confirmed_enrollments = this.filterByStatus(this.state.enrollments, true);
    const pending_enrollments = this.filterByStatus(this.state.enrollments, false);
    const columns = [
      {
        Header: 'Activity',
        accessor: 'activity.title' // String-based value accessors!
      },
      {
        Header: 'Child',
        accessor: 'child.last_name' // String-based value accessors!
      },
      // {
      //   Header: 'Status',
      //   accessor: 'confirmed', // String-based value accessors!
      //   Cell: props =>
      // },
    ];

    return (
      <Segment>
      <Grid columns={2} divided>
      <Grid.Column >
            <Header as='h2'color='green'>
              <Icon name='checkmark' />
              <Header.Content>
                Confirmed 
                <Header.Subheader>Manage Confirmed Enrollments</Header.Subheader>
              </Header.Content>
            </Header>
            <ReactTable defaultPageSize="10"data={pending_enrollments} columns={columns} />
      </Grid.Column>
      <Grid.Column >
            <Header as='h2'color='orange'>
              <Icon name='exclamation' />
              <Header.Content>
                Pending 
                <Header.Subheader>Manage Pending Enrollments</Header.Subheader>
              </Header.Content>
            </Header>
            <ReactTable defaultPageSize="10"data={confirmed_enrollments} columns={columns} />
      </Grid.Column>
      </Grid>
      </Segment>
    );
  }
}