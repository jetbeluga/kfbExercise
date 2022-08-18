import { isProd } from '@/config/app';

export const baseUrl = 'https://mocki.io';
export const defaultRequestRetries = 5;
export const defaultRequestTimeout = 32000;
export const debugHttpRequests = !isProd;
