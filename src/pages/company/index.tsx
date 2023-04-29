import CompanyList from '@/components/CompanyList';
import Layout from '@/components/layout/Layout';

export default function CompanyPage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}

      <main>
        <div className='layout relative flex min-h-screen flex-col justify-center py-12'>
          <CompanyList />
        </div>
      </main>
    </Layout>
  );
}
