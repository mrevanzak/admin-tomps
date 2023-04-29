import { DataResponse } from '@/services/types';
import { httpClient } from '@/utils/http';

import { Employee } from './types';

export default async function storeEmployee(id: string, data: Employee) {
  return httpClient.post<DataResponse<Employee>>(
    `company/${id}/employee`,
    data
  );
}
