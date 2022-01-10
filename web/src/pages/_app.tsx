import type { AppProps } from 'next/app';
import axios from 'axios';;
import { useEffect } from 'react';
import Head from 'next/head';
import { Provider as AlertProvider, transitions, positions, AlertComponentPropsWithStyle } from 'react-alert';

import 'react-quill/dist/quill.snow.css';
import '../assets/css/index.scss';
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

if (typeof window !== 'undefined') {
  axios.defaults.baseURL = 'http://'+ location.hostname +':8000';
  axios.defaults.withCredentials = true;
}

// the style contains only the margin given as offset
// options contains all alert given options
// message is the alert message
// close is a function that closes the alert
const AlertTemplate = ({ style, options, message, close }: AlertComponentPropsWithStyle) => (  
  <div style={style}>
    <Alert
      color={options.type}
      toggle={close}
    >
      {message}
    </Alert>
    {/* <Modal
      backdrop={true}
      centered
      toggle={close}
    >
      <ModalHeader toggle={close}>
        {options.type}
      </ModalHeader>
      <ModalBody>
        {message}
      </ModalBody>
      <ModalFooter>
        <Button onClick={close}>
          Close
        </Button>
      </ModalFooter>
    </Modal> */}
  </div>
)

function App ({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof document !== undefined) {
      require('bootstrap/dist/js/bootstrap');
    }
  }, []);

  // optional configuration
  const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <div>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Component {...pageProps} />
        <div className="bg-image"></div>
      </div>
    </AlertProvider>
  );
}

export default App;
