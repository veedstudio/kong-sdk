import { Upstream } from '../models/upstream';
import { BaseController } from './base';

export class UpstreamController extends BaseController<Upstream> {
  getResourcePath(): string {
    return 'upstreams';
  }
}
