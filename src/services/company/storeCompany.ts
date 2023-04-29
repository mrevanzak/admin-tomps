import { DataResponse } from '@/services/types';
import { httpClient } from '@/utils/http';

import { Company } from './types';

export default async function storeCompany(data: Company) {
  return httpClient.post<DataResponse<Company>>('/company', data);
}
