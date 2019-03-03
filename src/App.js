import React, { Component } from 'react';
import './App.css';

import {ProbTable} from './ProbTable';
import {DiceNumberSelector} from './DiceNumberSelector';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      goodDice: 6,
      evilDice: 0
    }
  }

  render() {
    return (
      <>
        <ProbTable goodDice={this.state.goodDice} evilDice={this.state.evilDice} />
        <DiceNumberSelector nDice={this.state.goodDice} setNDice={nDice => this.setState({goodDice: nDice})}/>
        <DiceNumberSelector nDice={this.state.evilDice} setNDice={nDice => this.setState({evilDice: nDice})}/>
      </>
    );
  }
}

export default App;
