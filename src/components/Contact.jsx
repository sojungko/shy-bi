import React from 'react';
import TextField from 'material-ui/TextField';

const Contact = () => {
  return (
    <div>
      <div>
        <TextField
          hintText="Name"
        />
      </div>
      <div>
        <TextField
          hintText="Email"
        />
      </div>
      <div>
        <TextField
          hintText="Write us something sweet"
        />
      </div>
    </div>
  );
};

export default Contact;
