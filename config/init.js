import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import User from '../app/models/User';

dotenv.config();

const db = process.env.MONGO_TEST;

mongoose.connect(db);

mongoose.connection.once('connected', () => {
  mongoose.connection.db.dropCollection('users', (err) => {
    console.log('Dropped User');
    const salt = bcrypt.genSaltSync(10);

    User.create({
      name: 'Super Admin',
      email: process.env.SUPEREMAIL,
      password: bcrypt.hashSync(process.env.SUPERPASSWORD, salt),
      role: 'super',
      phone: process.env.SUPERPHONE,
      department: 'Management'
    }, (err, user) => {
      console.log('Created Super User');
      process.exit(0);
    });
  });
});