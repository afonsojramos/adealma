type IHeroProps = {
  description: string;
};

const Hero = ({ description }: IHeroProps) => (
  <div className='w-fit justify-center px-8 pr-12 pb-36 pt-2 text-2xl leading-[28px] sm:pr-48 sm:pt-0 sm:text-3xl sm:leading-[34px] md:pr-64 md:pb-48 md:text-4xl md:leading-[44px] lg:pr-[24rem] lg:pl-12 xl:pr-[36rem] xl:text-5xl xl:leading-[54px] 2xl:pr-[48rem]'>
    <p>{description}</p>
  </div>
);

export default Hero;
