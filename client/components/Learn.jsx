import React from 'react';
require('./../../public/main.css');

class Learn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <strong><p>Learn</p></strong>
        <p>{this.props.chapter[0].learnText}</p>
      </div>
    );
  }
}

export default Learn;
