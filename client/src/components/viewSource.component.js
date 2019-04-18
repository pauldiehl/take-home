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
          status: '',
          messages: []
        }
    }

  componentDidMount() {
      request.get(uri + this.props.match.params.id, (error, response, body) => {
            if (error) {
                console.log(error)
            } else {
                const obj = JSON.parse(body)[0]
                this.setState({
                    name: obj['name'],
                    environment: obj['environment'],
                    encoding: obj['encoding'],
                    status: this.state['status'],
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
                const obj = JSON.parse(body)
 
                this.setState(
                    {
                        name: this.state.name,
                        environment: this.state.environment,
                        encoding: this.state['encoding'],
                        status: obj[0] ? obj[0]['status'] : '',
                        messages: obj,
                    }
                )

            }
        })
        );
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
                <p>Current Message Status: {this.state['status']} </p>
                <p>Message List:  </p>
                { this.addMessageList() }
            </div>
        )
    }
}