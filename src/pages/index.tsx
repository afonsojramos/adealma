import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import config from 'next/config';
import Link from 'next/link';
import Router from 'next/router';
import { useSwipeable } from 'react-swipeable';

import { Navbar, Hero, Meta, Banner, Footer } from 'Components';

import Arrow from '../../public/assets/arrow.svg';

const Index = () => {
  const { t } = useTranslation('common');
  const description = t('description');
  const handlers = useSwipeable({
    onSwipedUp: (eventData) =>
      eventData.deltaY < -180 && Router.replace('/projects'),
    ...config,
  });
  return (
    <>
      <Meta title={t('title')} description={description} />
      <Navbar />
      <main className="flex flex-col">
        <div className="grow h-screen">
          <Banner />
        </div>
        <div className="flex flex-col bg-primary-100 w-full" {...handlers}>
          <div className="relative">
            <Hero description={description} />
            <Link href="/projects">
              <a title="projects">
                <Arrow className="absolute h-6 md:h-8 rotate-180 right-6 lg:right-8 xl:right-12 2xl:right-14 bottom-2 md:inset-y-1/4" />
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
