import Layout from '@/components/Layout';
import '@/styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>Sách giảm giá - CMS</title>
                <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico" />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
};

export default App;
