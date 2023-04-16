import { Switch } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import DatePicker from '@/components/forms/DatePicker';
import Input from '@/components/forms/Input';

import getCompanies from '@/services/company/getCompanies';
import { Company, companySchema } from '@/services/company/types';
import { httpClient } from '@/utils/http';

import SelectInput from './forms/SelectInput';

type CompanyModalProps = {
  opened: boolean;
  close: () => void;
};

export default function CompanyModal({ opened, close }: CompanyModalProps) {
  const [enabled, setEnabled] = useState(false);
  const { mutate, isLoading } = useMutation({
    mutationFn: (formData: Company) => {
      return httpClient.post('/company', formData);
    },
    onSuccess: () => close(),
  });
  const { data, isLoading: isLoadigGet } = useQuery(
    ['company'],
    () => getCompanies(),
    {
      enabled: enabled,
    }
  );
  const methods = useForm<Company>({
    mode: 'onTouched',
    resolver: zodResolver(companySchema),
  });
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    if (!enabled) data.parent_id = undefined;
    mutate(data);
  });

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
          <Switch.Group as='div' className='flex items-center'>
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={clsxm(
                enabled ? 'bg-blue-600' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              )}
            >
              <span
                aria-hidden='true'
                className={clsxm(
                  enabled ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
              />
            </Switch>
            <Switch.Label as='span' className='ml-3'>
              <span className='text-sm font-medium text-gray-900'>
                Have parent company?
              </span>
            </Switch.Label>
          </Switch.Group>
          {enabled && (
            <SelectInput
              id='parent_id'
              label='Parent Company'
              placeholder='Choose company'
              isLoading={isLoadigGet}
            >
              {data?.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </SelectInput>
          )}
          <Button type='submit' isLoading={isLoading}>
            Submit Button
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
}
