import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../../config/Config';
import User from '../models/User';

export default class Authentication {
  /**
   * Logic for login
   * @param {*} req 
   * @param {*} res 
   */
  static login(req, res) {
    const body = req.body;

    Authentication.findUser(body).then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User with email does not exist.' });
      } else {
        if (Authentication.comparePasswords(body.password, user.password)) {
          const jwt = Authentication.generateToken(user);
          res.status(200).send({user, jwt});
        } else {
          res.status(401).send({ message: 'Invalid password.' });
        }
      }
    }).catch((err) => {
      res.status(err.code).send({ error: err.error});
    });
  }

  /**
   * Logic for creating a user
   * @param {*} req 
   * @param {*} res 
   */
  static signup(req, res) {
    const body = req.body;

    let user = new User({
      name: body.name,
      email: body.email,
      password: Authentication.hashPassword(body.password),
      phone: body.phone,
      role: body.role
    });

    Authentication.createUser(user).then((result) => {
      res.status(201).send({ message: `${result.name} was created successfully as a/an ${result.role}.` });
    }).catch((err) => {
      res.status(err.code).send({ error: err.error});
    });
  }

  /**
   * Save User
   * @param {*} user 
   */
  static createUser(user) {
    return new Promise((resolve, reject) => {
      Authentication.findUser(user).then((result) => {
        if (result) {
          reject({ code: 409, error: 'User with email already exists.' });
        } else {
          user.save((err) => {
            if (err) {
              reject({ code: 500, error: err });
            } else {
              resolve(user);
            }
          });
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
   * Find User
   * @param {*} data 
   */
  static findUser(data) {
    return new Promise((resolve, reject) => {
      User.findOne({ email: data.email }, (err, user) => {
        if (err) {
          reject({ code: 500, error: err});
        } else {
          resolve(user);
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

  /**
   * Compare Passwords
   * @param {*} password 
   * @param {*} hash 
   */
  static comparePasswords(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  /**
   * Generate signed token
   * @param {*} user 
   */
  static generateToken(user) {
    return jwt.sign({ id: user._id, name: user.name, role: user.role }, config.secret);
  }
}