import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Banner, Footer, Navbar } from '../components';
import { Background, Meta } from '../components/elements';

const Index = () => {
  const { t } = useTranslation('common');
  return (
    <main className="antialiased">
      <Meta title={t('title_about')} description={t('description')} />
      <Background color="bg-gray-100" classnames="h-screen">
        <Navbar />
      </Background>
      <Banner />
      <Footer />
    </main>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Index;
