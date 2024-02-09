import Link from 'next/link';

const Footer = ({ about = false }: { about?: boolean }) => (
  <footer className='bg-primary-100 p-10 text-xs sm:text-sm md:pt-20 md:text-lg'>
    <div className='flex-row-reverse md:flex md:flex-row md:pl-20 lg:pl-32'>
      <Link href='https://www.instagram.com/adealma.studio'>
        @adealma.studio
      </Link>
      <Link
        href='mailto:formulaobliqua@gmail.com'
        className='flex pl-12 md:pl-16 lg:pl-40 xl:pl-64'
      >
        formulaobliqua@gmail.com
      </Link>
      <Link href='tel:+351936780872' className='flex pl-6 lg:pl-32 xl:pl-64'>
        +351 936 780 872
      </Link>
    </div>{' '}
    <div className='flex-row-reverse pt-2 text-right md:pl-48 md:text-left lg:pl-64 xl:pl-96'>
      <Link href='/' className='hidden md:inline-flex'>
        adealma.com
      </Link>
      <Link
        href={about ? '/projects' : '/about'}
        className='inline-flex pl-0 pr-8 font-bold md:pl-32 lg:pl-64'
      >
        {about ? 'projects' : 'about'}
      </Link>
    </div>
  </footer>
);

export default Footer;
