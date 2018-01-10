import AuthRoutes from './AuthRoutes';

export default class Routes {
  /**
   * Register routes
   * @param {*} router 
   */
  static routes(router) {
    AuthRoutes.routes(router);
  }
};