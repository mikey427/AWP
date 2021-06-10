// import logo from './logo.svg';
// import * as fs from 'fs';

import React, { Component } from 'react';
import axios from 'axios';

export class App extends Component {
  constructor () {
    super();
    this.state = {
      name: '',
      modules: {
        html: false,
        css: false,
        express: false,
        sequelize: false,
        react: false,
        redux: false
      }
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleCheckboxChange = event => {
    // console.log(this.state);
    this.setState({
      modules: {
        ...this.state.modules,
        [event.target.name]: !this.state[event.target.name]
      }
    });
    // console.log(this.state);
  };

  handleInputChange = event => {
    console.log(event);
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const allModules = Object.keys(this.state.modules);
    // console.log(allModules, 'allmodules');
    const modules = allModules.filter(module => this.state.modules[module]);
    // console.log(modules, 'modules');
    const name = this.state.name;
    // console.log(modules, 'modules front');
    axios.post('/', { modules, name });
  };
  render () {
    return (
      <div>
        Welcome, please select which technologies you will need in your project!
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Enter the name of your project and select the modules you would
              like to use!
            </label>
            <input name='name' type='text' onChange={this.handleInputChange} />
          </div>
          <ul id='list'>
            <li>
              <input
                type='checkbox'
                name='html'
                onChange={this.handleCheckboxChange}
              />
              <label> HTML</label>
            </li>
            <li>
              <input
                type='checkbox'
                name='css'
                onChange={this.handleCheckboxChange}
              />
              <label> CSS</label>
            </li>
            <li>
              <input
                type='checkbox'
                name='express'
                onChange={this.handleCheckboxChange}
              />
              <label> Express</label>
            </li>
            <li>
              <input
                type='checkbox'
                name='sequelize'
                onChange={this.handleCheckboxChange}
              />
              <label> Sequelize</label>
            </li>
            <li>
              <input
                type='checkbox'
                name='react'
                onChange={this.handleCheckboxChange}
              />
              <label> React</label>
            </li>
            <li>
              <input
                type='checkbox'
                name='redux'
                onChange={this.handleCheckboxChange}
              />
              <label> Redux</label>
            </li>
            <button type='submit'>Submit</button>
            <button type='button' method='get' action='./temp'>
              Download
            </button>
          </ul>
        </form>
      </div>
    );
  }
}

export default App;
