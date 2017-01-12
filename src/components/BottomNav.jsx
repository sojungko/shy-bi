import React from 'react';
import { Card, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const BottomNavBar = () => {
  return (
    <Card>
      <CardActions style={{ textAlign: 'right' }}>
        <FlatButton label="About Us" href="/#/aboutus" />
        <FlatButton label="Contact" href="/#/contact" />
      </CardActions>
    </Card>
  );
};

export default BottomNavBar;
