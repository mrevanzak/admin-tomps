import { DataResponse } from '@/services/types';
import { httpClient } from '@/utils/http';

import { Company } from './types';

export default async function getCompanyDetail(id: string) {
  return httpClient
    .get<DataResponse<Company>>(`/company/${id}`)
    .then(({ data }) => data.data);
}
