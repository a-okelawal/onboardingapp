import Authentication from '../controllers/Authentication';
import AuthValidator from '../middleware/AuthValidator';

export default class AuthRoutes {
  /**
   * All Auth routes
   * @param {*} router 
   */
  static routes(router) {
    router.route('/auth/signup')
      .post(
        AuthValidator.signupValidator,
        Authentication.signup
      );

    router.route('/auth/login')
      .post(
        Authentication.login
      );
  }
};