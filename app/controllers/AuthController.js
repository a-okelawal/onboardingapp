import bcrypt, { genSalt } from 'bcrypt';
import User from '../models/User';

export default class AuthController {
  /**
   * Logic for creating a user
   * @param {*} req 
   * @param {*} res 
   */
  static signup(req, res) {
    const body = req.body;

    User.findOne({
      username: body.username
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
                username: body.username,
                password: hash,
                role: body.role
              });

              user.save((err) => {
                if (err) {
                  res.status(500).send(err);
                } else {
                  //TODO: Also save employee details is employee
                  res.status(201).send({ message: `User ${user.username} has been created successfully.` });
                }
              });
            });
          }
        });
      }
    });
  }
}