import React from 'react';
// import TextField from '@material-ui/core/TextField';

const style = {
  fontFamily: 'Source Sans Pro',
  marginTop: '100px',
  marginLeft: '50px',
};

const Contact = () => (
  <div>
    <div>
      <textarea
        style={style}
        hintText="Name"
      />
    </div>
    <div>
      <textarea
        style={style}
        hintText="Email"
      />
    </div>
    <div>
      <textarea
        style={style}
        hintText="Write us something sweet"
      />
    </div>
  </div>
  );

export default Contact;
