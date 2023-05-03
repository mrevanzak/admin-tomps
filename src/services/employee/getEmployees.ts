import { DataResponse } from '@/services/types';
import { httpClient } from '@/utils/http';

import { Employee, employeeSchema } from './types';

export default async function getEmployees(companyId: string) {
  const response = await httpClient
    .get<DataResponse<Employee[]>>(`/company/${companyId}/employee`)
    .then(({ data }) => data.data);

  return employeeSchema.array().parseAsync(response);
}
