import { Analytics } from '@vercel/analytics/react';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';

import 'styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
    <Analytics />
  </>
);

export default appWithTranslation(MyApp);
