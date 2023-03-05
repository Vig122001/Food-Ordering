//imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const zomatoRoutes = require('./routes/zomato');
const mongoose = require('mongoose');

//connect to mongoDB

const PORT = 7878;

mongoose.connect(
  'mongodb://localhost/zomato',
  () => {
    console.log('mongoDB connected');
  },
  (e) => console.log(e)
);
//create express server
var app = express();

//add middleware before routes
app.use(bodyParser.json());
app.use(cors());

//middleware routes
app.use('/zomato', zomatoRoutes);

/*heruko configurations
if (process.env.NODE_ENV == 'production') {
  app.use(express.static('frontend/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}*/

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
