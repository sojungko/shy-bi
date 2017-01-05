import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Navbar from '../components/Navbar';

console.log('CONTAINER/APP | Exporting APP...');

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  componentWillMount() {
    console.log('CONTAINER/APP | Preparing to Render APP');
    /* If you are using Material-UI, it's import for this to be called here.*/
    injectTapEventPlugin();
  }

  componentDidMount() {
    console.log('CONTAINER/APP | Complete Rendering APP');
    console.log(' ');
  }

  componentWillReceiveProps(nextProps) {
    // console.log('COMPONENT/APP | Receiving Props: ', nextProps);
    console.log('COMPONENT/APP | Receiving Props');
  }

  componentDidUpdate() {
    console.log('CONTAINER/APP | Complete Rendering APP');
    console.log(' ');
  }

  render() {
    console.log('CONTAINER/APP | Rendering APP Container...');
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

console.log('CONTAINER/APP | Exported APP');
console.log(' ');
