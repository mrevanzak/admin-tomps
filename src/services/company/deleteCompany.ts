import { DataResponse } from '@/services/types';
import { httpClient } from '@/utils/http';

import { Company } from './types';

export default async function deleteCompany(id: string) {
  return httpClient.delete<DataResponse<Company>>(`/company/${id}`);
}
