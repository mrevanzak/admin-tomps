import { httpClient } from '@/utils/http';

import { companySchema } from './types';

export default async function getCompanies() {
  const response = await httpClient
    .get('/company')
    .then(({ data }) => data.data);

  return companySchema.array().parseAsync(response);
}
