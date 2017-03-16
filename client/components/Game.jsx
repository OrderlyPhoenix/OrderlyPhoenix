import React from 'react';
import Learn from './Learn.jsx';
import Instruction from './Instruction.jsx';
import Challenge from './Challenge.jsx';
import Image from './Image.jsx';
import axios from 'axios';
require('./../../public/main.css');
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'reactstrap';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chapter: [
        {
          level: 0, chapter: 0, firstImage: '', secondImage: '', challengeText: [], instructionText: '', learnText: '', points: 0, solution: [''], lastLevel: false 
        }
      ]
    };
    this.getChapter = this.getChapter.bind(this);
    this.getChapter();
  }

  getChapter() {
    axios({
      url: '/api/chapter',
      method: 'get'
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
    return (
      <Container>
        <Row>
          <Col md="6"> 
            <Learn chapter={this.state.chapter} />
            <Instruction chapter={this.state.chapter} />
            <Challenge chapter={this.state.chapter} />
          </Col>
          <Col md="6">
            <Image chapter={this.state.chapter} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Game;
