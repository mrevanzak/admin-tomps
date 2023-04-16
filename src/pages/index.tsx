import { useDisclosure } from '@mantine/hooks';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import CompanyModal from '@/components/CompanyModal';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const [opened, { open, close }] = useDisclosure();
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <CompanyModal opened={opened} close={close} />

      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12'>
            <Button onClick={open}>Add Company</Button>
          </div>
        </section>
      </main>
    </Layout>
  );
}
