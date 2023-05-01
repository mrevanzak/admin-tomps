import { MantineProvider } from '@mantine/core';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { toast, ToastContainer } from 'react-toastify';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
    onSuccess: () => {
      toast.success('Success!');
    },
  }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <Component {...pageProps} />
        <ToastContainer />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
