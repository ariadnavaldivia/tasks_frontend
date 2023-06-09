import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import type { AppProps } from 'next/app'
import Layout from '@/components/ui/Layout';
import { useEffect } from 'react';
import { Provider } from "react-redux";
import Head from 'next/head'

import {wrapper,store} from '../store/store'

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  
  return <Provider store={store}><Layout>
    <Head>
        <title>Task Manager</title>
        <meta name='description' content='A task manager' />
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
      </Head>
    <Component {...pageProps} />
    </Layout>
    </Provider> 
}
