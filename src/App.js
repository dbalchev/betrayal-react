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
      <div className='App'>
        <ProbTable goodDice={this.state.goodDice} evilDice={this.state.evilDice} />
        <br/>
        <div>
          <h1>Good dice</h1>
          <DiceNumberSelector nDice={this.state.goodDice} setNDice={nDice => this.setState({goodDice: nDice})}/>
        </div>
        <div>
          <h1>Evil dice</h1>
          <DiceNumberSelector nDice={this.state.evilDice} setNDice={nDice => this.setState({evilDice: nDice})}/>
        </div>
      </div>
    );
  }
}

export default App;
