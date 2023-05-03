import { httpClient } from '@/utils/http';

import { companySchema } from './types';

export default async function getCompanyDetail(id: string) {
  const response = await httpClient
    .get(`/company/${id}`)
    .then(({ data }) => data.data);

  return companySchema.parseAsync(response);
}
