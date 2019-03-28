import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import Block from '../components/Block';

import {
  fetch_all_enrollments
} from './middle/fetchers';

export default class Sessionpage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enrollments: [],
      loaded: false,
      placeholder: "Loading...",
    };
  
  }

  componentDidMount() {
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
      <span key={p.id} style={ style }>
        {/* <Link to={ url }>
          <Block
            title={ "Project" + p.id }
            description="would be in a list"
           />
          </Link> */}
      </span>
    )
  }

  render() {
    const { 
      enrollments, 
      loaded, 
      placeholder } = this.state;

      return ( 
      <div>
        {/* <Link to="/settings">Settings</Link> */}
        <h2>Enrollments</h2>
        {/* <div>
          { enrollments.map(e => this.renderEnrollment(e)) }
        </div> */}
      </div>
    );
  }
}