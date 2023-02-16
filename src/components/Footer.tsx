import Link from 'next/link';

const Footer = ({ about = 'about' }) => (
  <footer className='bg-primary-100 p-10 text-xs sm:text-sm md:pt-20 md:text-lg'>
    <div className='sm:pl-16 md:pl-24 lg:pl-32'>
      <div className='inline-flex pb-2'>
        <Link href='https://www.instagram.com/adealma.studio'>
          @adealma.studio
        </Link>
      </div>
      <div className='inline-flex pl-4 sm:pl-24 lg:pl-64'>
        <Link href='mailto:formulaobliqua@gmail.com'>
          formulaobliqua@gmail.com
        </Link>
      </div>
      <div className='inline-flex pl-8 font-bold sm:pl-24 lg:pl-64 xl:pl-96'>
        <Link href='/about'>{about}</Link>
      </div>
    </div>{' '}
    <div className='pt-2 text-right sm:pl-48 sm:text-left lg:pl-64 xl:pl-96'>
      <div className='inline-flex'>
        <Link href='/'>adealma.com</Link>
      </div>{' '}
      <div className='inline-flex pl-8 pr-0 sm:pl-32 lg:pl-64'>
        <Link href='tel:+351936780872'>+351 936 780 872</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
