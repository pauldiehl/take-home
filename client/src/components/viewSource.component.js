import React, { Component } from 'react';
import request from 'request';
import SourceDetails from './sourceDetails.component'
import MessageStatusAggregates from './messageStatusAggregates.component'
import config from '../config';
import { Link } from 'react-router-dom';

export default class ViewSource extends Component {
    _isMounted = false;
    
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
    this._isMounted = true;
      request.get(config.url + '/' + this.props.match.params.id, (error, response, body) => {
            if (error) {
                console.log(error)
            } else {
                const src = JSON.parse(body)[0]
                this.setState({
                    name: src['name'],
                    environment: src['environment'],
                    encoding: src['encoding']
                })
            }
        })
        .pipe(
            request.get(config.url + '/' + this.props.match.params.id + '/message', (error, response, body) => {
            if (error) {
                console.log(error)
            }
            else {
                const messages = JSON.parse(body)
                this.setState(
                    {
                        messages: messages,
                    }
                )
            }
        }))
        .pipe(
            request.get(config.url + '/' + this.props.match.params.id + '/message/statusAggregate', (error, response, body) => {
            if (error) {
                console.log(error)
            }
            else {
                const aggregates = JSON.parse(body)[0]
                this.setState(
                    {
                        errorCount: aggregates.errorCount,
                        enqueuedCount: aggregates.enqueuedCount,
                        processingCount: aggregates.processingCount,
                        finishedCount: aggregates.finishedCount,
                    }
                )
            }
        }))
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }

    addMessageList() {
         return this.state.messages.map( (msg) => {
          return (
            <li key={msg.id}>{ msg.message }</li>
        );
      });
    }

    deleteSource(id){
        return () => {
            request.delete(config.url + '/' + id, (error, response, body) => {
            if (error) {
                console.log(error)
            }
            else {
                console.log('successfully deleted source')
                this.props.history.push('/');
            }
            });
        }
    }
        
    render() {
        const style = {cursor: 'pointer', color: 'blue', textDecoration: 'underline' }
        return (
            <div>
                <SourceDetails 
                    name={this.state['name']}
                    environment={this.state['environment']}
                    encoding= {this.state['encoding']}
                />

                <Link to={'/edit/' + this.props.match.params.id} >Update Source</Link> &nbsp; &nbsp;
                <span style={style} onClick={this.deleteSource(this.props.match.params.id)}>Delete</span>

                <MessageStatusAggregates
                    errorCount={this.state['errorCount']}
                    enqueuedCount={this.state['enqueuedCount']}
                    processingCount={this.state['processingCount']}
                    finishedCount={this.state['finishedCount']} 
                />
                <h1>Message List:  </h1>
                { this.addMessageList() }
            </div>
        )
    }
}