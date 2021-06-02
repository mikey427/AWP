// import logo from './logo.svg';
// import * as fs from 'fs';

import React, { Component } from 'react';
import axios from 'axios';

export class App extends Component {
  constructor () {
    super();
    this.state = {
      html: false,
      css: false,
      express: false,
      sequelize: false,
      react: false,
      redux: false
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCheckboxChange = event => {
    // console.log(this.state);
    this.setState({ [event.target.name]: !this.state[event.target.name] });
    // console.log(this.state);
  };

  handleSubmit = event => {
    event.preventDefault();
    const allModules = Object.keys(this.state);
    const modules = allModules.filter(module => this.state[module]);
    console.log(modules);
    axios.post('/', modules);
    //   modules.forEach(module => {
    //     if (this.state[module]) {
    //       fs.copyFile(`../storage/${module}`, '../temp/', function () {
    //         console.log(`Moved ${module} folder to temp folder!`);
    //       });
    //     }
    //   });
    //   fs.copyFile('../storage/other', '../temp/', function () {
    //     console.log('Transfer complete, ready for download');
    //   });
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
            <input name='project name' type='text' />
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
            <button type='button'>Download</button>
          </ul>
        </form>
      </div>
    );
  }
}

export default App;
