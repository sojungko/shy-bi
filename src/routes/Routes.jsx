import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../containers/App';
import LogIn from '../containers/Login';
import SignUp from '../containers/Signup';
import UserList from '../containers/UserList';
import Profile from '../containers/Profile';

console.log('REACT-ROUTER | Exporting REACT-ROUTER...');

console.log('REACT-ROUTER | Importing APP Container');
console.log('REACT-ROUTER | Importing LOG IN Container');
console.log('REACT-ROUTER | Importing SignUp Container');
console.log('REACT-ROUTER | Importing UserList Container');
console.log('REACT-ROUTER | Importing Profile Container');
console.log(' ');

console.log('REACT-ROUTER | Defining Routes...');
console.log('REACT-ROUTER | Path: "/" Container: App');
console.log('REACT-ROUTER | Path: "/" IndexRoute Container: App, Profile');
console.log('REACT-ROUTER | Path: "/signup" Container: App, SignUp');
console.log('REACT-ROUTER | Path: "/search" Container: App, UserList');
console.log('REACT-ROUTER | Path: "/profile" Container: App, Profile');
console.log('REACT-ROUTER | Path: "/login" Container: App, login');

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Profile} />
    <Route path="signup" component={SignUp} />
    <Route path="search" component={UserList} />
    <Route path="profile" component={Profile} />
    <Route path="login" component={LogIn} />
    <Route path="logout" component={LogIn} />
  </Route>
);

console.log('REACT-ROUTER | Exported REACT-ROUTER as ROUTES');
console.log(' ');
