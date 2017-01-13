import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from '../components/Home';
import App from '../containers/App';
import LogIn from '../containers/Login';
import SignUp from '../containers/Signup';
import Messages from '../containers/Messages';
import ReceivedMessages from '../components/ReceivedMessages';
import SentMessages from '../components/SentMessages';
import SendMessages from '../containers/SendMessages';
import UserList from '../containers/UserList';
import Matches from '../containers/Matches';
import Likes from '../components/Likes';
import MutualLikes from '../components/MutualLikes';
import Profile from '../containers/Profile';
import RecommendedUsers from '../containers/RecommendedUsers';
import MyAccount from '../containers/MyAccount';
import Token from '../components/Token';
import FacebookSignup from '../containers/FacebookSignup';
import AboutUs from '../components/AboutUs';
import Contact from '../components/Contact';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Profile} />
    <Route path="home" component={Home} />
    <Route path="signup" component={SignUp} />
    <Route path="facebook/signup" component={FacebookSignup} />
    <Route path="search" component={UserList} />
    <Route path="profile/:username" component={Profile} />
    <Route path="messages" component={Messages}>
      <IndexRoute component={ReceivedMessages} />
      <Route path="received" component={ReceivedMessages} />
      <Route path="sent" component={SentMessages} />
      <Route path="send" component={SendMessages} />
    </Route>
    <Route path="matches" component={Matches}>
      <IndexRoute component={MutualLikes} />
      <Route path=":username" component={MutualLikes} />
      <Route path="likes/:username" component={Likes} />
    </Route>
    <Route path="recommended" component={RecommendedUsers} />
    <Route path="myaccount" component={MyAccount} />
    <Route path="login" component={LogIn} />
    <Route path="logout" component={LogIn} />
    <Route path="token/:token" component={Token} />
    <Route path="aboutus" component={AboutUs} />
    <Route path="contact" component={Contact} />
  </Route>
);
