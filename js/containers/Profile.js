import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../actions/index';


class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('PROFILE PROPS: ', this.props);
    return (
      <div className="details">
        <div>Name: {this.props.user.user.name}</div>
        <div>Sex: {this.props.user.sex}</div>
        <div>Age: {this.props.user.age}</div>
        <div>City: {this.props.user.city}</div>
      </div>
    );
  }
}

function mapStateToProps({ profile }) {
  return { profile };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { getUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
