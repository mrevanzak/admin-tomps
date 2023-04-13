import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import DatePicker from '@/components/forms/DatePicker';
import Input from '@/components/forms/Input';

import { Company, companySchema } from '@/services/company/types';
import { httpClient } from '@/utils/http';

type CompanyModalProps = {
  opened: boolean;
  close: () => void;
};

export default function CompanyModal({ opened, close }: CompanyModalProps) {
  const { mutate, isLoading } = useMutation({
    mutationFn: (formData: Company) => {
      return httpClient.post('/company', formData);
    },
    onSuccess: () => close(),
  });
  const methods = useForm<Company>({
    mode: 'onTouched',
    resolver: zodResolver(companySchema),
  });
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => mutate(data));

  return (
    <Modal opened={opened} onClose={close} title='Company' centered>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className='mt-4 max-w-lg space-y-4'>
          <Input id='name' label='Name' />
          <Input id='address' label='Address' />
          <Input id='sector' label='Sector' />
          <DatePicker id='date_established' label='Date Established' />
          <Input id='email' label='Email' />
          <Input id='phone' label='Phone' helperText='Use 08xx format' />
          <Input id='npwp' label='NPWP' />
          <Input id='total_employee' label='Total Employee' />
          <Button type='submit' isLoading={isLoading}>
            Submit Button
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
}
