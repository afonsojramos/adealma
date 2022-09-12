import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';

type IMetaProps = {
  title?: string;
  description: string;
  canonical?: string;
};

const Meta = (props: IMetaProps) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="apple-touch-icon"
          href={`${router.basePath}/assets/icons/apple-touch-icon.png`}
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/assets/icons/favicon-32x32.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/assets/icons/favicon-16x16.png`}
          key="icon16"
        />
        <link
          rel="icon"
          href={`${router.basePath}/assets/icons/favicon.ico`}
          key="favicon"
        />
      </Head>
      <NextSeo
        title={props.title}
        titleTemplate={`%s | ${t('site_name')}`}
        defaultTitle={t('site_name')}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          title: props.title,
          description: props.description,
          url: props.canonical,
          locale: router.locale,
          site_name: t('site_name'),
        }}
      />
    </>
  );
};

export { Meta };
