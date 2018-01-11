import jwt from 'jsonwebtoken';

import config from '../../config/config';
import Util from '../shared/Util';

export default class Authentication {
  /**
   * Validate user signup request
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static signupValidator(req, res, next) {
    const body = req.body;

    if (!body.name || body.name.length < 7 || (body.name.split(' ')).length < 2) {
      res.status(400).send({ error: 'Name must have atleast first and last name.' });
    } else if (!body.email || !Util.isEmailValid(body.email)) {
      res.status(400).send({ error: 'Email is invalid.' });
    } else if (!body.password || body.password.length < 6) {
      res.status(400).send({ error: 'Password is invalid. Must be at least 6 characters.' });
    } else if (!body.department) {
      res.status(400).send({ error: 'Employee must belong to a department.' });
    } else if ('phone' in body && !Util.isPhoneValid(body.phone)) {
      res.status(400).send({ error: 'Phone number is invalid.' });
    } else {
      next();
    }
  }

  /**
   * Auuthenticate User
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static authenticate(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization'];

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(401).send({ error: 'Invalid token.' });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
}