import bcrypt, { genSalt } from 'bcrypt';
import User from '../models/User';
import { reject } from 'bcrypt/lib/promises';

export default class AuthController {
  /**
   * Logic for creating a user
   * @param {*} req 
   * @param {*} res 
   */
  static signup(req, res) {
    const body = req.body;

    User.findOne({
      email: body.email
    }, (err, user) => {
      if (err) {
        res.status(500).send(err);
      } else if (user) {
        res.status(409).send({ message: 'User already exists.' });
      } else {
        const salt = 10;
        bcrypt.genSalt(salt, (err, genSalt) => {
          if (err) {
            res.status(500).send(err);
          } else {
            bcrypt.hash(body.password, (err, hash) => {
              if (err) {
                res.status(500).send(err);
              }
              user = new User({
                email: body.email,
                password: hash,
                role: body.role
              });

              user.save((err) => {
                if (err) {
                  res.status(500).send(err);
                } else {
                  //TODO: Also save employee details is employee
                  res.status(201).send({ message: `User ${user.email} has been created successfully.` });
                }
              });
            });
          }
        });
      }
    });
  }

  static saveUser(data) {
    return new Promise((resolve, reject) => {
      User.findOne({ username: data.username }, (err, user) => {
        if (err) {
          reject({ code: 500, error: err});
        } else if (user) {
          reject({ code: 409, error: 'User already exists.'});
        } else {
          hashPassword(data.password)
          user = new User({
            username: data.username,
            password: hash,
            role: body.role
          });


        }
      });
    });
  }

  /**
   * Function to hash password
   * @param {*} password 
   */
  static hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}