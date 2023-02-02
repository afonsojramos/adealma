import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';

import Footer from 'components/Footer';
import Meta from 'components/Meta';
import Navbar from 'components/Navbar';

const About = () => {
  const { t } = useTranslation('common');
  const about = t<string, string[]>('about_description', {
    returnObjects: true,
  });
  return (
    <>
      <Meta description={about[0]} />
      <Navbar title={t('about')} background />

      <main className='inline-block w-full rounded-lg pt-32'>
        <div className='mb-12 break-normal px-8 text-xl leading-[28px] md:pr-32 md:text-2xl md:leading-[30px] lg:pl-24 lg:pr-64 xl:pl-48 xl:pr-96 xl:text-3xl xl:leading-[40px] 2xl:pr-[35rem]'>
          {about[0]}
        </div>
        <div className='flex w-screen flex-row items-center px-5'>
          <Image
            src='/assets/casa-do-cristelo.png'
            alt='Casa do Cristelo'
            width={820}
            height={1260}
            className='w-1/3 px-2'
            priority
          />
          <Image
            src='/assets/casa-do-pescador.png'
            alt='Casa do Pescador'
            width={820}
            height={1260}
            className='w-1/3 px-2'
            priority
          />
          <Image
            src='/assets/casas-da-matriz.png'
            alt='Casas da Matriz'
            width={820}
            height={1260}
            className='w-1/3 px-2'
            priority
          />
        </div>
        <div className='mb-12 break-normal px-8 pt-16 text-xl leading-[28px] md:pr-32 md:text-2xl md:leading-[30px] lg:pl-24 lg:pr-64 xl:pl-48 xl:pr-96 xl:text-3xl xl:leading-[40px] 2xl:pr-[35rem]'>
          {about[1]}
        </div>
      </main>
      <Footer about={t('about')} />
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

export default About;
