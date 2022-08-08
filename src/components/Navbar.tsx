import { Section } from './elements';
import { DestopNavbar } from './navbar/DesktopNavbar';
import { MobileNavbar } from './navbar/MobileNavbar';

const Navbar = () => {
  return (
    <Section yPadding="py-10 sm:py-10">
      <nav className="navbar px-2 sm:px-4 py-2.5">
        <div className="navbar-start">
          <MobileNavbar />
        </div>
        <div className="navbar-center flex"></div>

        <div className="navbar-end hidden lg:flex">
          <DestopNavbar />
          {/* <LanguageSwitcher /> */}
        </div>
      </nav>
    </Section>
  );
};

export { Navbar };
