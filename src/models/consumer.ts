import { BaseResource } from './base';

export interface Consumer extends BaseResource {
  username?: string;
  custom_id?: string;
}
