import { useDisclosure } from '@mantine/hooks';

import CompanyDetails from '@/components/CompanyDetails';
import EmployeeList from '@/components/EmployeeList';
import Layout from '@/components/layout/Layout';
import CompanyModal from '@/components/modals/CompanyModal';
import EmployeeModal from '@/components/modals/EmployeeModal';

export default function CompanyDetailPage() {
  const [opened, { open, close }] = useDisclosure();
  const [openedCompany, { open: openCompany, close: closeCompany }] =
    useDisclosure();

  return (
    <Layout>
      <EmployeeModal opened={opened} close={close} />
      <CompanyModal edit opened={openedCompany} close={closeCompany} />
      <main>
        <div className='layout relative flex min-h-screen flex-col justify-center gap-4 py-12'>
          <CompanyDetails open={openCompany} />
          <EmployeeList open={open} />
        </div>
      </main>
    </Layout>
  );
}
