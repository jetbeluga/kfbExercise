import { ApiRegistry } from '@/api/ApiRegistry';
import { ApiAxiosClient } from '@/api/clients/ApiAxiosClient';
import {
  baseUrl,
  debugHttpRequests,
  defaultRequestRetries,
  defaultRequestTimeout,
} from '@/config/api';

let instance: ApiRegistry | null = null;

const initializeApi = (): ApiRegistry =>
  new ApiRegistry(
    new ApiAxiosClient(
      baseUrl,
      defaultRequestRetries,
      defaultRequestTimeout,
      debugHttpRequests,
    ),
  );

export function useApi(): ApiRegistry {
  if (instance === null) {
    instance = initializeApi();
  }

  return instance;
}
