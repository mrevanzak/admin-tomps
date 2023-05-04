import { DataResponse } from '@/services/types';
import { httpClient } from '@/utils/http';

import { Company, companySchema } from './types';

export default async function getCompanyDetail(id: string) {
  const response = await httpClient
    .get<DataResponse<Company>>(`/company/${id}`)
    .then(({ data }) => data.data);

  return companySchema.parseAsync(response);
}
