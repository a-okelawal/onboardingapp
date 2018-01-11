import AuthenticationCtrl from '../controllers/AuthenticationCtrl';
import Authentication from '../middleware/Authentication';

export default class AuthRoutes {
  /**
   * All Auth routes
   * @param {*} router 
   */
  static routes(router) {
    router.route('/auth/signup')
      .post(
        Authentication.signupValidator,
        AuthenticationCtrl.signup
      );

    router.route('/auth/login')
      .post(
        AuthenticationCtrl.login
      );
  }
};