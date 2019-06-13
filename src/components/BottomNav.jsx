import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

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
      <Button label="About Us" href="/#/aboutus" className="bottom-nav-button" />
      <Button label="Contact" href="/#/contact" className="bottom-nav-button" />
    </CardActions>
  </Card>
  );

export default BottomNavBar;
