import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import { HiUsers } from 'react-icons/hi2';

import Button from '@/components/buttons/Button';

import getEmployees from '@/services/employee/getEmployees';

type EmployeeListProps = {
  open: () => void;
};

export default function EmployeeList({ open }: EmployeeListProps) {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery(['employee'], () => getEmployees(id as string), {
    enabled: router.isReady,
  });
  return (
    <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
      <div className='border-b border-gray-200 bg-white px-4 py-5 sm:px-6'>
        <div className='-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap'>
          <div className='ml-4 mt-2'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Employee
            </h3>
          </div>
          <div className='ml-4 mt-2 flex-shrink-0'>
            <Button onClick={open}>Add Employee</Button>
          </div>
        </div>
      </div>
      <ul role='list' className='divide-y divide-gray-200'>
        {data?.map((employee) => (
          <li key={employee.email}>
            <a href='#' className='block hover:bg-gray-50'>
              <div className='px-4 py-4 sm:px-6'>
                <div className='flex items-center justify-between'>
                  <p className='truncate text-sm font-medium text-blue-600'>
                    {employee.name}
                  </p>
                </div>
                <div className='mt-2 sm:flex sm:justify-between'>
                  <div className='sm:flex'>
                    <p className='flex items-center text-sm text-gray-500'>
                      <HiUsers
                        className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400'
                        aria-hidden='true'
                      />
                      {employee.position}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
