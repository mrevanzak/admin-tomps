import { z } from 'zod';

export const employeeSchema = z.object({
  name: z.string().min(3).max(50),
  status: z.boolean().optional(),
  category: z.string(),
  position: z.string().min(1, 'Position is required'),
  date_of_birth: z.string().pipe(z.coerce.date()),
  address: z.string().min(1, 'Address is required'),
  email: z.string().email().toLowerCase(),
  phone: z.string().min(1, 'Phone is required'),
  office_phone: z.string().min(1, 'Office phone is required'),
  hobby: z.string().min(1, 'Hobby is required'),
  unit: z.string().min(1, 'Unit is required'),
  company_id: z.string().uuid().optional(),
});

export type Employee = z.infer<typeof employeeSchema>;
