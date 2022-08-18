import { ApiHttpClient } from '@/api/ApiHttpClient';
import { defaultRequestRetries, defaultRequestTimeout } from '@/config/api';

export interface ApiRequestConfiguration {
  retries?: number;
  timeout?: number;
}

export abstract class ApiService {
  protected client: ApiHttpClient;

  protected defaultRequestConfiguration: ApiRequestConfiguration = {
    retries: defaultRequestRetries,
    timeout: defaultRequestTimeout,
  };

  constructor(client: ApiHttpClient) {
    this.client = client;
  }
}
