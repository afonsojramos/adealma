import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Navbar, Hero, Banner, Footer } from '../components';
import { Background, Meta } from '../components/elements';

const Index = () => {
  const { t } = useTranslation('common');
  return (
    <main className="antialiased text-black min-h-screen">
      <Meta title={t('title')} description={t('description')} />
      <Background color="bg-gray-100">
        <Navbar />
        <Hero />
        <Banner />
        <Footer />
      </Background>
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
