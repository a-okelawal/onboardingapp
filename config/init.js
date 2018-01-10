import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const db = process.env.MONGO_TEST;

mongoose.connect(db);

mongoose.connection.once('connected', () => {
  mongoose.connection.db.dropDatabase((err) => {
    console.log('Dropped Database');
    process.exit(0);
  });
});