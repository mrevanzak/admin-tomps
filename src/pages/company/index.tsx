import { useDisclosure } from '@mantine/hooks';

import CompanyList from '@/components/CompanyList';
import Layout from '@/components/layout/Layout';
import CompanyModal from '@/components/modals/CompanyModal';

export default function CompanyPage() {
  const [opened, { open, close }] = useDisclosure();

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <CompanyModal opened={opened} close={close} />

      <main>
        <div className='layout relative flex min-h-screen flex-col justify-center py-12'>
          <CompanyList open={open} />
        </div>
      </main>
    </Layout>
  );
}
