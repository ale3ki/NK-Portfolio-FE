'use client'

import Link from "next/link";
import styles from './styles.module.css';

const Navbar = () => {
    // Navlinks

    const navLinks = [
      { path: '/work', name: 'Work' },
      { path: '/about', name: 'About' },
      { path: '/contact', name: 'Contact' },
    ];

    return (
      <nav className={`${styles.navbar} navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow`}>
        <div className={`container`}>
          <div className={`${styles['d-flex']} d-flex align-items-center`}>
            <Link href="/" className={`navbar-brand`}>
            <img src="/headerLogo.svg" alt="Your Image" className={`${styles['logo-image']}`} />
            Nicolaas Kilde
            </Link>
          </div>
          <button className={`navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                  aria-expanded="false" aria-label="Toggle navigation">
            <span className={`navbar-toggler-icon`}></span>
          </button>
          <div className={`navbar-collapse collapse d-sm-inline-flex justify-content-between`}>
            <ul className={`navbar-nav ms-auto`}>
              {/* Navlink lambda */}
              {navLinks.map((link, index) => (
                <li key={index} className={`nav-item `}>
                  <Link className={`${styles['nav-link']} ${styles.noUnderline} nav-link text-dark`} href={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;