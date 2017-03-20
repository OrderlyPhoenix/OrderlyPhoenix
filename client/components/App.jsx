import React from 'react';
require('./../../public/main.css');
import { Nav, NavItem, NavDropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { Link } from 'react-router';
import Cookies from 'js-cookie';
import axios from 'axios';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      image: ''
    };
    this.toggle = this.toggle.bind(this);
    this.getSpecificChapter = this.getSpecificChapter.bind(this);
    this.numbers = [];
    this.createNums();
  }


    createNums() {
    for(var i = 0; i < Cookies.get('Level'); i++){
      this.numbers.push(i+1);
    }
  }
    toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }
    getSpecificChapter(num) {
    axios({
      url: '/api/chapter',
      method: 'get', 
      params: {
        level: num
      }
    })
    .then(res => {
      this.setState({
        chapter: res.data,
        image: res.data[0].firstImage
      })
    })
    .catch(err => {
      console.error('Error retrieving chapters: ', err);
    });
  }

  render() {
    return (
      <div>
        <NavDropdown id="nav-dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav caret>
              Level Selection
            </DropdownToggle>
            <DropdownMenu>
              {this.numbers.map((num) => {
                return <DropdownItem ><div onClick={() => this.getSpecificChapter(num)}>Level: {num}</div></DropdownItem>
              })}
              <DropdownItem>Just Spiders</DropdownItem>
            </DropdownMenu>
        </NavDropdown>
        <h1>Welcome to Codr</h1>
        <button><Link to="/play">Play</Link></button>
        <button><Link to="/about">About</Link></button>
        {this.props.children}
      </div>
    );
  }
}

export default App;
