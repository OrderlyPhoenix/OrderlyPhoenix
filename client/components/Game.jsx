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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chapter: [
        {
          level: 0, chapter: 0, firstImage: '', secondImage: '', challengeText: [], instructionText: '', learnText: '', points: 0, solution: [''] 
        }
      ],
      showNextLevel: false
    };
    this.getChapter = this.getChapter.bind(this);
    this.getPreviousChapter = this.getPreviousChapter.bind(this);
    this.changeImage = this.changeImage.bind(this);
    if (Cookies.get('Level') === undefined) {
      Cookies.set('Level', '1', { expires: 1000 });
    }
    this.setLevel = this.setLevel.bind(this);
    this.startOver = this.startOver.bind(this);
    this.getPreviousLevel = this.getPreviousLevel.bind(this);
    this.showNextLevelButton = this.showNextLevelButton.bind(this);
    this.hideNextLevelButton = this.hideNextLevelButton.bind(this);
    this.getChapter();
  }

  setLevel() {
    Cookies.set('Level', this.state.chapter[0].level + 1, { expires: 1000 });
  }

  setPreviousLevel(amount) {
    Cookies.set('Level', this.state.chapter[0].level + amount, { expires: 1000 });
  }

  getChapter() {
    axios({
      url: '/api/chapter',
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
      console.error('Error retrieving chapters: ', err);
    });
  }

  getPreviousChapter() {
    this.setPreviousLevel(-1);
    this.getChapter();
  }

  changeImage() {
    this.setState({
      image: this.state.chapter[0].secondImage
    });
  }

  startOver() {
    Cookies.set('Level', '1', { expires: 1000 });
    this.getChapter();
  }

  getPreviousLevel() {
    Cookies.set('Level', this.state.chapter[0].level - 1, { expires: 1000 });
    this.getChapter();
  }

  showNextLevelButton() {
    this.setState({
      showNextLevel: true
    });
  }

  hideNextLevelButton() {
    this.getChapter();
    this.setState({
      showNextLevel: false
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
            <Challenge chapter={this.state.chapter} changeImage={this.changeImage} setLevel={this.setLevel} showNextLevelButton = {this.showNextLevelButton} />
          </Col>
          <Col md="6">
            <h3>Level {this.state.chapter[0].level}</h3>
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
