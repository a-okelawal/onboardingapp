var bodyParser = require('body-parser');
var express = require('express');
var dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.use('*', (req, res) => {
  res.sendfile('./public/views/index.html');
});

var server = app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on ${port}`);
  }
});

module.exports = server;
