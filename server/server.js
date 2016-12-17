const express = require('express');
const app = express();

require('./routes')(app, express);

const port = process.env.PORT || 8888;

app.get('/', (req, res) => {
  res.send('DATA STRUCTURE DUCKS');
});

app.listen(port, (err) => {
  if (err) {
    console.error('Cannot start server: ', err);
  } else {
    console.log('Shy-bi is listening to port : ', port);
  }
});
