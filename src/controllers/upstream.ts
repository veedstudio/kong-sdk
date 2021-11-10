import { Service } from '../models/service';
import { BaseController } from './base';

export class UpstreamController extends BaseController<Service> {
  getResourcePath(): string {
    return 'upstreams';
  }
}
