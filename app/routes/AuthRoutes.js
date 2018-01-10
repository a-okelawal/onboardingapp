import AuthController from '../controllers/AuthController';
import AuthValidator from '../middleware/AuthValidator';

export default class AuthRoutes {
  static routes(router) {
    router.route('/auth/signup')
      .post(
        AuthValidator.signupValidator,
        AuthController.signup
      );
  }
};