import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from './react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Set from './components/Set'

ReactDOM.render(
  <Router>
    <Route exact={true} path='/' component={Home} />
    <Route path='/about' component={About} />
    <Route path='/set' component={Set} />
  </Router>,
  document.getElementById('root')
);
