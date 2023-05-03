import { DataResponse } from '@/services/types';
import { httpClient } from '@/utils/http';

import { CompanyHierarchy } from './types';

export default async function getHierarchy(companyId: string) {
  return httpClient
    .get<DataResponse<CompanyHierarchy>>(`/company/${companyId}/hierarchy`)
    .then(({ data }) => data.data);
}
