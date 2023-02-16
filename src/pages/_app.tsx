import { Analytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import 'styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
    <Analytics />
  </>
);

export default appWithTranslation(MyApp);
