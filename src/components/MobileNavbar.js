import React from 'react';
import useClickAway from '../hooks/useClickAway';
import Hamburger from './NavbarComponents/Hamburger';
import Logo from './NavbarComponents/Logo';
import MobileIcons from './NavbarComponents/MobileIcons';
import MobileSearchbar from './NavbarComponents/MobileSearchbar';
import SideMenu from './NavbarComponents/SideMenu';
import { CSSTransition } from 'react-transition-group';
import DeliverTo from './MobileNavbar/DeliverTo';

export default function MobileNavbar() {
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  const [sideMenuOpenSecond, setSideMenuSecondOpen] = React.useState(false);
  const [windowScrolled, setWindowScrolled] = React.useState(false);
  const sideMenuRef = React.useRef(null);
  const sideMenuRefSecond = React.useRef(null);
  useClickAway(sideMenuRef, () => {
    if (sideMenuOpen) {
      sideMenuRef.current.classList.add('-translate-x-full');
      setSideMenuOpen(false);
    }
  });
  useClickAway(sideMenuRefSecond, () => {
    if (sideMenuOpenSecond) {
      sideMenuRefSecond.current.classList.add('-translate-x-full');
      setSideMenuSecondOpen(false);
    }
  });

  const toggleSideMenu = () => {
    if (sideMenuRef.current) {
      if (sideMenuOpen) {
        sideMenuRef.current.classList.add('-translate-x-full');
        setSideMenuOpen(false);
      } else {
        sideMenuRef.current.classList.remove('-translate-x-full');
        setSideMenuOpen(true);
      }
    }
  };
  const toggleSideMenuSecond = () => {
    if (sideMenuRefSecond.current) {
      if (sideMenuOpenSecond) {
        sideMenuRefSecond.current.classList.add('-translate-x-full');
        setSideMenuSecondOpen(false);
      } else {
        sideMenuRefSecond.current.classList.remove('-translate-x-full');
        setSideMenuSecondOpen(true);
      }
    }
  };
  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 140) {
        setWindowScrolled(true);
        if (sideMenuOpen) {
          toggleSideMenu();
        }
      } else {
        setWindowScrolled(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', null);
    };
  });
  return (
    <>
      <div className=" w-full left-0 top-0 z-10 ">
        <nav className=" relative   p-2  flex items-center  bg-nav-primary text-white">
          <Hamburger toggleSideMenu={toggleSideMenu} />
          <Logo withTypography={false} />

          <DeliverTo />
          <div className="ml-2">
            <button className=" font-semibold  font-cairo transition duration-100 hover:text-gray-300">
              العربية
            </button>
          </div>
          <MobileIcons />
          <SideMenu toggleSideMenu={toggleSideMenu} sideMenuRef={sideMenuRef} />
        </nav>
        <div className="p-2 bg-nav-primary">
          <MobileSearchbar />
        </div>
      </div>
      <CSSTransition
        in={windowScrolled}
        timeout={400}
        classNames="mobile-nav__secondary"
        unmountOnExit={true}
      >
        <div className="  fixed w-full flex  bg-nav-primary p-2  z-10 top-0 left-0 ">
          <Hamburger toggleSideMenu={toggleSideMenuSecond} />

          <input
            className="placeholder-gray-600 px-1 flex-1 rounded "
            placeholder="Search..."
          />
          <MobileIcons />

          <SideMenu
            toggleSideMenu={toggleSideMenuSecond}
            sideMenuRef={sideMenuRefSecond}
          />
        </div>
      </CSSTransition>
    </>
  );
}
