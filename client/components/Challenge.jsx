import React from 'react';
require('./../../public/main.css');

class Challenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateChallenge = this.updateChallenge.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.submitAns = this.submitAns.bind(this);
    this.deepEquals = this.deepEquals.bind(this);
  }

  updateChallenge(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  renderInput(item) {
    if (item.includes('input')) {
      return <span> <input placeholder="Fill me in" name={item} onChange={this.updateChallenge} /> </span>;
    } else {
      return item;
    }
  }

  deepEquals(a, b) {
    if (typeof a === 'object') {
      if (Object.keys(a).length !== Object.keys(b).length || Array.isArray(a) !== Array.isArray(b)) {
        return false;
      }
      for (var item in a) {
        if (!this.deepEquals(a[item], b[item])) {
          return false;
        }
      }
      return true;
    } else if (a !== b) {
      return false;
    }
    return true;
  }

  submitAns() {
    if (this.deepEquals(this.state, this.props.chapter[0].solution[0])) {
      console.log('Correct');
    } else {
      console.log('Incorrect');
    }
  }

  render() {
    if (!this.props.chapter[0]) {
      return <div>Loading...please wait!</div>;
    }

    return (
      <div>
        <strong><p>Challenge Text</p></strong>
        {this.props.chapter[0].challengeText.map(item => this.renderInput(item))}
        <br/><br/>
        <button onClick={this.submitAns}>Submit Answer</button>
      </div>
    );
  }
}

export default Challenge;
