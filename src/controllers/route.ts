import { Route } from '../models/route';
import { BaseController } from './base';

export class RouteController extends BaseController<Route> {
  getResourcePath(): string {
    return 'routes';
  }
}
