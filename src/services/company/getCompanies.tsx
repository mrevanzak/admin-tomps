import { DataResponse } from '@/services/types';
import { httpClient } from '@/utils/http';

import { Company } from './types';

export default async function getCompanies() {
  return httpClient
    .get<DataResponse<Company[]>>('/company')
    .then(({ data }) => data.data);
}
