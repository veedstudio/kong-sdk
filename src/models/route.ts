import { Method } from 'axios';
import { BaseResource } from './base';
import { Protocol } from './protocols';
import { Service } from './service';

interface Headers {
  [key: string]: string[];
}

enum PathHandling {
  V0 = 'v0',
  V1 = 'v1'
}

export interface Route extends BaseResource {
  protocols?: Protocol[];
  methods?: Method[];
  hosts?: string[];
  paths?: string[];
  headers?: Headers;
  https_redirect_status_code?: number[];
  regex_priority?: number;
  strip_path?: boolean;
  path_handling?: PathHandling;
  preserve_host?: boolean;
  request_buffering?: boolean;
  response_buffering?: boolean;
  snis?: string[];
  sources?: string[];
  destinations?: string[];
  tags?: string[];
  service?: Service;
}
