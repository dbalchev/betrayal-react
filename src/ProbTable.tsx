import React, { Component } from 'react';
import {dice3Distribution, makeDistributionSummary, subtractDistributions, DistributionSummaryEntry} from './lib/dice3';

import './ProbTable.css'

function formatNumber(x: number): string {
    return (100 * x).toFixed(1)
}

class PropTableEntry extends Component<{summaryEntry: DistributionSummaryEntry}> {
    render() {
        const summaryEntry = this.props.summaryEntry
        return (
            <div>
                <div className="wrapper">
                    <div className="top left">{formatNumber(summaryEntry.preSum.inclusive)}</div>
                    <div className="top right">{formatNumber(summaryEntry.postSum.inclusive)}</div>
                    <div className="center"></div>
                    <div className="center"> {summaryEntry.n} </div>
                    <div className="center"></div>
                    <div className="bottom left">{formatNumber(summaryEntry.preSum.exclusive)}</div>
                    <div className="bottom right"> {formatNumber(summaryEntry.postSum.exclusive)}</div>
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
