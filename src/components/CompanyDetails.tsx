import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import Button from '@/components/buttons/Button';

import getCompanyDetail from '@/services/company/getCompanyDetail';

type CompanyDetailsProps = {
  open: () => void;
};

export default function CompanyDetails({ open }: CompanyDetailsProps) {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery(
    ['company', id],
    () => getCompanyDetail(id as string),
    {
      enabled: router.isReady,
    }
  );

  return (
    <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
      <div className='flex justify-between px-4 py-5 sm:px-6'>
        <div>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            {data?.name}
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>
            {data?.address}
          </p>
        </div>
        <div className='ml-4 mt-2 flex-shrink-0'>
          <Button onClick={open}>Edit</Button>
        </div>
      </div>
      <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
        <dl className='sm:divide-y sm:divide-gray-200'>
          <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
            <dt className='text-sm font-medium text-gray-500'>
              Date established
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {data?.date_established?.toString()}
            </dd>
          </div>
          <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
            <dt className='text-sm font-medium text-gray-500'>Sector</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {data?.sector}
            </dd>
          </div>
          <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
            <dt className='text-sm font-medium text-gray-500'>Email</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {data?.email}
            </dd>
          </div>
          <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
            <dt className='text-sm font-medium text-gray-500'>Phone number</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {data?.phone}
            </dd>
          </div>
          <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
            <dt className='text-sm font-medium text-gray-500'>NPWP</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {data?.npwp}
            </dd>
          </div>
          <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
            <dt className='text-sm font-medium text-gray-500'>
              Total Employee
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {data?.total_employee}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
