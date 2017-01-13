import React from 'react';
import { Card, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const cardStyle = {
  textAlign: 'right',
  backgroundColor: '#04284a',
  position: 'fixed',
  bottom: 0,
  width: '100%',
};

const buttonStyle = {
  fontFamily: 'Maria',
  color: '#FFFFFF',
};

const BottomNavBar = () => (
  <Card>
    <CardActions style={cardStyle}>
      <FlatButton label="About Us" href="/#/aboutus" style={buttonStyle} />
      <FlatButton label="Contact" href="/#/contact" style={buttonStyle} />
    </CardActions>
  </Card>
  );

export default BottomNavBar;
