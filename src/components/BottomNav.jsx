import React from 'react';
import { Card, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const cardStyle = {
  textAlign: 'right',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  zIndex: 1,
};

const BottomNavBar = () => (
  <Card>
    <CardActions style={cardStyle}>
      <FlatButton label="About Us" href="/#/aboutus" className="bottom-nav-button" />
      <FlatButton label="Contact" href="/#/contact" className="bottom-nav-button" />
    </CardActions>
  </Card>
  );

export default BottomNavBar;
