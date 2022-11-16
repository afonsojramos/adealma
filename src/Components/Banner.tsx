import { A, De, Alma } from './Icons';

const Banner = () => {
  const common = 'fixed -z-10 h-20 xl:h-48 lg:h-40 md:h-32 sm:h-24';
  return (
    <div className="font-bold text-8xl sm:text-9xl md:text-11xl lg:text-12xl xl:text-13xl tracking-[0.2em]">
      <A
        className={`left-6 lg:left-8 xl:left-12 2xl:left-16 top-6 ${common}`}
      />
      <De
        className={`right-6 lg:right-8 xl:right-12 2xl:right-16 bottom-[40%] ${common}`}
      />
      <Alma
        className={`bottom-6 lg:bottom-8 xl:bottom-12 2xl:bottom-16 left-6 lg:inset-x-1/2 lg:-ml-80 ${common}`}
      />
    </div>
  );
};

export default Banner;
