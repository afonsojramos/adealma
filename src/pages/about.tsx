import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Carousel } from 'components/Carousel';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Navbar } from 'components/Navbar';

const About = () => {
  const { t } = useTranslation('common');
  const about = t('about_description', {
    returnObjects: true,
  });
  const images = t('about_images', {
    returnObjects: true,
  });
  return (
    <>
      <Meta description={about[0]} />
      <Navbar title={t('about_title')} background />

      <main className='inline-block w-full rounded-lg pt-32'>
        <div className='mb-12 break-normal px-8 text-xl leading-[28px] md:pr-32 md:text-2xl md:leading-[30px] lg:pl-24 lg:pr-64 xl:pl-48 xl:pr-96 xl:text-3xl xl:leading-[40px] 2xl:pr-[35rem]'>
          {about[0]}
        </div>
        <Carousel images={images} />
        <div className='mb-12 break-normal px-8 pt-16 text-xl leading-[28px] md:pr-32 md:text-2xl md:leading-[30px] lg:pl-24 lg:pr-64 xl:pl-48 xl:pr-96 xl:text-3xl xl:leading-[40px] 2xl:pr-[35rem]'>
          {about[1]}
        </div>
      </main>
      <Footer about />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default About;
