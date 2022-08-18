import { ApiHttpClient } from '@/api/ApiHttpClient';
import { TravelDateService } from '@/api/services/travelDate/TravelDateService';

export class ApiRegistry {
  public readonly travelDate: TravelDateService;

  constructor(client: ApiHttpClient) {
    this.travelDate = new TravelDateService(client);
  }
}
