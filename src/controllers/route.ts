import { Route } from '../models/route';
import { BaseController } from './base';

export class RouteController extends BaseController<Route> {
  getResourcePath(): string {
    return 'routes';
  }

  async getRoutesForService(serviceIdOrName: string): Promise<Route[]> {
    return this.performRequest('get', `services/${serviceIdOrName}/routes`);
  }
}
