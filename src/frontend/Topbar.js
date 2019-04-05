import React, { Component } from 'react';
import { Input, Label, Menu, Header , Button} from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link, NavLink, withRouter} from "react-router-dom";
import Sessionpage from './Sessionpage';
import './Homepage.css';


class Topbar extends Component {
  state = { activeItem: 'home' }
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.history.push("/" + name);
  }
  render() {
    const { activeItem } = this.state
    return (
      <Menu pointing>
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
          </Menu.Item>

          <Menu.Item name='sessions' active={activeItem === 'sessions'} onClick={this.handleItemClick}>
          </Menu.Item>

          <Menu.Item name='activities' active={activeItem === 'activities'} onClick={this.handleItemClick}>
          </Menu.Item>
        </Menu.Menu>
      </Menu>

    );
  }
}
export default withRouter(Topbar);