import { DataResponse } from '@/services/types';
import { httpClient } from '@/utils/http';

import { Employee, employeeSchema } from './types';

export default async function getEmployeeDetail(
  id: string,
  employeeId: string
) {
  const response = await httpClient
    .get<DataResponse<Employee>>(`/company/${id}/employee/${employeeId}`)
    .then(({ data }) => data.data);

  return employeeSchema.parseAsync(response);
}
