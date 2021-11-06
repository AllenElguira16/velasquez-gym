import type { AppProps } from 'next/app';
import axios from 'axios';;
import { useEffect } from 'react';
import '../assets/css/index.scss';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App ({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof document !== undefined) {
      require('bootstrap/dist/js/bootstrap');
    }
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <div className="bg-image"></div>
    </>
  );
}

export default App;
