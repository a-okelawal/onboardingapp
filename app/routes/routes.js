import AuthRoutes from './AuthRoutes';
import DepartmentRoutes from './DepartmentRoutes';

export default class Routes {
  /**
   * Register routes
   * @param {*} router 
   */
  static routes(router) {
    AuthRoutes.routes(router);
    DepartmentRoutes.routes(router);
  }
};