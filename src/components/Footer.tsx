import { Section } from './elements';
import { FooterCopyright } from './elements/FooterCopyright';
import { FooterIconList } from './elements/FooterIconList';

const Footer = () => (
  <Section>
    <div className="relative flex items-center pb-16">
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
    <footer className="footer footer-center p-10 text-base-content rounded">
      {/*  <Logo /> */}

      {/* <div className="grid grid-flow-col gap-4">
        <Link href="/">
          <a className="link link-hover">Home</a>
        </Link>
        <Link href="/">
          <a className="link link-hover">Resume</a>
        </Link>
        <Link href="/">
          <a className="link link-hover">Projects</a>
        </Link>
        <Link href="/">
          <a className="link link-hover">Contacts</a>
        </Link>
      </div> */}
      <div>
        <div className="grid grid-flow-col gap-4">
          <FooterIconList />
        </div>
      </div>
      <div>
        <FooterCopyright />
      </div>
    </footer>
  </Section>
);

export { Footer };
