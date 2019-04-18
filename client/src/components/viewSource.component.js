import React, { Component } from 'react';
import request from 'request';

const uri = 'https://aj0cogumb8.execute-api.us-east-1.amazonaws.com/dev/source/'

export default class ViewSource extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
          name: '',
          environment: '',
          encoding:'',
          errorCount: '',
          enqueuedCount: '',
          processingCount: '',
          finishedCount: '',
          messages: []
        }
    }

  componentDidMount() {
      request.get(uri + this.props.match.params.id, (error, response, body) => {
            if (error) {
                console.log(error)
            } else {
                const src = JSON.parse(body)[0]
                this.setState({
                    name: src['name'],
                    environment: src['environment'],
                    encoding: src['encoding'],
                    errorCount: this.state.errorCount,
                    enqueuedCount: this.state.enqueuedCount,
                    processingCount: this.state.processingCount,
                    finishedCount: this.state.finishedCount,
                    messages: this.state.messages
                })
            }
        })
        .pipe(
            request.get(uri + this.props.match.params.id + '/message', (error, response, body) => {
            if (error) {
                console.log(error)
            }
            else {
                const messages = JSON.parse(body)
                this.setState(
                    {
                        name: this.state.name,
                        environment: this.state.environment,
                        encoding: this.state['encoding'],
                        errorCount: this.state.errorCount,
                        enqueuedCount: this.state.enqueuedCount,
                        processingCount: this.state.processingCount,
                        finishedCount: this.state.finishedCount,
                        messages: messages,
                    }
                )
            }
        }))
        .pipe(
            request.get(uri + this.props.match.params.id + '/message/statusAggregate', (error, response, body) => {
            if (error) {
                console.log(error)
            }
            else {
                const aggregates = JSON.parse(body)[0]
                this.setState(
                    {
                        name: this.state.name,
                        environment: this.state.environment,
                        encoding: this.state['encoding'],
                        errorCount: aggregates.errorCount,
                        enqueuedCount: aggregates.enqueuedCount,
                        processingCount: aggregates.processingCount,
                        finishedCount: aggregates.finishedCount,
                        messages: this.state.messages,
                    }
                )
            }
        }))
    }
    
    addMessageList() {
         return this.state.messages.map( (msg) => {
          return (
            <li key={msg.id}>{ msg.message }</li>
        );
      });
    }

    
    render() {
        return (
            <div>
                <h1>Source Detail</h1>
                <p>Source Name: {this.state['name']} </p>
                <p>Source Environment: {this.state['environment']} </p>
                <p>Source Encoding: {this.state['encoding']} </p>
                <h1>Message Status Aggregates</h1>
                <p>Total Error: {this.state['errorCount']} </p>
                <p>Total Enqueued: {this.state['enqueuedCount']} </p>
                <p>Total Processing: {this.state['processingCount']} </p>
                <p>Total Finished: {this.state['finishedCount']} </p>
                <h1>Message List:  </h1>
                { this.addMessageList() }
            </div>
        )
    }
}