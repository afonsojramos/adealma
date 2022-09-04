type IHeroProps = {
  description: string;
};

const Hero = ({ description }: IHeroProps) => {
  return (
    <div className="justify-center leading-[44px] lg:text-4xl md:text-3xl text-2xl lg:px-10">
      {description}
    </div>
  );
};

export { Hero };
