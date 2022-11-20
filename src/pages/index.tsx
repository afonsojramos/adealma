import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import config from 'next/config';
import Link from 'next/link';
import Router from 'next/router';
import { useSwipeable } from 'react-swipeable';

import Banner from 'components/Banner';
import Hero from 'components/Hero';
import { Arrow } from 'components/Icons';
import Meta from 'components/Meta';
import Navbar from 'components/Navbar';

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
      <Meta description={description} />
      <Navbar />
      <h1 className='text-primary-100'>{`${t('site_name')} - ${t(
        'site_slogan'
      )}`}</h1>
      <main className='flex flex-col'>
        <div className='h-screen grow'>
          <Banner />
        </div>
        <div className='flex w-full flex-col bg-primary-100' {...handlers}>
          <div className='relative'>
            <Hero description={description} />
            <Link href='/projects' title='projects'>
              <Arrow className='absolute right-6 bottom-2 h-6 rotate-180 md:inset-y-1/4 md:h-8 lg:right-8 xl:right-12 2xl:right-14' />
            </Link>
          </div>
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
