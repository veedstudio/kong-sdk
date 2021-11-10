import { UpstreamController } from './controllers';
import { ConsumerController } from './controllers/consumer';
import { PluginController } from './controllers/plugin';
import { RouteController } from './controllers/route';
import { ServiceController } from './controllers/service';
import { TargetController } from './controllers/target';
import { KongConfig } from './models/config';
import { Service } from './models/service';

interface KongAPIClient {
  register(service: Service): Promise<Service>;
}

export class Client implements KongAPIClient {
  public readonly services: ServiceController;
  public readonly plugins: PluginController;
  public readonly consumers: ConsumerController;
  public readonly routes: RouteController;
  public readonly upstreams: UpstreamController;
  public readonly targets: TargetController;

  constructor(config: KongConfig) {
    this.services = new ServiceController(config);
    this.plugins = new PluginController(config);
    this.consumers = new ConsumerController(config);
    this.routes = new RouteController(config);
    this.upstreams = new UpstreamController(config);
    this.targets = new TargetController(config);
  }

  register = async (service: Service): Promise<Service> => {
    return await this.services.createOrUpdate(service);
  };
}
