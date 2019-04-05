import React, { Component } from "react";
import {Table, Header, Segment, Button} from 'semantic-ui-react';
import ReactTable from 'react-table';
import {Link} from 'react-router-dom';

import {
  fetch_all_activities
} from '../middleend/fetchers';

export default class ActivitiesPage extends Component {
  constructor(props) {
    super(props);
    console.log("here!");
    this.state = {
      activities: [],
      loaded: false,
      placeholder: "Loading...",
    };
  
  }

  async componentDidMount() {
    // const res = await fetch('http://127.0.0.1:8000/api/enrollments/');
    // const todos = await res.json();
    // console.log(todos);
    // this.setState({ enrollments: todos, loaded: true });
    fetch_all_activities(
      response => { this.setState({ activities: response, loaded: true }, () => console.log(this.state.enrollments)); },
      error    => { this.setState({ placeholder: "Something went wrong." }); },
    )
    // this.createTable();
  }

  render() {
    // const confirmed_enrollments = this.filterByStatus(this.state.enrollments, true);
    const activities = this.state.activities;
    const columns = [
      {
        Header: 'Activity',
        accessor: 'title' // String-based value accessors!
      },
      {
        Header: 'Start Date',
        accessor: 'start_date' // String-based value accessors!
      },
      {
        Header: 'End Date',
        accessor: 'end_date' // String-based value accessors!
      },
      // {
      //   Header: 'Status',
      //   accessor: 'confirmed', // String-based value accessors!
      //   Cell: props =>
      // },
    ];

    return (
      <Segment>
          <Header as='h2'color='olive'>
            <Header.Content>
              Activities 
              <Header.Subheader>Manage Activities</Header.Subheader>
            </Header.Content>
          </Header>
          <ReactTable defaultPageSize={5}data={activities} columns={columns} />
           <Button color='green'>
             <Link to="/activity">Create New</Link>
           </Button>
      </Segment>
    );
  }

  // createTable() {
  //   let table = []

  //   // Outer loop to create parent
  //   // console.log(this.state);
  //   for (let i = 0; i < this.state['activities'].length; i++) {
  //     let a = this.state['activities'][i];
  //     console.log(a);
  //     let row = [];
  //     row.push(
  //       <Table.Cell>
  //         {a.title}
  //       </Table.Cell>
  //     );
  //     row.push(
  //       <Table.Cell>
  //         {a.start_date}
  //       </Table.Cell>
  //     );
  //     row.push(
  //       <Table.Cell>
  //         {a.end_date}
  //       </Table.Cell>
  //     );
  //     //Create the parent and add the children
  //     // table.push(<tr>{children}</tr>)
  //     table.push(<Table.Row key={i} children={row} />)
  //   }
  //   return table
  // }

  // render() {

  //     return ( 
  //       <div>
  //           <Button inverted color='green'>
  //             <Link to="/activity">Create New</Link>
  //           </Button>
  //         <Table celled selectable>
  //           <Table.Header>
  //             <Table.Row>
  //               <Table.HeaderCell>Activity</Table.HeaderCell>
  //               <Table.HeaderCell>Start Date</Table.HeaderCell>
  //               <Table.HeaderCell>End Date</Table.HeaderCell>
  //             </Table.Row>
  //           </Table.Header>

  //           <Table.Body>
  //             {this.createTable()}
  //           </Table.Body>
  //         </Table> 


  //       </div>
  //   );
  // }
}