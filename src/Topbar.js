import React, { Component } from 'react';
import { Input, Label, Menu } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Homepage.css';


export default class Topbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <div class = 'navBar'>
      <Menu vertical>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
            <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Item name='sessions' active={activeItem === 'sessions'} onClick={this.handleItemClick}>
            <Link to="/sessions">Sessions</Link>
        </Menu.Item>

        <Menu.Item name='topics' active={activeItem === 'topics'} onClick={this.handleItemClick}>
            <Link to="/topics">Topics</Link>
        </Menu.Item>
      </Menu>
      </div>
    );
  }
}