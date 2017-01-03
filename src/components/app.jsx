import React, { PropTypes } from 'react';
import Navbar from './navbar';

console.log('COMPONENT/APP | Exporting APP...');

const App = (props) => {
  console.log('COMPONENT/APP | Creating/Updating APP instance');
  console.log('COMPONENT/APP | Rendering APP Component...');
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node,
};

export default App;

console.log('COMPONENT/APP | Exported APP');
console.log(' ');
