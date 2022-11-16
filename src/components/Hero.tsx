type IHeroProps = {
  description: string;
};

const Hero = ({ description }: IHeroProps) => {
  return (
    <div className="justify-center leading-[28px] sm:leading-[34px] md:leading-[44px] xl:leading-[54px] w-fit text-2xl sm:text-3xl md:text-4xl xl:text-5xl px-8 pr-12 sm:pr-48 md:pr-64 lg:pr-[24rem] xl:pr-[36rem] 2xl:pr-[48rem] lg:pl-12 pb-36 md:pb-48">
      <p>{description}</p>
    </div>
  );
};

export default Hero;
