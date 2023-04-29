import EmployeeDetails from '@/components/EmployeeDetails';
import Layout from '@/components/layout/Layout';

export default function EmployeeDetailPage() {
  return (
    <Layout>
      <main>
        <div className='layout relative flex min-h-screen flex-col justify-center gap-4 py-12'>
          <EmployeeDetails />
        </div>
      </main>
    </Layout>
  );
}
