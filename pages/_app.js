import Head from 'next/head';
import Script from 'next/script';
import 'tailwindcss/tailwind.css';
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <div className='flex flex-col'>
      <Head>
        <title>Barbells & Briefcases</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://app.snipcart.com' />
        <link rel='preconnect' href='https://cdn.snipcart.com' />
        <link
          rel='stylesheet'
          href='https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css'
        />
      </Head>
      <Header />
      <Component {...pageProps} />
      <footer className='flex items-center justify-center w-full h-24 border-t'>
        &copy; Barbells and Briefcases {new Date().getFullYear()}
      </footer>
      <Script src='https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js' />
      <div
        hidden
        id='snipcart'
        data-api-key={process.env.NEXT_PUBLIC_SNIPCART_API_KEY}
      />
    </div>
  );
}

export default MyApp;
