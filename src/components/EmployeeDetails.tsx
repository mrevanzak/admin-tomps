import { useDisclosure } from '@mantine/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { HiTrash, HiUsers } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import AlertModal from '@/components/modals/AlertModal';
import EmployeeModal from '@/components/modals/EmployeeModal';

import deleteEmployee from '@/services/employee/deleteEmployee';
import getEmployeeDetail from '@/services/employee/getEmployeeDetail';

export default function EmployeeDetails() {
  const [opened, { open, close }] = useDisclosure();
  const [openedAlert, { open: openAlert, close: closeAlert }] = useDisclosure();
  const router = useRouter();
  const { id, employeeId } = router.query;

  const { data } = useQuery(
    ['employee', employeeId],
    () => getEmployeeDetail(id as string, employeeId as string),
    {
      enabled: !!(id && employeeId),
    }
  );

  const { mutate, isLoading } = useMutation({
    mutationFn: () => deleteEmployee(id as string, employeeId as string),
    onSuccess: () => {
      closeAlert();
      router.push(`/company/${id}`);
    },
  });

  return (
    <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
      <EmployeeModal edit opened={opened} close={close} />
      <AlertModal
        opened={openedAlert}
        close={closeAlert}
        onDelete={() => mutate()}
        isLoading={isLoading}
      />
      <div className='flex justify-between px-4 py-5 sm:px-6'>
        <div>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            {data?.name}
          </h3>
          <p className='mt-1 flex max-w-2xl text-sm text-gray-500'>
            <HiUsers
              className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400'
              aria-hidden='true'
            />
            {data?.position}
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
            <dt className='text-sm font-medium text-gray-500'>Status</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {data?.status ? 'Active' : 'Inactive'}
            </dd>
          </div>
          <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
            <dt className='text-sm font-medium text-gray-500'>Category</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {data?.category}
            </dd>
          </div>
          <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
            <dt className='text-sm font-medium text-gray-500'>Date of Birth</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {data?.date_of_birth.toString()}
            </dd>
          </div>
          <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
            <dt className='text-sm font-medium text-gray-500'>Address</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {data?.address}
            </dd>
          </div>
          <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
            <dt className='text-sm font-medium text-gray-500'>Email</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {data?.email}
            </dd>
          </div>
          <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
            <dt className='text-sm font-medium text-gray-500'>Phone Number</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {data?.phone}
            </dd>
          </div>
          <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
            <dt className='text-sm font-medium text-gray-500'>
              Office Phone Number
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {data?.office_phone}
            </dd>
          </div>
          <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
            <dt className='text-sm font-medium text-gray-500'>Hobby</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {data?.hobby}
            </dd>
          </div>
          <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5'>
            <dt className='text-sm font-medium text-gray-500'>Unit</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              {data?.unit}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
