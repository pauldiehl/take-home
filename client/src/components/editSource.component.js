
import React, { Component } from 'react';
import request from 'request';
import config from '../config';

export default class CreateSource extends Component {
    _isMounted = false;
    
    constructor(props) {
      super(props);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeEnvironment = this.onChangeEnvironment.bind(this);
      this.onChangeEncoding = this.onChangeEncoding.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          name: '',
          environment: '',
          encoding: ''
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
        }
    
    componentWillUnmount() {
        this._isMounted = false;
    }

  
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeEnvironment(e) {
    this.setState({
     environment: e.target.value
    })  
  }
  onChangeEncoding(e) {
    this.setState({
      encoding: e.target.value
    })
  }
    
    onSubmit(e) {
        e.preventDefault();
        
        const payload = 
            {
                name : this.state.name,
                environment : this.state.environment,
                encoding : this.state['encoding']
            }
        
        var options = {
          method: 'put',
          body: payload,
          json: true,
          url: config.url + '/' + this.props.match.params.id,
        }
  
        request(options, (error, response, body) => {
            if (error) {
                console.log(error)
            }
            else {
                console.log('successfully updated source')
                this.props.history.push('/');
            }
        });

    }
  
    render() {
        return (
            <div>
                <h1>Update Source</h1>
                <form onSubmit={this.onSubmit}>
                    <p>Name</p>
                    <input onChange={this.onChangeName} value={this.state.name}/>
                    <p>Environment</p>
                    <input onChange={this.onChangeEnvironment} value={this.state.environment}/>
                    <p>Encoding</p>
                    <input onChange={this.onChangeEncoding} value={this.state['encoding']}/>
                    <br />
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}