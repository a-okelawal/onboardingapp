import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';

import Routes from './app/routes/routes';
import config from './config/config';

const app = express();
const router = express.Router();
const port = config.port

// Connect to db once config is set
mongoose.connect(config.db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.use('/api/v1', router);
Routes.routes(router);

app.use('*', (req, res) => {
  res.sendfile('./public/views/index.html');
});

const server = app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on ${port}`);
  }
});

export default server;
