import { DataResponse } from '@/services/types';
import { httpClient } from '@/utils/http';

import { Employee } from './types';

export default async function deleteEmployee(id: string, employeeId: string) {
  return httpClient.delete<DataResponse<Employee>>(
    `/company/${id}/employee/${employeeId}`
  );
}
