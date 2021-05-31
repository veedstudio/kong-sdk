import { Service } from '../models/service';
import { BaseController } from './base';

export class ServiceController extends BaseController<Service> {
  getResourcePath(): string {
    return 'services';
  }
}
