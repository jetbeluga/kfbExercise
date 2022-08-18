import { ApiService } from '@/api/ApiService';
import fetch from 'unfetch';

export async function fetchTravelDate() {
  const returnData = await fetch(
    `https://mocki.io/v1/185679b9-8ed1-4080-9070-4034502b218d`,
  )
    .then((r) => r.json())
    .catch((r) => {
      throw new Error(r.status);
    });
  return returnData;
}
export class TravelDateService extends ApiService {}
