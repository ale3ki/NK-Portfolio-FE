import Link from "next/link";
import styles from './styles.module.css';

const Navbar = () => {
  return (
    <nav className={`navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow ${styles.myNavbar}`}>
      <div className={`container ${styles.myContainer}`}>
        <div className={`d-flex align-items-center ${styles.myFlex}`}>
          <img  src="/headerLogo.svg" alt="Your Image" className={`logo-image ${styles.myLogoImage}`} />
          <Link className={`navbar-brand nk-brand ${styles.myNavbarBrand}`} href="/">Nicolaas Kilde</Link>
        </div>
        <button className={`navbar-toggler ${styles.myNavbarToggler}`} type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
          <span className={`navbar-toggler-icon ${styles.myNavbarTogglerIcon}`}></span>
        </button>
        <div className={`navbar-collapse collapse d-sm-inline-flex justify-content-between ${styles.myNavbarCollapse}`}>
          <ul className={`navbar-nav ms-auto ${styles.myNavbarNav}`}>
            <li className={`nav-item ${styles.myNavItem}`}>
              <Link className={`nav-link text-dark ${styles.myNavLink}`} href="/work">Work</Link>
            </li>
            <li className={`nav-item ${styles.myNavItem}`}>
              <Link className={`nav-link text-dark ${styles.myNavLink}`} href="/about">About</Link>
            </li>
            <li className={`nav-item ${styles.myNavItem}`}>
              <Link className={`nav-link text-dark ${styles.myNavLink}`} href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;