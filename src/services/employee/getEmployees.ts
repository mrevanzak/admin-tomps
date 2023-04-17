import { DataResponse } from '@/services/types';
import { httpClient } from '@/utils/http';

import { Employee } from './types';

export default async function getEmployees(companyId: string) {
  return httpClient
    .get<DataResponse<Employee[]>>(`/company/${companyId}/employee`)
    .then(({ data }) => data.data);
}
