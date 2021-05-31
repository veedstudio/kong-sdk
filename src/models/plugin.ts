import { BaseResource } from './base';
import { Consumer } from './consumer';
import { Protocol } from './protocols';
import { Route } from './route';

export interface Plugin extends BaseResource {
  config: any;
  enabled?: boolean;
  route?: Route | null;
  consumer?: Consumer | null;
  protocols?: Protocol[];
}
