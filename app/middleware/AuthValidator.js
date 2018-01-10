export default class AuthValidator {
  /**
   * Validate creation request
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static signupValidator(req, res, next) {
    const body = req.body;

    if (!body.username || body.username.length < 5) {
      res.status(400).send({ message: 'Username is invalid. it should be at least 5 characters.' });
    } else if (!body.password || body.password.length < 6) {
      res.status(400).send({ message: 'Password is invalid. it should be at least 6 characters.' });
    } else {
      next();
    }
  }
}