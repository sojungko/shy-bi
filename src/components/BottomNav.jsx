import React from 'react';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import Button from '@material-ui/core/Button';

const cardStyle = {
  textAlign: 'right',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  zIndex: 1,
};

const BottomNavBar = () => (
  <div>
    <div style={cardStyle}>
      <button label="About Us" href="/#/aboutus" className="bottom-nav-button" />
      <button label="Contact" href="/#/contact" className="bottom-nav-button" />
    </div>
  </div>
  );

export default BottomNavBar;
