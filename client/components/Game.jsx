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
      ]
    };
    this.getChapter = this.getChapter.bind(this);
    this.changeImage = this.changeImage.bind(this);
    if (Cookies.get('Level') === undefined) {
      Cookies.set('Level', '1', { expires: 1000 });
    }
    this.setLevel = this.setLevel.bind(this);
    this.getChapter();
  }

  setLevel() {
    Cookies.set('Level', this.state.chapter[0].level + 1, { expires: 1000 });
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

  changeImage() {
    this.setState({
      image: this.state.chapter[0].secondImage
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md="6"> 
            <Learn chapter={this.state.chapter} />
            <Instruction chapter={this.state.chapter} />
            <Challenge chapter={this.state.chapter} changeImage={this.changeImage} setLevel={this.setLevel} />
          </Col>
          <Col md="6">
            <Image image={this.state.image} />
            <button onClick={this.getChapter}>Next Level</button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Game;
