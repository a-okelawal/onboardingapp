import Util from '../shared/Util';

export default class AuthValidator {
  /**
   * Validate user signup request
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static signupValidator(req, res, next) {
    const body = req.body;

    if (!body.name || body.name.length < 7 || (body.name.split(' ')).length < 2) {
      res.status(400).send({ message: 'Name must have atleast first and last name.' });
    } else if (!body.email || !Util.isEmailValid(body.email)) {
      res.status(400).send({ message: 'Email is invalid.' });
    } else if (!body.password || body.password.length < 6) {
      res.status(400).send({ message: 'Password is invalid. Must be at least 6 characters.' });
    } else if (!body.department) {
      res.status(400).send({ message: 'Employee must belong to a department.' });
    } else if ('phone' in body && !Util.isPhoneValid(body.phone)) {
      res.status(400).send({ message: 'Phone number is invalid.' });
    } else {
      next();
    }
  }
}