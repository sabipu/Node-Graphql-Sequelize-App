const express = require('express');
const bodyParser = require('bodyParser');
const cors = require('cors');

const port = process.env.PORT || 7000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var Users = require('./routes/Users')

app.user('/users', Users);

app.listen(port, function() {
  console.log(`Server running on ${port}`)
})