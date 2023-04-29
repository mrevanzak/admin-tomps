import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import DatePicker from '@/components/forms/DatePicker';
import Input from '@/components/forms/Input';
import SelectInput from '@/components/forms/SelectInput';

import editEmployeeDetail from '@/services/employee/editEmployeeDetail';
import getEmployeeDetail from '@/services/employee/getEmployeeDetail';
import storeEmployee from '@/services/employee/storeEmployee';
import { Employee, employeeSchema } from '@/services/employee/types';

type EmployeeModalProps = {
  opened: boolean;
  close: () => void;
  edit?: boolean;
};

export default function EmployeeModal({
  opened,
  close,
  edit,
}: EmployeeModalProps) {
  const router = useRouter();
  const { id, employeeId } = router.query;

  const { data } = useQuery(
    ['employee', employeeId],
    () => getEmployeeDetail(id as string, employeeId as string),
    {
      enabled: !!(id as string),
    }
  );

  const { mutate, isLoading } = useMutation({
    mutationFn: (formData: Employee) => {
      return edit
        ? editEmployeeDetail(id as string, employeeId as string, formData)
        : storeEmployee(id as string, formData);
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
          <Input id='name' label='Name' defaultValue={data?.name} />
          <SelectInput
            id='category'
            label='Category'
            defaultValue={data?.category}
          >
            <option value='Direksi'>Direksi</option>
            <option value='Contact Person'>Contact Person</option>
          </SelectInput>
          <Input id='position' label='Position' defaultValue={data?.position} />
          <DatePicker
            id='date_of_birth'
            label='Date of Birth'
            defaultValue={data?.date_of_birth.toString()}
          />
          <Input id='address' label='Address' defaultValue={data?.address} />
          <Input
            id='phone'
            label='Phone'
            helperText='Use 08xx format'
            defaultValue={data?.phone}
          />
          <Input
            id='office_phone'
            label='Office Phone'
            helperText='use 08xx format'
            defaultValue={data?.office_phone}
          />
          <Input id='email' label='Email' defaultValue={data?.email} />
          <Input id='hobby' label='Hobby' defaultValue={data?.hobby} />
          <Input id='unit' label='Unit' defaultValue={data?.unit} />
          <Button type='submit' isLoading={isLoading}>
            Submit Button
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
}
