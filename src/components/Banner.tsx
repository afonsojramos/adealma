import { A, De, Alma } from './Icons';

const Banner = () => {
  const common = 'fixed -z-10 h-20 xl:h-48 lg:h-40 md:h-32 sm:h-24';
  return (
    <>
      <A
        className={`left-6 top-6 lg:left-8 xl:left-12 2xl:left-16 ${common}`}
      />
      <De
        className={`right-6 bottom-[40%] lg:right-8 xl:right-12 2xl:right-16 ${common}`}
      />
      <Alma
        className={`bottom-6 left-6 lg:inset-x-1/2 lg:bottom-8 lg:-ml-80 xl:bottom-12 2xl:bottom-16 ${common}`}
      />
    </>
  );
};

export default Banner;
