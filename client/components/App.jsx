import React from 'react';
require('./../../public/main.css');
import { Nav, NavItem, NavDropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { Link } from 'react-router';
import Cookies from 'js-cookie';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1 id="title">Welcome to Codr</h1>
        <Nav pills className="nav">
          <NavItem className="navItem" className="about">
            <NavLink><Link to="/play">Play</Link></NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink><Link to="/about">About</Link></NavLink>
          </NavItem>
        </Nav>
        {this.props.children}
      </div>
    );
  }
}

export default App;
