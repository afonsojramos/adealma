import Link from 'next/link';

import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';

type INavbarProps = {
  title?: string;
  secondaryTitle?: string;
  background?: boolean;
};

const Navbar = ({
  title = '',
  secondaryTitle = '',
  background = false,
}: INavbarProps) => {
  return (
    <nav
      className={`flex tracking-widest items-center fixed pb-2 pt-8 lg:pt-8 pl-8 lg:pl-40 w-screen z-10 ${
        background && 'bg-primary-100'
      }`}
    >
      {title && (
        <div className="flex-none md:ml-8 text-base sm:text-xl z-20">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      )}
      <div className="grow text-left w-20 pl-12 md:pl-24 lg:pl-32 text-base sm:text-xl pr-6 leading-none">
        <span className="hidden md:inline xl:absolute xl:top-10 xl:px-[33%] xl:left-0">
          <span className="mr-24">{`${title}${secondaryTitle && ':'}`}</span>
          {secondaryTitle}
        </span>
        <span className="md:hidden">{secondaryTitle || title}</span>
      </div>
      <div className="pr-6 lg:pr-6 xl:pr-10 2xl:pr-[3.6rem] text-sm sm:text-lg">
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export { Navbar };
