import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().min(3).max(50),
  address: z.string(),
  sector: z.string(),
  date_established: z.date(),
  email: z.string().email().toLowerCase(),
  phone: z.string(),
  npwp: z.string().length(15),
  total_employee: z.preprocess(Number, z.number()),
  parent_id: z.string().uuid().optional(),
});

export type Company = z.infer<typeof companySchema> & {
  id: string;
};
