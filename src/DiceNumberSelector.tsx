import React, { Component } from 'react';

import './DiceNumberSelector.css'

type DiceNumberSelectorProps = {
    nDice: number,
    setNDice: (nDice: number) => void,
}

const POSSIBLE_DICE = [0, 1, 2, 3, 4 ,5, 6 ,7 ,8]

export class DiceNumberSelector extends Component<DiceNumberSelectorProps, {nDice: number}> {
    constructor(props: DiceNumberSelectorProps) {
        super(props)
    }
    
    render() {
        const buttonFactory = (nDice:number) => (
            <div 
                onClick={e => this.props.setNDice(nDice)} 
                key={nDice} 
                className={`DiceNumberSelector-element d${nDice}` + (this.props.nDice == nDice ? ' selected' : '')}>
                    <div>{nDice}</div>
            </div>)

        return (
            <div className='DiceNumberSelector-wrapper'>
                {buttonFactory(0)}
                <div className='DiceNumberSelector-container'>
                    {
                        POSSIBLE_DICE.slice(1).map(buttonFactory)
                    }
                </div>
            </div>)
    }
}