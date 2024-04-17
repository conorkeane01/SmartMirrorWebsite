import '../styles/globals.css'
import Layout from '../components/layout/Layout'
import { GlobalContextProvider } from '../utils/store/globalContext'
import { GlobalContextProviderData } from '../utils/store/globalContextData'


function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <GlobalContextProviderData>
        <Component {...pageProps} />
      </GlobalContextProviderData>
    </GlobalContextProvider>
  );
}

export default MyApp;


/*
function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContextProvider>
  );
}

export default MyApp

*/
