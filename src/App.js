import React, { Component } from 'react';
import './App.css';

import {ProbTable} from './ProbTable';

class App extends Component {
  render() {
    return (
      <ProbTable goodDice={6} evilDice={0} />
    );
  }
}

export default App;
