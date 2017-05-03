import React from 'react';
import TextField from 'material-ui/TextField';

const style = {
  fontFamily: 'Source Sans Pro',
  marginTop: '100px',
  marginLeft: '50px',
};

const Contact = () => (
  <div>
    <div>
      <TextField
        style={style}
        hintText="Name"
      />
    </div>
    <div>
      <TextField
        style={style}
        hintText="Email"
      />
    </div>
    <div>
      <TextField
        style={style}
        hintText="Write us something sweet"
      />
    </div>
  </div>
  );

export default Contact;
