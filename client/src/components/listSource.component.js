import React, { Component } from 'react';
import request from 'request';
import { Link } from 'react-router-dom';

const uri = 'https://aj0cogumb8.execute-api.us-east-1.amazonaws.com/dev/source'

export default class ListSource extends Component {
    
    constructor() {
      super();
      this.state = {source: []};
    }
    
    componentDidMount() {
      request.get(uri, (error, response, body) => {
            if (error) {
                console.log(error)
            }
            else {
                this.setState({ source: JSON.parse(body)})
            }
        });
    }
    
    addSourceList() {
      return this.state.source.map( (src) => {
          return (
            <li key={src.id}>
                <Link to={'/view/'+src.id} >
                    { src.name }
                </Link>
            </li>
        )
      });
    }
    
    render() {
        return (
            <div>
              <h1>Source List</h1>
                <ul>
                  { this.addSourceList() }
                </ul>
            </div>
        )
    }
}