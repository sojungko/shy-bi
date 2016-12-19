import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import App from '../components/App'
import Home from '../components/Home'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import Profile from '../containers/Profile'

export default class Routes extends React.Component {

  render() {
    return (
      <Router history={this.props.browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Home} />
          <Route path='signup' component={Signup} />
          <Route path='login' component={Login} />
          <Route path='navbar' component={Navbar} />
          <Route path='search' component={SearchBar} />
          <Route path='profile' component={Profile} />
        </Route>
      </Router >
    )
  }
}

Routes.displayName = 'Routes';

Routes.propPropTypes = {
  browserHistory: PropTypes.object.isRequired
};
