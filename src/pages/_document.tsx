import Document, { Html, Head, Main, NextScript } from 'next/document';

import Footer from '../components/Footer';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel='preload'
            href='/fonts/Favorit-Regular.woff2'
            as='font'
            type='font/woff2'
            crossOrigin=''
          />
        </Head>
        <body className='relative scroll-smooth bg-primary-100 antialiased'>
          <Main />
          <NextScript />
        </body>
        <Footer />
      </Html>
    );
  }
}

export default MyDocument;
