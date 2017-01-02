import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/app';
import LogIn from '../components/login';
import SignUp from '../components/signup';
import UserList from '../containers/UserList';
import Profile from '../containers/Profile';

console.log('REACT-ROUTER | Exporting REACT-ROUTER...');

console.log('REACT-ROUTER | Importing APP Component');
console.log('REACT-ROUTER | Importing LOG IN Component');
console.log('REACT-ROUTER | Importing SignUp Component');
console.log('REACT-ROUTER | Importing UserList Component');
console.log('REACT-ROUTER | Importing Profile Component');


console.log('REACT-ROUTER | Defining Routes...');
console.log('REACT-ROUTER | Path: "/" Component: App');
console.log('REACT-ROUTER | Path: "/" IndexRoute Component: App, Profile');
console.log('REACT-ROUTER | Path: "/signup" Component: App, SignUp');
console.log('REACT-ROUTER | Path: "/search" Component: App, UserList');
console.log('REACT-ROUTER | Path: "/profile" Component: App, Profile');
console.log('REACT-ROUTER | Path: "/login" Component: App, login');

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Profile} />
    <Route path="signup" component={SignUp} />
    <Route path="search" component={UserList} />
    <Route path="profile" component={Profile} />
    <Route path="login" component={LogIn} />
  </Route>
);

console.log('REACT-ROUTER | Exported REACT-ROUTER as ROUTES');
console.log(' ');
