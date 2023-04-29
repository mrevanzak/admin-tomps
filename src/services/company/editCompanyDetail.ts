import { DataResponse } from '@/services/types';
import { httpClient } from '@/utils/http';

import { Company } from './types';

export default async function editCompanyDetail(id: string, data: Company) {
  return httpClient.put<DataResponse<Company>>(`/company/${id}`, data);
}
