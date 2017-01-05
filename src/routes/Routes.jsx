import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../containers/App';
import LogIn from '../containers/Login';
import SignUp from '../containers/Signup';
import Messages from '../containers/Messages';
import UserList from '../containers/UserList';
import Likes from '../containers/Likes';
import Profile from '../containers/Profile';
import RecommendedUsers from '../containers/RecommendedUsers';
import MyAccount from '../containers/MyAccount';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Profile} />
    <Route path="signup" component={SignUp} />
    <Route path="search" component={UserList} />
    <Route path="profile/:username" component={Profile} />
    <Route path="messages" component={Messages} />
    <Route path="likes/:username" component={Likes} />
    <Route path="recommended" component={RecommendedUsers} />
    <Route path="myaccount" component={MyAccount} />
    <Route path="login" component={LogIn} />
    <Route path="logout" component={LogIn} />
  </Route>
);
