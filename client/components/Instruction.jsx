import React from 'react';
require('./../../public/main.css');

class Instruction extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div id="instruction">
        <strong><p className="header"> Instructions </p></strong>
        <p className="content">{this.props.chapter ? this.props.chapter[0].instructionText : null}</p>
      </div>
    );
  }
}

export default Instruction;
