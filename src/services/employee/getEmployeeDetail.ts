import { DataResponse } from '@/services/types';
import { httpClient } from '@/utils/http';

import { Employee } from './types';

export default async function getEmployeeDetail(
  id: string,
  employeeId: string
) {
  return httpClient
    .get<DataResponse<Employee>>(`/company/${id}/employee/${employeeId}`)
    .then(({ data }) => data.data);
}
