import React from 'react';
require('./../../public/main.css');

class Learn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="learn">
        <strong><p className="header">Learn</p></strong>
        <p className="content">{this.props.chapter[0].learnText.split('\n').map((text, key) => {
          return (
            <span key={key}>
            {text}
            <br/>
            </span>
          );
        })
        }</p>
      </div>
    );
  }
}

export default Learn;
