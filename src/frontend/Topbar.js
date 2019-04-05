import React, { Component } from 'react';
import { Input, Label, Menu, Header } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Sessionpage from './Sessionpage';
import './Homepage.css';


export default class Topbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <Menu>
          <Header as='h1' color='blue'>
            <Header.Content>
              Kodiak Island Borough School District
              <Header.Subheader inverted color='green'>
                Engaged in Learning. Prepared for Life.
              </Header.Subheader>
            </Header.Content>
          </Header>
        <Menu.Menu position="right">
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
              <Link to="/home">Home</Link>
          </Menu.Item>

          <Menu.Item name='sessions' active={activeItem === 'sessions'} onClick={this.handleItemClick}>
              <Link to="/sessions" >Sessions</Link>
            {/* <Route path="/sessions" component={Sessionpage} /> */}
          </Menu.Item>

          <Menu.Item name='activities' active={activeItem === 'activities'} onClick={this.handleItemClick}>
              <Link to="/activities">Activities</Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>

    );
  }
}