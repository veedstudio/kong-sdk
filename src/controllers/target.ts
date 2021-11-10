import { Target } from '../models/target';
import { BaseController } from './base';

export class TargetController extends BaseController<Target> {
  getResourcePath(parentResource?: Target): string {
    if (!parentResource) {
      throw new Error(
        'Operation not supported: GET and DELETE targets are currently not supported.'
      );
    }

    if (!parentResource.upstream) {
      throw new Error('Upstream must be provided for this operation');
    }

    // Get the upstream
    const upstream = parentResource.upstream;
    delete parentResource.upstream;

    return `upstreams/${upstream.id}/targets`;
  }
}
