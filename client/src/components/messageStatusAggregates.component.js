import React, { Component } from 'react';

export default class SourceDetails extends Component {
    render() {
        return (
            <div>
                <h1>Message Status Aggregates</h1>
                <p>Total Error: {this.props['errorCount']}</p>
                <p>Total Enqueued: {this.props['enqueuedCount']}</p>
                <p>Total Processing: {this.props['processingCount']} </p>
                <p>Total Finished: {this.props['finishedCount']} </p>
            </div>
        )
    }
}

                

                