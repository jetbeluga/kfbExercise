import { ApiRequestConfiguration } from '@/api/ApiService';

export interface ApiPostData {
  [key: string]: unknown;
}

export interface ApiResponse {
  [key: string]: unknown;
}

export interface ApiHttpClient {
  get<T = ApiResponse>(
    path: string,
    requestConfiguration?: ApiRequestConfiguration,
  ): Promise<T>;
  post<T = ApiResponse>(
    path: string,
    data: ApiPostData,
    requestConfiguration?: ApiRequestConfiguration,
  ): Promise<T>;
  setAuthToken(bearerToken: string): void;
  removeAuthToken(): void;
}
