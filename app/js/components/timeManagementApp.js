import React, { Component } from 'react';
import Dashboard from './dashboard';

export default class TimeManagementApp extends Component {
  constructor(props){
    super(props);
  }

  calculate(){
    return 'this is my calculation, 2+2=4'
  }

  render(){
    return(
      <main>
        <Dashboard timerange={ this.calculate() } />
      </main>
    )
  }
}
