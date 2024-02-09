type IHeroProps = {
  description: string;
};

export const Hero = ({ description }: IHeroProps) => (
  <div className='w-fit justify-center px-8 pb-36 pr-12 pt-4 text-2xl leading-[28px] sm:pr-48 sm:text-3xl sm:leading-[34px] md:pb-48 md:pr-64 md:text-4xl md:leading-[44px] lg:pl-12 lg:pr-[24rem] xl:pr-[36rem] xl:text-5xl xl:leading-[54px] 2xl:pr-[48rem]'>
    {description}
  </div>
);
