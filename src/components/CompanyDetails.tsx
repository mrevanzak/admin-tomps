import { useDisclosure } from '@mantine/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { HiTrash } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import AlertModal from '@/components/modals/AlertModal';
import CompanyModal from '@/components/modals/CompanyModal';
import HierarchyModal from '@/components/modals/HierarchyModal';

import deleteCompany from '@/services/company/deleteCompany';
import getCompanyDetail from '@/services/company/getCompanyDetail';

export default function CompanyDetails() {
  const [opened, { open, close }] = useDisclosure();
  const [openedAlert, { open: openAlert, close: closeAlert }] = useDisclosure();
  const [openedHierarchy, { open: openHierarchy, close: closeHierarchy }] =
    useDisclosure();

  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery(
    ['company', id],
    () => getCompanyDetail(id as string),
    {
      enabled: router.isReady,
    }
  );

  const { mutate, isLoading } = useMutation({
    mutationFn: () => deleteCompany(id as string),
    onSuccess: () => {
      closeAlert();
      router.push('/company');
    },
  });

  return (
    <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
      <CompanyModal edit opened={opened} close={close} />
      <AlertModal
        opened={openedAlert}
        close={closeAlert}
        onDelete={() => mutate()}
        isLoading={isLoading}
      />
      <HierarchyModal
        opened={openedHierarchy}
        close={closeHierarchy}
        companyId={id as string}
      />
      <div className='flex justify-between px-4 py-5 sm:px-6'>
        <div>
          <h3 className='flex text-lg font-medium leading-6 text-gray-900'>
            {data?.name}
            <span
              onClick={openHierarchy}
              className='bg-primary-100 text-primary-700 ml-4 inline-block cursor-pointer whitespace-nowrap rounded-full px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none'
            >
              {data?.parent_id ? 'Subsidiary' : 'Parent'}
            </span>
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>
            {data?.address}
          </p>
        </div>
        <div className='ml-4 mt-2 flex flex-shrink-0 gap-2'>
          <Button onClick={open}>Edit</Button>
          <IconButton icon={HiTrash} variant='danger' onClick={openAlert} />
        </div>
      </div>
      <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
        <dl className='sm:divide-y sm:divide-gray-200'>
          <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
            <dt className='text-sm font-medium text-gray-500'>
              Date established
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {data?.date_established?.toLocaleDateString()}
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
