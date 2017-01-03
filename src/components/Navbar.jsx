import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

console.log('COMPONENT/NAV BAR | Exporting NAV BAR...');

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const Navbar = () => {
  return (
    <Tabs>
      <Tab label="Search">
        <div>
          <h2 style={styles.headline}>Search</h2>
        </div>
      </Tab>
      <Tab label="Recommended For You">
        <div>
          <h2 style={styles.headine}>Recommended For You</h2>
        </div>
      </Tab>
      <Tab label="My Profile">
        <div>
          <h2 style={styles.headline}>My Profile</h2>
        </div>
      </Tab>
    </Tabs>
  );
};


export default Navbar;
console.log('    COMPONENT/NAV BAR | Rendering NAV BAR Component...');
console.log('COMPONENT/NAV BAR | Exported APP');
console.log(' ');
