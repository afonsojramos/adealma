import Link from 'next/link';

import { LanguageSwitcherDropdown } from './i18n';
import { Logo } from './Logo';

type INavbarProps = {
  title?: string;
};

const Navbar = ({ title = '' }: INavbarProps) => {
  return (
    <nav className="flex tracking-widest fixed top-12 lg:top-20 inset-x-8 lg:inset-x-24 w-screen">
      {title && (
        <div className="flex-none md:ml-8 text-base sm:text-xl">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </div>
      )}
      <div className="grow text-left self-center pl-16 md:pl-32 lg:pl-64 text-base sm:text-xl">
        {title}
      </div>
      <div className="flex-none self-center mr-14 lg:mr-32 xl:mr-36 2xl:mr-40 text-sm sm:text-base">
        <LanguageSwitcherDropdown />
      </div>
    </nav>
  );
};

export { Navbar };