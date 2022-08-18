import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { ApiRequestConfiguration } from '@/api/ApiService';
import axiosRetry from 'axios-retry';
import { ApiHttpClient, ApiPostData, ApiResponse } from '../ApiHttpClient';

export interface CustomAxiosRequestConfig
  extends Omit<AxiosRequestConfig, 'headers'> {
  headers: {
    Authorization?: string;
  };
}

export class ApiAxiosClient implements ApiHttpClient {
  private readonly axios: AxiosInstance;

  private readonly defaultRequestConfiguration: CustomAxiosRequestConfig;

  constructor(
    baseURL: string,
    defaultRequestRetries: number,
    defaultTimeout: number,
    debugHttpRequests: boolean,
  ) {
    // @todo handle CORS when running in docker against kfb.private
    this.defaultRequestConfiguration = {
      timeout: defaultTimeout,
      'axios-retry': {
        retries: defaultRequestRetries,
      },
      headers: {},
    };

    this.axios = axios.create({
      baseURL,
      ...this.defaultRequestConfiguration,
    });

    this.setupRetry();
    if (debugHttpRequests) {
      this.setupDebugInterceptor();
    }
    this.setupTimeoutErrorInterceptor();
  }

  private setupTimeoutErrorInterceptor(): void {
    this.axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => Promise.reject(error),
    );
  }

  private setupDebugInterceptor(): void {
    this.axios.interceptors.request.use(
      (request: AxiosRequestConfig) => request,
    );
    this.axios.interceptors.response.use((response: AxiosResponse) => response);
  }

  private setupRetry(): void {
    axiosRetry(this.axios, {
      retries: this.defaultRequestConfiguration['axios-retry']?.retries ?? 0,
      retryDelay: (retryCount) =>
        2 ** retryCount * 100 + (Math.floor(Math.random() * 1000) + 1),
    });
  }

  private prepareRequestConfiguration(
    customRequestConfiguration?: ApiRequestConfiguration,
  ): AxiosRequestConfig {
    const requestConfiguration: AxiosRequestConfig = {
      timeout:
        customRequestConfiguration?.timeout ||
        this.defaultRequestConfiguration.timeout,
      'axios-retry': {
        retries:
          (customRequestConfiguration?.retries ||
            this.defaultRequestConfiguration['axios-retry']?.retries) ??
          0,
      },
    };

    return { ...this.defaultRequestConfiguration, ...requestConfiguration };
  }

  public async get<T = ApiResponse>(
    path: string,
    requestConfiguration?: ApiRequestConfiguration,
  ): Promise<T> {
    return this.axios
      .get<T>(path, this.prepareRequestConfiguration(requestConfiguration))
      .then((res) => res.data);
  }

  public async post<T = ApiResponse>(
    path: string,
    data?: ApiPostData,
    requestConfiguration?: ApiRequestConfiguration,
  ): Promise<T> {
    return this.axios
      .post<T>(
        path,
        data,
        this.prepareRequestConfiguration(requestConfiguration),
      )
      .then((res) => res.data);
  }

  public setAuthToken(bearerToken: string): void {
    this.defaultRequestConfiguration.headers.Authorization = `Bearer ${bearerToken}`;
  }

  public removeAuthToken(): void {
    delete this.defaultRequestConfiguration.headers.Authorization;
  }
}
