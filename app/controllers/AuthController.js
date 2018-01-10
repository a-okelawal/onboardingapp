import bcrypt from 'bcrypt';
import User from '../models/User';

export default class AuthController {
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
      password: AuthController.hashPassword(body.password),
      phone: body.phone,
      role: body.role
    });

    AuthController.createUser(user).then((result) => {
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
      AuthController.findUser(user).then((result) => {
        if (result) {
          reject({ code: 409, error: 'User with email already exists.' });
        } else {
          user.save((err) => {
            if (err) {
              reject(err);
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
}