import { ClientCertificate } from '.';
import { BaseResource } from './base';

export interface Upstream extends BaseResource {
  id?: string;
  name: string;
  algorithm?: 'consistent-hashing' | 'least-connections' | 'round-robin';
  hash_on?: 'none' | 'consumer' | 'ip' | 'header' | 'cookie';
  hash_fallback?: 'none' | 'consumer' | 'ip' | 'header' | 'cookie';
  hash_on_header?: string;
  hash_fallback_header?: string;
  hash_on_cookie?: string;
  hash_on_cookie_path?: string;
  tags?: string[];
  host_header?: string;
  healthchecks?: {
    threshold?: number;

    active?: {
      https_sni?: string;
      concurrency?: number;
      type?: 'tcp' | 'http' | 'https' | 'grpc' | 'grpcs';
      https_verify_certificate?: boolean;
      timeout?: number;
      http_path?: string;

      healthy?: {
        successes?: number;
        http_statuses?: number[];
        interval?: number;
      };
      unhealthy: {
        http_statuses?: number[];
        interval?: number;
        tcp_failures?: number;
        timeouts?: number;
        http_failures?: number;
      };
    };
    passive?: {
      type?: 'tcp' | 'http' | 'https' | 'grpc' | 'grpcs';

      healthy?: {
        successes?: number;
        http_statuses?: number[];
        interval?: number;
      };

      unhealthy?: {
        timeouts?: number;
        tcp_failures?: number;
        http_statuses?: number[];
        http_failures?: number;
      };
    };
  };
  client_certificate?: ClientCertificate;
}
