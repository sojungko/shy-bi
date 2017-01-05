import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Navbar from '../components/Navbar';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  componentWillMount() {
    injectTapEventPlugin();
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}
