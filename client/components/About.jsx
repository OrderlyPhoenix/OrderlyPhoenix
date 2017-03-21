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
            We were inspired to create this game to help kids get a better understanding of how computer science can be fun.
            With the industry going the way it is, software engineers are more in demand than ever. This game will fast track
            kids on the learning path while having fun. Codr makes it easier to learn tough programming concepts by breaking them down into easy to understand levels. 

            In the future, we hope to inspire more kids to be creative and innovative and give them the tools necessary to 
            start their path to coding. As we continue to build our app, we will include more developed levels, exciting animations, and current industry practices.
          </p>
        </section>
        <section>
          <h3>About the Developers</h3>
          <p>
            <table>
              <tr>
                <td>
                  <strong>Airyque</strong><br />
                  loves swiss cheese, Kirby's Adventure Land NES, and his favorite cartoon is Looney Toons!<br />
                  <div className="portrait">
                    <img src="https://s3-us-west-1.amazonaws.com/codr/airyque.png" className="round" />
                  </div>
                </td>
                <td>
                  <strong>Nowreen</strong><br />
                  loves smoked gouda cheese, Ocarina of Time, and her favorite cartoon is Dexter's Lab! <br />
                  <div className="portrait">
                    <img src="https://s3-us-west-1.amazonaws.com/codr/nowreen.png" className="round" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Erik</strong><br />
                  loves gjetost cheese, Cave Story, and his favorite cartoon is the Moomins!<br/>
                  <div className="portrait">
                    <img src="https://s3-us-west-1.amazonaws.com/codr/erik.png" className="round" />
                  </div>
                </td>
                  <td><strong>Alex</strong><br />
                  loves provolone cheese, Super Smash Bros, and his favorite cartoon is Yu Yu Hakusho!<br />
                  <div className="portrait">
                    <img src="https://s3-us-west-1.amazonaws.com/codr/alex.png" className="round" />
                  </div>
                </td>
              </tr>
            </table>
          </p>
        </section>
      </div>
    );
  }
}

export default About;
