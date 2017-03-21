import React from 'react';
import Learn from './Learn.jsx';
import Instruction from './Instruction.jsx';
import Challenge from './Challenge.jsx';
import Image from './Image.jsx';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'reactstrap';
import Cookies from 'js-cookie';
import { Nav, NavItem, NavDropdown, Navbar, NavbarToggler, NavbarBrand, Collapse, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
require('./../../public/main.css');

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chapter: [
        {
          level: 0, chapter: 0, firstImage: '', secondImage: '', challengeText: [], instructionText: '', learnText: '', points: 0, solution: [''] 
        }
      ],
      showNextLevel: false,
      showHintButton: false,
      showHint: false,
      dropdownOpen: false,
      numbers: []
    };

    this.getLevel = this.getLevel.bind(this);
    this.changeImage = this.changeImage.bind(this);
    if (Cookies.get('Level') === undefined) {
      Cookies.set('Level', '1', { expires: 1000 });
    }
    this.setLevel = this.setLevel.bind(this);
    this.startOver = this.startOver.bind(this);
    this.getPreviousLevel = this.getPreviousLevel.bind(this);
    this.showNextLevelButton = this.showNextLevelButton.bind(this);
    this.hideNextLevelButton = this.hideNextLevelButton.bind(this);
    this.showHintButton = this.showHintButton.bind(this);
    this.showHint = this.showHint.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getSpecificLevel = this.getSpecificLevel.bind(this);
    this.getLevel();
    this.createNums();
  }

  setLevel() {
    Cookies.set('Level', this.state.chapter[0].level + 1, { expires: 1000 });
  }

  getLevel() {
    axios({
      url: '/api/level',
      method: 'get', 
      params: {
        level: Cookies.get('Level')
      }
    })
    .then(res => {
      this.setState({
        chapter: res.data,
        image: res.data[0].firstImage
      });
    })
    .catch(err => {
      console.error('Error retrieving level: ', err);
    });
  }

  changeImage() {
    this.setState({
      image: this.state.chapter[0].secondImage
    });
  }

  startOver() {
    Cookies.set('Level', '1', { expires: 1000 });
    this.getLevel();
  }

  getPreviousLevel() {
    Cookies.set('Level', this.state.chapter[0].level - 1, { expires: 1000 });
    this.setState({
      showHintButton: false,
      showHint: false
    });
    this.getLevel();
  }

  showNextLevelButton() {
    this.setState({
      showNextLevel: true
    });
  }

  hideNextLevelButton() {
    this.getLevel();
    this.setState({
      showNextLevel: false,
      showHintButton: false,
      showHint: false
    });
    this.createNums();
  }

  showHintButton() {
    this.setState({
      showHintButton: true
    });
  }

  showHint() {
    this.setState({
      showHint: true
    });
  }

  createNums() {
    let temp = [];
    for (var i = 0; i < Cookies.get('Level'); i++) {
      temp.push(i + 1);
    }
    this.setState({
      numbers: temp
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  getSpecificLevel(level) {
    axios({
      url: '/api/level',
      method: 'get', 
      params: {
        level: level
      }
    })
    .then(res => {
      this.setState({
        chapter: res.data
      });
    })
    .catch(err => {
      console.error('Error retrieving chapters: ', err);
    });
  }

  render() {
    if (this.state.chapter[0].lastLevel) {
      return (
        <div>
          You did it!
          <br /> <br />
          <button onClick={this.startOver}>Play Again</button>
          <img src="https://s3-us-west-1.amazonaws.com/codrbucket/lvl_finale_resize1000.png" />
        </div>
      );
    }
    return (
      <div>
          <Row>
            <Col md="6" className="leftHalf"> 
              <Learn chapter={this.state.chapter} />
              <Instruction chapter={this.state.chapter} />
              <Challenge chapter={this.state.chapter} changeImage={this.changeImage} setLevel={this.setLevel} showNextLevelButton = {this.showNextLevelButton} showHintButton={this.showHintButton} />
              {this.state.showHintButton ? <button className="hint button" onClick={this.showHint}>Hint</button> : null}
              {this.state.showHint ? <div id="hint">{this.state.chapter[0].hint}</div> : null}
              <br />
              <Row>
                <Col md="6">
                  {this.state.chapter[0].level > 1 ? <button className="button" onClick={this.getPreviousLevel}>Previous Level</button> : null}
                </Col>
                <Col md="6" className="right">
                  {this.state.showNextLevel ? <button className="button" onClick={this.hideNextLevelButton}>Next Level</button> : null}
                </Col>
              </Row>
            </Col>
            <Col md="6" className="rightHalf">
            <Row className="header">
              <Col md="6" className="left">
                <strong><p className="levelHeader">




    <div>
        <Navbar color="faded" light>
          <NavbarToggler onClick={this.toggle} />
          <Collapse className="navbar-toggleable-md" isOpen={this.state.dropdownOpen}>
            <NavbarBrand href="/">reactstrap</NavbarBrand>
            <Nav navbar>
              <NavItem>
                <NavLink href="/">Components</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>





                <Navbar light id="navbar">
                  <NavbarToggler onClick={this.toggle}>
                    <Collapse className="navbar-toggleable-xs" isOpen={this.state.dropdownOpen}>
                    <NavbarBrand href="/">Levels</NavbarBrand>
                    <Nav navbar>
                      {this.state.numbers.map((num) => {
                        return <NavItem>
                          <NavLink href="/">
                          <div onClick={() => this.getSpecificLevel(num)}>Level {num}</div>
                          </NavLink>
                          </NavItem>;
                      })}
                      <NavItem>
                        <a href="http://www.cartoonnetwork.com/games/powerpuff-girls/glitch-fixers/index.html" target="_blank">Glitch Fixers</a>
                      </NavItem>
                      </Nav>
                    </Collapse>
                  </NavbarToggler>
                </Navbar>
                Level {this.state.chapter[0].level}</p></strong>
              </Col>
              <Col md="6" className="right">
                <strong><p className="levelHeader">Points: {this.state.chapter[0].points * this.state.chapter[0].level}</p></strong>
              </Col>
            </Row>
              <Image image={this.state.image} />
            </Col>
          </Row>
        </div>
    );
  }
}

export default Game;
