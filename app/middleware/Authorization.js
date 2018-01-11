import config from '../../config/config';

export default class Authorization {
  /**
   * Authorization check for super admins
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static isSuperAdmin(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    Authorization.decode(token).then((user) => {
      if (user.role !== 'super') {
        res.status(401).send('Unauthorized.')
      } else {
        next();
      }
    }).catch((err) => {
      res.status(err.code).send(err.error);
    });
  }

  /**
   * decode token
   * @param {*} token 
   */
  static decode(token) {
    new Promise((resolve, reject) => {
      jwt.verify(token, config.db, (err, decoded) => {
        if (err) {
          reject({ code: 500, error: err });
        } else {
          if (!decoded) {
            reject({ code: 401, error: 'Invalid token.' });
          } else {
            resolve(decoded);
          }
        }
      });
    });
  }
}