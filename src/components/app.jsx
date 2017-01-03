import React, { Component } from 'react';
import Navbar from './navbar';

console.log('COMPONENT/APP | Exporting APP...');

export default class App extends Component {
  componentDidMount() {
    console.log('COMPONENT/APP | Complete Rendering APP');
    console.log(' ');
  }

  componentDidUpdate() {
    console.log('COMPONENT/APP | Complete Rendering APP');
    console.log(' ');
  }

  render() {
    console.log('COMPONENT/APP | Rendering APP Component...');
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

console.log('COMPONENT/APP | Exported APP');
console.log(' ');
