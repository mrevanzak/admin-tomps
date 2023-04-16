import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import DatePicker from '@/components/forms/DatePicker';
import Input from '@/components/forms/Input';

import { Employee, employeeSchema } from '@/services/employee/types';
import { httpClient } from '@/utils/http';

import SelectInput from './forms/SelectInput';

type EmployeeModalProps = {
  opened: boolean;
  close: () => void;
};

export default function EmployeeModal({ opened, close }: EmployeeModalProps) {
  const router = useRouter();
  const { id } = router.query;

  const { mutate, isLoading } = useMutation({
    mutationFn: (formData: Employee) => {
      return httpClient.post(`company/${id}/employee`, formData);
    },
    onSuccess: () => close(),
  });
  const methods = useForm<Employee>({
    mode: 'onTouched',
    resolver: zodResolver(employeeSchema),
  });
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    data.company_id = id as string;
    mutate(data);
  });

  return (
    <Modal opened={opened} onClose={close} title='Employee' centered>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className='mt-4 max-w-lg space-y-4'>
          <Input id='name' label='Name' />
          <SelectInput id='category' label='Category'>
            <option value='Direksi'>Direksi</option>
            <option value='Contact Person'>Contact Person</option>
          </SelectInput>
          <Input id='position' label='Position' />
          <DatePicker id='date_of_birth' label='Date of Birth' />
          <Input id='address' label='Address' />
          <Input id='phone' label='Phone' helperText='Use 08xx format' />
          <Input
            id='office_phone'
            label='Office Phone'
            helperText='use 08xx format'
          />
          <Input id='email' label='Email' />
          <Input id='hobby' label='Hobby' />
          <Input id='unit' label='Unit' />
          <Button type='submit' isLoading={isLoading}>
            Submit Button
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
}
