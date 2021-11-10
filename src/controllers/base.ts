import axios, { Method, AxiosError } from 'axios';
import { APIError, ErrorCode } from '../errors/APIError';
import { KongConfig } from '../models/config';
import { BaseResource } from '../models/base';

export abstract class BaseController<T extends BaseResource> {
  readonly _config: KongConfig;

  constructor(config: KongConfig) {
    this._config = config;
  }

  abstract getResourcePath(resource?: T): string;

  async performRequest<R extends T | T[]>(
    method: Method,
    endpoint: string,
    data?: any
  ): Promise<R> {
    const url = `${this._config.url}/${endpoint}`;
    try {
      const response = await axios({
        method,
        url,
        data
      });

      if (response.data?.data) {
        return response.data.data as R;
      }

      return response.data as R;
    } catch (e) {
      if ((e as AxiosError).response != undefined) {
        const error = e as AxiosError;
        throw new APIError(
          error.response!.status,
          `On processing route ${method.toUpperCase()} ${url}: ${error.message}`
        );
      }
      throw new APIError(
        ErrorCode.UNKNOWN_ERROR,
        `Unexpected error occurred performing the request: ${
          (e as Error).message
        }`
      );
    }
  }
  async create(resource: T): Promise<T> {
    if (!resource.name) {
      throw new APIError(1, 'Resource name must be defined');
    }

    return this.performRequest<T>(
      'post',
      `${this.getResourcePath()}`,
      resource
    );
  }

  async createOrUpdate(resource: T): Promise<T> {
    if (!resource.name && !resource.id) {
      throw new APIError(1, 'Resource name or ID must be defined');
    }

    const nameOrID = resource.id || resource.name;

    delete resource.id;
    delete resource.name;

    return this.performRequest<T>(
      'put',
      `${this.getResourcePath()}/${nameOrID}`,
      resource
    );
  }

  async update(resource: T): Promise<T> {
    const nameOrID = resource.id || resource.name;
    return this.performRequest<T>(
      'patch',
      `${this.getResourcePath()}/${nameOrID}`,
      resource
    );
  }

  async get(idOrName?: string): Promise<T | T[]> {
    if (idOrName) {
      return this.performRequest<T>(
        'get',
        `${this.getResourcePath()}/${idOrName}`
      );
    }
    return this.performRequest<T[]>('get', this.getResourcePath());
  }

  async delete(idOrName: string): Promise<T> {
    if (!idOrName) {
      throw new APIError(
        ErrorCode.INVALID_INPUT,
        'An ID or name must be provided to delete a resource'
      );
    }

    return this.performRequest(
      'delete',
      `${this.getResourcePath()}/${idOrName}`
    );
  }
}
