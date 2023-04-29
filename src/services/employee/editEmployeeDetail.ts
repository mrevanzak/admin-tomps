import { DataResponse } from '@/services/types';
import { httpClient } from '@/utils/http';

import { Employee } from './types';

export default async function editEmployeeDetail(
  id: string,
  employeeId: string,
  data: Employee
) {
  return httpClient.put<DataResponse<Employee>>(
    `/company/${id}/employee/${employeeId}`,
    data
  );
}
