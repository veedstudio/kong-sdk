import { BaseResource } from './base';
import { ClientCertificate } from './client_certificate';

export interface Service extends BaseResource {
  name?: string;
  retries?: number;
  protocol?: string;
  host?: string;
  port?: number;
  path?: string;
  connect_timeout?: number;
  write_timeout?: number;
  read_timeout?: number;
  tags?: string[];
  client_certificate?: ClientCertificate;
  tls_verify?: boolean | null;
  tls_verify_depth?: number | null;
  ca_certificates?: string[];
  url?: string;
}
