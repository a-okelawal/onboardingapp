import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
const router = express.Router();

// Connect to db once config is set
// mongoose.connect();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', router);

app.use('/', (req, res) => {
  res.status(200).send('You have reached the route.');
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on ${port}`);
  }
});
