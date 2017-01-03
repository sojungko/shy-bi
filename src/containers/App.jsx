import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Navbar from './navbar';

console.log('COMPONENT/APP | Exporting APP...');

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  componentWillMount() {
    console.log('COMPONENT/APP | Preparing to Render APP');
    injectTapEventPlugin();
  }

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
