import { DataResponse } from '@/services/types';
import { httpClient } from '@/utils/http';

import { Company, companySchema } from './types';

export default async function getCompanies() {
  const response = await httpClient
    .get<DataResponse<Company[]>>('/company')
    .then(({ data }) => data.data);

  return companySchema.array().parseAsync(response);
}
