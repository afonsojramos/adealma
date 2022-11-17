import Link from 'next/link';

const Footer = () => (
  <footer className='bg-primary-100 p-10 text-sm md:pt-20 md:text-lg'>
    <div className='inline-flex sm:pl-32'>
      <div>
        <Link href='https://instagram.com/a_dealma'>@a_dealma</Link>
      </div>
      <div className='inline-flex pl-16 sm:pl-32 lg:pl-64'>
        <Link href='mailto:formulaobliqua@gmail.com'>info@adealma.com</Link>
      </div>
    </div>{' '}
    <div className='pt-4 text-right sm:pl-64 sm:pt-2 sm:text-left lg:pl-96'>
      <div className='inline-flex'>
        <Link href='/'>adealma.com</Link>
      </div>{' '}
      <div className='inline-flex pl-16 sm:pl-32 lg:pl-64'>
        <Link href='tel:+35193565889'>+351 935 658 89</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
