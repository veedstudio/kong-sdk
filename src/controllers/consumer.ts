import { APIError, ErrorCode } from '../errors/APIError';
import { BaseResource } from '../models/base';
import { Consumer } from '../models/consumer';
import { BaseController } from './base';

export class ConsumerController extends BaseController<Consumer> {
  getResourcePath(): string {
    return 'consumers';
  }

  async getConsumerConfigForPlugin<T extends BaseResource>(
    consumer: Consumer,
    pluginName: string
  ): Promise<T[]> {
    const consumerIdOrName = consumer.username || consumer.custom_id;

    if (!consumerIdOrName) {
      throw new APIError(
        ErrorCode.INVALID_INPUT,
        'Expected at least a name or a custom ID to be set'
      );
    }

    return await this.performRequest<T[]>(
      'get',
      `consumers/${consumerIdOrName}/${pluginName}`
    );
  }

  async createConsumerConfigForPlugin<T extends BaseResource>(
    consumer: Consumer,
    pluginName: string,
    resource: T
  ): Promise<T> {
    const consumerIdOrName = consumer.username || consumer.custom_id;

    if (!consumerIdOrName) {
      throw new APIError(
        ErrorCode.INVALID_INPUT,
        'Expected at least a name or a custom ID to be set'
      );
    }

    return await this.performRequest<T>(
      'post',
      `consumers/${consumerIdOrName}/${pluginName}`,
      resource
    );
  }
}
