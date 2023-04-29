import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { HiCalendar, HiChevronRight, HiPlus } from 'react-icons/hi';

import IconButton from '@/components/buttons/IconButton';

import getCompanies from '@/services/company/getCompanies';

type CompanyListProps = {
  open: () => void;
};

export default function CompanyList({ open }: CompanyListProps) {
  const { data } = useQuery(['company'], () => getCompanies());

  return (
    <div className='overflow-hidden bg-white shadow sm:rounded-md'>
      <div className='border-b border-gray-200 bg-white px-4 py-5 sm:px-6'>
        <div className='-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap'>
          <div className='ml-4 mt-2'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Company
            </h3>
          </div>
          <div className='ml-4 mt-2 flex-shrink-0'>
            <IconButton icon={HiPlus} onClick={open} />
          </div>
        </div>
      </div>
      <ul role='list' className='divide-y divide-gray-200'>
        {data?.map((company) => (
          <li key={company.id}>
            <Link
              href={`/company/${company.id}`}
              className='block hover:bg-gray-50'
            >
              <div className='flex items-center px-4 py-4 sm:px-6'>
                <div className='min-w-0 flex-1 sm:flex sm:items-center sm:justify-between'>
                  <div className='truncate'>
                    <div className='flex text-sm'>
                      <p className='truncate font-medium text-blue-600'>
                        {company.name}
                      </p>
                      <p className='ml-1 flex-shrink-0 font-normal text-gray-500'>
                        in {company.sector}
                      </p>
                    </div>
                    <div className='mt-2 flex'>
                      <div className='flex items-center text-sm text-gray-500'>
                        <HiCalendar
                          className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400'
                          aria-hidden='true'
                        />
                        <p>{company.date_established.toString()}</p>
                      </div>
                    </div>
                  </div>
                  <p className='mt-4 flex-shrink-0 text-sm text-gray-500 sm:ml-5 sm:mt-0'>
                    {company.total_employee} Employees
                  </p>
                </div>
                <div className='ml-5 flex-shrink-0'>
                  <HiChevronRight
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
