import Link from 'next/link';

import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

type INavbarProps = {
  title?: string;
  secondaryTitle?: string;
  background?: boolean;
};

const Navbar = ({
  title = '',
  secondaryTitle = '',
  background = false,
}: INavbarProps) => (
  <nav
    className={`fixed z-10 flex w-screen items-center pb-2 pt-8 pl-8 tracking-widest lg:pt-8 lg:pl-40 ${
      background && 'bg-primary-100'
    }`}
  >
    {title && (
      <div className='z-20 flex-none text-base sm:text-xl md:ml-8'>
        <Link href='/'>
          <Logo />
        </Link>
      </div>
    )}
    <div className='w-20 grow pl-12 pr-6 text-left text-base leading-none sm:text-xl md:pl-24 lg:pl-32'>
      <span className='hidden md:inline xl:absolute xl:top-10 xl:left-0 xl:px-[33%]'>
        <span className='mr-24'>{`${title}${secondaryTitle && ':'}`}</span>
        {secondaryTitle}
      </span>
      <span className='md:hidden'>{secondaryTitle || title}</span>
    </div>
    <div className='pr-6 text-sm sm:text-lg lg:pr-6 xl:pr-10 2xl:pr-[3.6rem]'>
      <LanguageSwitcher />
    </div>
  </nav>
);

export default Navbar;
