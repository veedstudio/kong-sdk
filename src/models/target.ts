import { BaseResource } from './base';

export interface Target extends BaseResource {
  target: string;
  weight?: number;
  tags?: string[];
  upstream?: {
    id: string;
  };
}
