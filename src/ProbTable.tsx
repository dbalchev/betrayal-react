import React, { Component } from 'react';
import {dice3Distribution, makeDistributionSummary, subtractDistributions, DistributionSummaryEntry} from './lib/dice3';

import './ProbTable.css'

class PropTableEntry extends Component<{summaryEntry: DistributionSummaryEntry}> {
    render() {
        const summaryEntry = this.props.summaryEntry
        return (
            <div>
                <div className="wrapper">
                    <div className="top left">{summaryEntry.preSum.inclusive.toFixed(4)}</div>
                    <div className="top right">{summaryEntry.postSum.inclusive.toFixed(4)}</div>
                    <div className="center"></div>
                    <div className="center"> {summaryEntry.n} </div>
                    <div className="center"></div>
                    <div className="bottom left">{summaryEntry.preSum.exclusive.toFixed(4)}</div>
                    <div className="bottom right"> {summaryEntry.postSum.exclusive.toFixed(4)}</div>
                </div>
            </div>
        )
    }
}


export class ProbTable extends Component<{goodDice: number, evilDice: number}> {
    render() {
        const goodDistribution = dice3Distribution(this.props.goodDice);
        const evilDistribution = dice3Distribution(this.props.evilDice);

        const deltaDistribution = subtractDistributions(goodDistribution, evilDistribution);

        const deltaSummaries= makeDistributionSummary(deltaDistribution);
        return (
            <div className='outer-outer'>
                <div className="outer">
                    {deltaSummaries.map((deltaSummary, i) => 
                        <PropTableEntry key={i} summaryEntry={deltaSummary}/>)}
                </div>
            </div>
        )
    }
}
