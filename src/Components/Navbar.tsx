import Link from 'next/link';

import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';

type INavbarProps = {
  title?: string;
};

const Navbar = ({ title = '' }: INavbarProps) => {
  return (
    <nav className="flex tracking-widest fixed pt-8 lg:pt-8 pl-8 lg:pl-40 w-screen">
      {title && (
        <div className="flex-none md:ml-8 text-base sm:text-xl">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </div>
      )}
      <div className="grow text-left w-20 pl-16 md:pl-32 lg:pl-64 text-base sm:text-xl">
        {title}
      </div>
      <div className="pr-8 md:pr-12 lg:pr-16 xl:pr-20 2xl:pr-24 text-base sm:text-lg">
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export { Navbar };
