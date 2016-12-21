import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../actions/index';


class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getUser();
  }

  render() {
    console.log('PROFILE PROPS: ', this.props);
    return (
      <div className="details">
        <div>Name: {this.props.profile.name}</div>
        <div>Sex: {this.props.profile.sex}</div>
        <div>Age: {this.props.profile.age}</div>
        <div>City: {this.props.profile.city}</div>
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
