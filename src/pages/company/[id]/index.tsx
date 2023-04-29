import CompanyDetails from '@/components/CompanyDetails';
import EmployeeList from '@/components/EmployeeList';
import Layout from '@/components/layout/Layout';

export default function CompanyDetailPage() {
  return (
    <Layout>
      <main>
        <div className='layout relative flex min-h-screen flex-col justify-center gap-4 py-12'>
          <CompanyDetails />
          <EmployeeList />
        </div>
      </main>
    </Layout>
  );
}
