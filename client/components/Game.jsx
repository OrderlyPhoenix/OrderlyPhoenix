import React from 'react';
import Learn from './Learn.jsx';
import Instruction from './Instruction.jsx';
import Challenge from './Challenge.jsx';
import Image from './Image.jsx';
import axios from 'axios';
require('./../../public/main.css');
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'reactstrap';
import Cookies from 'js-cookie';
import { Nav, NavItem, NavDropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';

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
      showHint: false
      dropdownOpen: false
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
    this.getSpecificChapter = this.getSpecificChapter.bind(this);
    this.getChapter();
    this.numbers = [];
    this.createNums();
    this.getLevel();
  }

  createNums() {
    for(var i = 0; i < Cookies.get('Level'); i++){
      this.numbers.push(i+1);
    }
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

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  getSpecificChapter(level) {
    axios({
      url: '/api/level',
      method: 'get', 
      params: {
        level: level
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
    if (this.state.chapter[0].lastLevel) {
      return (
        <div>
          You did it!
          <br /> <br />
          <button onClick={this.startOver}>Play Again</button>
          <img src="https://i.ytimg.com/vi/Jx8zYrMtdCI/maxresdefault.jpg" />
        </div>
      );
    }
    return (
      <Container>
        <Row>
          <Col md="6"> 
            <Learn chapter={this.state.chapter} />
            <Instruction chapter={this.state.chapter} />
            <Challenge chapter={this.state.chapter} changeImage={this.changeImage} setLevel={this.setLevel} showNextLevelButton = {this.showNextLevelButton} showHintButton={this.showHintButton} />
            {this.state.showHintButton ? <button onClick={this.showHint}>Hint</button> : null}
            {this.state.showHint ? <div>{this.state.chapter[0].hint}</div> : null}
          </Col>
          <Col md="6">
            <h3>Level {this.state.chapter[0].level}</h3>
            <h3>Points: {this.state.chapter[0].points * this.state.chapter[0].level}</h3>
            <Image image={this.state.image} />
            {this.state.chapter[0].level > 1 ? <button onClick={this.getPreviousLevel}>Previous Level</button> : null}
            {this.state.showNextLevel ? <button onClick={this.hideNextLevelButton}>Next Level</button> : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Game;
