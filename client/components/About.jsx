import React from 'react';
require('./../../public/main.css');

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <section>
          <h3>About the Game</h3>
          <p>
            Our vision was to create a game that made it easy for young developers to learn to code.
          </p>
        </section>
        <section>
          <h3>About the Developers</h3>
          <p>
            <table>
              <tr>
                <td><strong>Airyque</strong><br />
                 loves swiss cheese, Kirby's Adventure Land NES, and his favorite cartoon is Looney Toons!<br />
                <img src="https://s3-us-west-1.amazonaws.com/codr/airyque.png" /></td>
                <td><strong>Nowreen</strong><br />
                  loves smoked gouda cheese, Ocarina of Time, and her favorite cartoon is Dexter's Lab! <br />
                <img src="https://s3-us-west-1.amazonaws.com/codr/nowreen.png" /></td>
              </tr>
              <tr>
                <td><strong>Erik</strong><br />
                loves gjetost cheese, Cave Story, and his favorite cartoon is the Moomins!<br/>
                <img src="https://s3-us-west-1.amazonaws.com/codr/erik.png" /></td>
                <td><strong>Alex</strong><br />
                loves provolone cheese, Super Smash Bros, and his favorite cartoon is Yu Yu Hakusho!
                <img src="https://s3-us-west-1.amazonaws.com/codr/alex.png" /></td>
              </tr>
            </table>
          </p>
        </section>
      </div>
    );
  }
}

export default About;
