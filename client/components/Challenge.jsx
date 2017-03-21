import React from 'react';
import ReactDOM from 'react-dom';
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
    } else if (item === '\n') {
      return <br />;
    } else if (item.includes('  ')) {
      return <span>&nbsp;{item}</span>;
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
        if (!this.deepEquals(a[item].toUpperCase(), b[item].toUpperCase())) {
          return false;
        }
      }
      return true;
    } else if (a.toUpperCase() !== b.toUpperCase()) {
      return false;
    }
    return true;
  }

  submitAns(e) {
    e.preventDefault();
    if (this.deepEquals(this.state, this.props.chapter[0].solution[0])) {
      this.state = {};
      ReactDOM.findDOMNode(this.refs.form).reset();
      this.props.changeImage();
      this.props.setLevel();
      this.props.showNextLevelButton();
    } else {
      this.props.showHintButton();
    }
  }

  render() {
    if (!this.props.chapter[0]) {
      return <div>Loading...please wait!</div>;
    }

    return (
      <div>
        <div id="challenge">
          <strong><p className="header">Challenge Text</p></strong>
          <form onSubmit={this.submitAns} ref="form">
            <div className="content">
              {this.props.chapter[0].challengeText.map(item => this.renderInput(item))}
            </div>
            <input type="submit" className="submit button"></input>
          </form>
        </div>
      </div>
    );
  }
}

export default Challenge;
