import { useDisclosure } from '@mantine/hooks';

import CompanyDetails from '@/components/CompanyDetails';
import EmployeeList from '@/components/EmployeeList';
import EmployeeModal from '@/components/EmployeeModal';
import Layout from '@/components/layout/Layout';

export default function CompanyDetailPage() {
  const [opened, { open, close }] = useDisclosure();

  return (
    <Layout>
      <EmployeeModal opened={opened} close={close} />
      <main>
        <div className='layout relative flex min-h-screen flex-col justify-center gap-4 py-12'>
          <CompanyDetails />
          <EmployeeList open={open} />
        </div>
      </main>
    </Layout>
  );
}
