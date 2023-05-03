import { z } from 'zod';

export const companySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3).max(50),
  address: z.string().min(1, { message: 'Address is required' }),
  sector: z.string().min(1, { message: 'Sector is required' }),
  date_established: z.coerce.date(),
  email: z.string().email().toLowerCase(),
  phone: z.string().min(1, { message: 'Phone is required' }),
  npwp: z.string().length(15),
  total_employee: z.number().optional(),
  parent_id: z.string().uuid().optional().nullable(),
});

export type Company = z.infer<typeof companySchema>;
