import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './components/App.jsx';
import Game from './components/Game.jsx';
import About from './components/About.jsx';
import { browserHistory, hashHistory, Router, Route, Redirect } from 'react-router';
require('./../public/main.css');

const Main = (
  <Router history={hashHistory}>
    <Redirect from="/" to="/play" />
    <Route path="/" component={App}>
      <Route path="about" component={About} />
      <Route path="play" component={Game} />
    </Route>
  </Router>
); 

ReactDOM.render(Main, document.getElementById('main'));


