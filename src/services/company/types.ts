import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().min(3).max(50),
  address: z.string().min(1, { message: 'Address is required' }),
  sector: z.string().min(1, { message: 'Sector is required' }),
  date_established: z.date(),
  email: z.string().email().toLowerCase(),
  phone: z.string().min(1, { message: 'Phone is required' }),
  npwp: z.string().length(15),
  total_employee: z.number().optional(),
  parent_id: z.string().uuid().optional(),
});

export type Company = z.infer<typeof companySchema> & {
  id: string;
};
