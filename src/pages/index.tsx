import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

import { Navbar, Hero, Meta, Banner, Footer } from 'Components';

import Arrow from '../../public/assets/arrow.svg';

const Index = () => {
  const { t } = useTranslation('common');
  const description = t('description');
  return (
    <>
      <Meta title={t('title')} description={description} />
      <Navbar />
      <main className="flex flex-col">
        <div className="grow h-screen">
          <Banner />
        </div>
        <div className="flex flex-col bg-gray-100 w-full pb-32">
          <div className="relative">
            <Hero description={description} />
            <Link href="/projects">
              <a>
                <Arrow className="absolute h-8 rotate-180 lg:right-14 lg:inset-y-1/4" />
              </a>
            </Link>
          </div>
          <Footer />
        </div>
      </main>
    </>
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
