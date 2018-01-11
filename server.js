import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';

import Routes from './app/routes/routes';
import config from './config/Config';

const app = express();
const router = express.Router();

// Connect to db once config is set
mongoose.connect(config.db);

const port = config.port

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', router);
Routes.routes(router);

app.use('/', (req, res) => {
  res.status(200).send('You have reached the route.');
});

const server = app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on ${port}`);
  }
});

export default server;
