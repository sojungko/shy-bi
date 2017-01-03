import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Navbar from '../components/Navbar';

console.log('CONTAINER/APP | Exporting APP...');

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      open: false,
    };
  }

  componentWillMount() {
    console.log('CONTAINER/APP | Preparing to Render APP');
    /* If you are using Material-UI, it's import for this to be called here.*/
  }

  componentDidMount() {
    console.log('CONTAINER/APP | Complete Rendering APP');
    console.log(' ');
  }

  componentDidUpdate() {
    console.log('CONTAINER/APP | Complete Rendering APP');
    console.log(' ');
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  render() {
    console.log('CONTAINER/APP | Rendering APP Container...');
    return (
      <div>
        <AppBar
          title="Menu"
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer open={this.state.open}>
          <MenuItem onTouchTap={this.handleToggle}>Back</MenuItem>
          <MenuItem>Login</MenuItem>
          <MenuItem>Signup</MenuItem>
        </Drawer>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

console.log('CONTAINER/APP | Exported APP');
console.log(' ');
