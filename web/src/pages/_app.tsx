import type { AppProps } from 'next/app';
import axios from 'axios';;
import { useEffect } from 'react';
import Head from 'next/head';
import 'react-quill/dist/quill.snow.css';
import '../assets/css/index.scss';

if (typeof window !== 'undefined') {
  axios.defaults.baseURL = 'http://'+ location.hostname +':8000';
  axios.defaults.withCredentials = true;
}

function App ({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof document !== undefined) {
      require('bootstrap/dist/js/bootstrap');
    }
  }, []);

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
      <div className="bg-image"></div>
    </div>
  );
}

export default App;
