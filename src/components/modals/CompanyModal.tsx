import { Switch } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import DatePicker from '@/components/forms/DatePicker';
import Input from '@/components/forms/Input';
import SelectInput from '@/components/forms/SelectInput';

import editCompanyDetail from '@/services/company/editCompanyDetail';
import getCompanies from '@/services/company/getCompanies';
import getCompanyDetail from '@/services/company/getCompanyDetail';
import storeCompany from '@/services/company/storeCompany';
import { Company, companySchema } from '@/services/company/types';

type CompanyModalProps = {
  opened: boolean;
  close: () => void;
  edit?: boolean;
};

export default function CompanyModal({
  opened,
  close,
  edit,
}: CompanyModalProps) {
  const router = useRouter();
  const { id } = router.query;

  const { data: companyData } = useQuery(
    ['company', id],
    () => getCompanyDetail(id as string),
    {
      enabled: !!(id as string),
    }
  );
  const [enabled, setEnabled] = useState(companyData?.parent_id ? true : false);
  const { mutate, isLoading } = useMutation({
    mutationFn: (formData: Company) => {
      return edit
        ? editCompanyDetail(id as string, formData)
        : storeCompany(formData);
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
          <Input id='name' label='Name' defaultValue={companyData?.name} />
          <Input
            id='address'
            label='Address'
            defaultValue={companyData?.address}
          />
          <Input
            id='sector'
            label='Sector'
            defaultValue={companyData?.sector}
          />
          <DatePicker
            id='date_established'
            label='Date Established'
            defaultValue={companyData?.date_established.toString()}
          />
          <Input id='email' label='Email' defaultValue={companyData?.email} />
          <Input
            id='phone'
            label='Phone'
            helperText='Use 08xx format'
            defaultValue={companyData?.phone}
          />
          <Input id='npwp' label='NPWP' defaultValue={companyData?.npwp} />
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
              defaultValue={companyData?.parent_id || undefined}
            >
              {data
                ?.filter((company) => company.id !== companyData?.id)
                .map((company) => (
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
