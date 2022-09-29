import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="p-10 md:pt-20 text-sm md:text-lg bg-primary-100">
      <div className="inline-flex sm:pl-32">
        <div>@a_dealma</div>{' '}
        <div className="inline-flex pl-16 sm:pl-32 lg:pl-64">
          <Link href="mailto:formulaobliqua@gmail.com">info@adealma.com</Link>
        </div>
      </div>{' '}
      <div className="text-right sm:text-left sm:pl-64 lg:pl-96 pt-2">
        <div className="inline-flex">
          <Link href="/">adealma.com</Link>
        </div>{' '}
        <div className="inline-flex pl-16 sm:pl-32 lg:pl-64">
          <Link href="tel:+35193565889">+351 935 658 89</Link>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
