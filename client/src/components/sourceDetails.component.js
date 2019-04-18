import React, { Component } from 'react';

export default class SourceDetails extends Component {
    render() {
        return (
            <div>
                <h1>Source Detail</h1>
                <p>Source Name: {this.props['name']} </p>
                <p>Source Environment:  {this.props['environment']}</p>
                <p>Source Encoding: {this.props['encoding']} </p>
            </div>
        )
    }
}

                