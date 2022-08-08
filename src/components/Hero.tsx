import Image from 'next/image';

import matilde from '../../public/assets/icons/android-chrome-512x512.png';
import { Section } from './elements/Section';

const Hero = () => (
  <Section yPadding="bg-base-20">
    <div className="hero-content flex-col lg:flex-row lg:mt-20">
      <Image
        alt=""
        src={matilde}
        width={450}
        height={450}
        className="rounded-full"
      />
      <div className="flex-1 flex flex-col justify-center lg:ml-10">
        <h1 className="text-7xl font-baseline font-['Mogan'] leading-hero mb-10">
          Hello
        </h1>
        <div className="text-base mt-4 lg:mb-13">
          <div className="text-2xl font-black mb-2">
            This will be a short description title
          </div>
          <span className="leading-6">Lorem Ipsum and whatnot</span>
        </div>
      </div>
    </div>
  </Section>
);

export { Hero };
