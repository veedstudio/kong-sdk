import { APIError, ErrorCode } from '../errors/APIError';
import { Plugin } from '../models/plugin';
import { Route } from '../models/route';
import { BaseController } from './base';

export class PluginController extends BaseController<Plugin> {
  getResourcePath(): string {
    return 'plugins';
  }

  async getPluginsForRoute(route: Route): Promise<Plugin[]> {
    if (!route.name && !route.id) {
      throw new APIError(
        ErrorCode.INVALID_INPUT,
        'Name or ID for route must be specified'
      );
    }

    const nameOrID = route.id || route.name;

    return await this.performRequest<Plugin[]>(
      'get',
      `routes/${nameOrID}/plugins`
    );
  }
}
