import Link from 'next/link';

const Footer = ({ about = 'about' }) => (
  <footer className='bg-primary-100 p-10 text-sm md:pt-20 md:text-lg'>
    <div className='inline-flex sm:pl-16 md:pl-24 lg:pl-32'>
      <div>
        <Link href='https://instagram.com/a_dealma'>@a_dealma</Link>
      </div>
      <div className='inline-flex pl-16 sm:pl-32 lg:pl-64'>
        <Link href='mailto:formulaobliqua@gmail.com'>info@adealma.com</Link>
      </div>
      <div className='inline-flex pl-8 font-bold sm:pl-48 lg:pl-64 xl:pl-96'>
        <Link href='/about'>{about}</Link>
      </div>
    </div>{' '}
    <div className='pt-2 text-right sm:pl-48 sm:text-left lg:pl-64 xl:pl-96'>
      <div className='inline-flex'>
        <Link href='/'>adealma.com</Link>
      </div>{' '}
      <div className='inline-flex pl-16 pr-8 sm:pr-0 sm:pl-32 lg:pl-64'>
        <Link href='tel:+35193565889'>+351 935 658 89</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
